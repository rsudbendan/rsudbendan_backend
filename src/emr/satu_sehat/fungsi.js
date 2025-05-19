// core

// 3rd
const format_tanggal = require('date-format');

// local
require('dotenv').config();
const koneksi = require("../../koneksi");
const { generate_token } = require("../../satu_sehat/autentikasi/index");

const fungsi_generate_token = async () => {
    try {
        let hasil_generate = await generate_token();
        if (hasil_generate.status === 200) {
            let issued_timestamp = hasil_generate.data.issued_at;
            let issued_datetime = format_tanggal('yyyy-MM-dd hh:mm:ss', new Date(parseInt(issued_timestamp)));
            let expires_in = hasil_generate.data.expires_in;
            let expires_timestamp = parseInt(issued_timestamp) + parseInt(expires_in + "000");
            let expires_datetime = format_tanggal('yyyy-MM-dd hh:mm:ss', new Date(expires_timestamp));
            let access_token = hasil_generate.data.access_token;
            let json_response = JSON.stringify(hasil_generate.data, null, 2);

            let connection;
            try {
                connection = await koneksi.koneksi_rsbendan.getConnection();

                // Memulai transaksi
                await connection.beginTransaction();

                // INSERT pertama
                await connection.query(`
                    UPDATE
                        satusehat_access_token
                    SET
                        st_latest = 'N'
                    WHERE
                        environment = ?
                `, [process.env.SATU_SEHAT_ENVIRONMENT]);

                await connection.query(`
                    INSERT INTO 
                        satusehat_access_token ( 
                            environment,
                            issued_timestamp, 
                            issued_datetime, 
                            expires_in, 
                            expires_timestamp, 
                            expires_datetime, 
                            access_token, 
                            json_response, 
                            st_latest 
                        )
                    VALUES
                    (?, ?, ?, ?, ?, ?, ?, ?, 'Y')
                `, [process.env.SATU_SEHAT_ENVIRONMENT, issued_timestamp, issued_datetime, expires_in, expires_timestamp, expires_datetime, access_token, json_response]);

                await connection.commit();
            } catch (error) {
                if (connection) await connection.rollback();
                return ({
                    status: 400,
                    message: "Terjadi kesalahan dalam koneksi database : " + error.message
                });
            } finally {
                if (connection) connection.release();
            }

            return ({
                status: hasil_generate.status,
                message: hasil_generate.message,
                data: hasil_generate.data
            });
        }
    } catch (error) {
        return ({
            status: 500,
            message: "Terjadi kesalahan : " + error.message
        });
    }
}

module.exports = {
    fungsi_generate_token
};
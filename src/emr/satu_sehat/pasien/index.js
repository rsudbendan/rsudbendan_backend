// core

// 3rd
const express = require("express");

// local
require('dotenv').config();
const koneksi = require("../../../koneksi");
const { fungsi_generate_token } = require("../fungsi");
const { by_nik } = require("../../../satu_sehat/pasien/index");

const router = express.Router();

router.post("/by_nik", async (req, res) => {
    if (!req.body || !req.body.nik) {
        return res.status(400).json({
            status: 400,
            message: "Parameter belum lengkap"
        });
    }

    let nik = req.body.nik;

    let connection;
    try {
        connection = await koneksi.koneksi_rsbendan.getConnection();

        let [baris] = await connection.query(`
            SELECT 
                * 
            FROM 
                satusehat_access_token 
            WHERE 
                environment = ?
            ORDER BY
                issued_datetime DESC
        `, [process.env.SATU_SEHAT_ENVIRONMENT]);

        let token = "";
        if (baris.length > 0) {
            if (new Date() > new Date(baris[0].expires_datetime)) {
                let hasil_perbarui_token = await fungsi_generate_token();
                token = hasil_perbarui_token.data.access_token;

                if (hasil_perbarui_token.status !== 200) {
                    return res.status(hasil_perbarui_token.status).json({
                        status: hasil_perbarui_token.status,
                        message: hasil_perbarui_token.message
                    });
                }
            }
            else {
                token = baris[0].access_token;
            }
        } else {
            if (new Date() > new Date(baris[0].expires_datetime)) {
                let hasil_perbarui_token = await fungsi_generate_token();
                token = hasil_perbarui_token.data.access_token;

                if (hasil_perbarui_token.status !== 200) {
                    return res.status(hasil_perbarui_token.status).json({
                        status: hasil_perbarui_token.status,
                        message: hasil_perbarui_token.message
                    });
                }
            }
        }

        try {
            let hasil_by_nik = await by_nik(token, nik);
            return res.status(hasil_by_nik.status).json({
                status: hasil_by_nik.status,
                message: hasil_by_nik.message,
                data: hasil_by_nik.data
            });
        } catch (error) {
            return res.status(500).json({
                status: 500,
                message: "Terjadi kesalahan : " + error.message
            });
        }
    } catch (error) {
        if (connection) await connection.rollback();
        return res.status(400).json({
            status: 400,
            message: "Terjadi kesalahan dalam koneksi database : " + error.message
        });
    } finally {
        if (connection) connection.release();
    }
})

module.exports = router;
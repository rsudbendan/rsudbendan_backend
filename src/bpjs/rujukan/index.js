// core

// 3rd

// local
const { fungsi_permintaan_vclaim } = require("../fungsi");

const nomor_rujukan = async (nomor_rujukan) => {
    try {
        let hasil = await fungsi_permintaan_vclaim(`Rujukan/${nomor_rujukan}`, "GET", "");
        return ({
            status: hasil.status,
            message: hasil.message,
            data: hasil.data
        });
    } catch (error) {
        return ({
            status: 500,
            message: "Terjadi kesalahan : " + error.message
        });
    }
}

const nomor_kartu = async (nomor_kartu) => {
    try {
        let hasil = await fungsi_permintaan_vclaim(`Rujukan/Peserta/${nomor_kartu}`, "GET", "");
        return ({
            status: hasil.status,
            message: hasil.message,
            data: hasil.data
        });
    } catch (error) {
        return ({
            status: 500,
            message: "Terjadi kesalahan : " + error.message
        });
    }
}

const nomor_kartu_multi = async (nomor_kartu) => {
    try {
        let hasil = await fungsi_permintaan_vclaim(`Rujukan/List/Peserta/${nomor_kartu}`, "GET", "");
        return ({
            status: hasil.status,
            message: hasil.message,
            data: hasil.data
        });
    } catch (error) {
        return ({
            status: 500,
            message: "Terjadi kesalahan : " + error.message
        });
    }
}

module.exports = {
    nomor_rujukan,
    nomor_kartu,
    nomor_kartu_multi
}
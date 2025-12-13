// core

// 3rd

// local
const { fungsi_permintaan_vclaim } = require("../../fungsi");

const no_kartu_bpjs = async (no_kartu, tgl) => {
    try {        
        let hasil = await fungsi_permintaan_vclaim(`Peserta/nokartu/${no_kartu}/tglSEP/${tgl}`, "GET", "");
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

const nik = async (nik, tgl) => {
    try {        
        let hasil = await fungsi_permintaan_vclaim(`Peserta/nik/${nik}/tglSEP/${tgl}`, "GET", "");
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
    no_kartu_bpjs,
    nik
}
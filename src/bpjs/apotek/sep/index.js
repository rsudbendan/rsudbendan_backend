// core

// 3rd

// local
const { fungsi_permintaan_apotek } = require("../../fungsi");

const cari_no_kunjungan = async (sep) => {
    try {
        let hasil = await fungsi_permintaan_apotek(`sep/${sep}`, "GET", "");
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
    cari_no_kunjungan
}
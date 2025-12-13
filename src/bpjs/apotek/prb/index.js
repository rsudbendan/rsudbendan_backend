// core

// 3rd

// local
const { fungsi_permintaan_apotek } = require("../../fungsi");

const rekap_peserta_prb = async (tahun, bulan) => {
    try {
        let hasil = await fungsi_permintaan_apotek(`Prb/rekappeserta/tahun/${tahun}/bulan/${bulan}`, "GET", "");
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
    rekap_peserta_prb
}
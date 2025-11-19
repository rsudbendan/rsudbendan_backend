// core

// 3rd

// local
const { fungsi_permintaan_vclaim } = require("../fungsi");

const history_pelayanan_peserta = async (no_kartu, tgl_awal, tgl_akhir) => {
    try {
        let hasil = await fungsi_permintaan_vclaim(`monitoring/HistoriPelayanan/NoKartu/${no_kartu}/tglMulai/${tgl_awal}/tglAkhir/${tgl_akhir}`, "GET", "");
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
    history_pelayanan_peserta
}
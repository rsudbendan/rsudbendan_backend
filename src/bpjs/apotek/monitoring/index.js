// core

// 3rd

// local
const { fungsi_permintaan_apotek } = require("../../fungsi");

const data_klaim = async (bulan, tahun, jenis_obat, status) => {
    try {
        let hasil = await fungsi_permintaan_apotek(`monitoring/klaim/${bulan}/${tahun}/${jenis_obat}/${status}`, "GET", "");
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
    data_klaim
}
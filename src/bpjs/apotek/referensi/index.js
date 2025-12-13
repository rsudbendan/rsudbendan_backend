// core

// 3rd

// local
const { fungsi_permintaan_apotek } = require("../../fungsi");

const dpho = async () => {
    try {
        let hasil = await fungsi_permintaan_apotek(`referensi/dpho`, "GET", "");
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

const poli = async (poli) => {
    try {
        let hasil = await fungsi_permintaan_apotek(`referensi/poli/${poli}`, "GET", "");
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

const fasilitas_kesehatan = async (jenis, nama) => {
    try {
        let hasil = await fungsi_permintaan_apotek(`referensi/ppk/${jenis}/${nama}`, "GET", "");
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

const setting_apotek = async (kode) => {
    try {
        let hasil = await fungsi_permintaan_apotek(`referensi/settingppk/read/${kode}`, "GET", "");
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

const spesialistik = async () => {
    try {
        let hasil = await fungsi_permintaan_apotek(`referensi/spesialistik`, "GET", "");
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

const obat = async (jenis, tgl_resep, pencarian) => {
    try {
        let hasil = await fungsi_permintaan_apotek(`referensi/obat/${jenis}/${tgl_resep}/${pencarian}`, "GET", "");
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
    dpho,
    poli,
    fasilitas_kesehatan,
    setting_apotek,
    spesialistik,
    obat
}
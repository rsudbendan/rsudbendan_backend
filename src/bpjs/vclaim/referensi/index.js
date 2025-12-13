// core

// 3rd

// local
const { fungsi_permintaan_vclaim } = require("../../fungsi");

const diagnosa = async (diagnosa) => {
    try {
        let hasil = await fungsi_permintaan_vclaim(`referensi/diagnosa/${diagnosa}`, "GET", "");
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
        let hasil = await fungsi_permintaan_vclaim(`referensi/poli/${poli}`, "GET", "");
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

const fasilitas_kesehatan = async (nama, jenis) => {
    try {
        let hasil = await fungsi_permintaan_vclaim(`referensi/faskes/${nama}/${jenis}`, "GET", "");
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

const dokter_dpjp = async (jenis, tgl, spesialis) => {
    try {
        let hasil = await fungsi_permintaan_vclaim(`referensi/dokter/pelayanan/${jenis}/tglPelayanan/${tgl}/Spesialis/${spesialis}`, "GET", "");
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

const propinsi = async () => {
    try {
        let hasil = await fungsi_permintaan_vclaim("referensi/propinsi", "GET", "");
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

const kabupaten = async (propinsi) => {
    try {
        let hasil = await fungsi_permintaan_vclaim(`referensi/kabupaten/propinsi/${propinsi}`, "GET", "");
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

const kecamatan = async (kabupaten) => {
    try {
        let hasil = await fungsi_permintaan_vclaim(`referensi/kecamatan/kabupaten/${kabupaten}`, "GET", "");
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

const diagnosa_program_prb = async () => {
    try {
        let hasil = await fungsi_permintaan_vclaim("referensi/diagnosaprb", "GET", "");
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

const obat_generik_program_prb = async (obat) => {
    try {
        let hasil = await fungsi_permintaan_vclaim(`referensi/obatprb/${obat}`, "GET", "");
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
    diagnosa,
    poli,
    fasilitas_kesehatan,
    dokter_dpjp,
    propinsi,
    kabupaten,
    kecamatan,
    diagnosa_program_prb,
    obat_generik_program_prb
}
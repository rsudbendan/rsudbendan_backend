// core

// 3rd

// local
const { fungsi_permintaan_apotek } = require("../../fungsi");

const non_racikan = async (
    no_sjp,
    no_resep,
    kd_obt,
    nm_obt,
    signa1_obt,
    signa2_obt,
    jml_obt,
    jho,
    catatan_khusus
) => {
    try {
        const payload = {
            NOSJP: no_sjp,
            NORESEP: no_resep,
            KDOBT: kd_obt,
            NMOBAT: nm_obt,
            SIGNA1OBT: signa1_obt,
            SIGNA2OBT: signa2_obt,
            JMLOBT: jml_obt,
            JHO: jho,
            CatKhsObt: catatan_khusus
        };

        let hasil = await fungsi_permintaan_apotek(`obatnonracikan/v3/insert`, "POST", JSON.stringify(payload));
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

const racikan = async (
    no_sjp,
    no_resep,
    jns_obt,
    kd_obt,
    nm_obt,
    signa1_obt,
    signa2_obt,
    permintaan,
    jml_obt,
    jho,
    catatan_khusus
) => {
    try {
        const payload = {
            NOSJP: no_sjp,
            NORESEP: no_resep,
            JNSROBT: jns_obt,
            KDOBT: kd_obt,
            NMOBAT: nm_obt,
            SIGNA1OBT: signa1_obt,
            SIGNA2OBT: signa2_obt,
            PERMINTAAN: permintaan,
            JMLOBT: jml_obt,
            JHO: jho,
            CatKhsObt: catatan_khusus
        };

        let hasil = await fungsi_permintaan_apotek(`obatracikan/v3/insert`, "POST", JSON.stringify(payload));
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

const update_stok_obat = async (
    kd_obt,
    stok
) => {
    try {
        const payload = {
            KDOBAT: kd_obt,
            STOK: stok
        };

        let hasil = await fungsi_permintaan_apotek(`UpdateStokObat/updatestok`, "POST", JSON.stringify(payload));
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
    non_racikan,
    racikan,
    update_stok_obat
}
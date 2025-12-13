// core

// 3rd

// local
const { fungsi_permintaan_apotek } = require("../../fungsi");

const simpan_resep = async (
    tgl_sjp,
    ref_asal_sjp,
    poli_rsp,
    kd_jns_obat,
    no_resep,
    id_user,
    tgl_resep,
    tgl_pel_rsp,
    kd_dr,
    iterasi
) => {
    try {
        const payload = {
            TGLSJP: tgl_sjp,
            REFASALSJP: ref_asal_sjp,
            POLIRSP: poli_rsp,
            KDJNSOBAT: kd_jns_obat,
            NORESEP: no_resep,
            IDUSERSJP: id_user,
            TGLRSP: tgl_resep,
            TGLPELRSP: tgl_pel_rsp,
            KdDokter: kd_dr,
            iterasi: iterasi,
        };

        let hasil = await fungsi_permintaan_apotek(`sjpresep/v3/insert`, "POST", JSON.stringify(payload));
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

const hapus_resep = async (
    no_sjp,
    ref_asal_sjp,
    no_resep
) => {
    try {
        const payload = {
            nosjp: no_sjp,
            refasalsjp: ref_asal_sjp,
            noresep: no_resep
        };

        let hasil = await fungsi_permintaan_apotek(`hapusresep`, "DELETE", JSON.stringify(payload));
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

const daftar_resep = async (
    kd_ppk,
    kd_jns_obat,
    jns_tgl,
    tgl_mulai,
    tgl_akhir
) => {
    try {
        const payload = {
            kdppk: kd_ppk,
            KdJnsObat: kd_jns_obat,
            JnsTgl: jns_tgl,
            TglMulai: tgl_mulai,
            TglAkhir: tgl_akhir
        };

        let hasil = await fungsi_permintaan_apotek(`daftarresep`, "POST", JSON.stringify(payload));
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
    simpan_resep,
    hapus_resep,
    daftar_resep
}
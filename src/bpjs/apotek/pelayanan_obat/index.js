// core

// 3rd

// local
const { fungsi_permintaan_apotek } = require("../../fungsi");

const hapus_pelayanan_obat = async (
    no_sjp,
    no_resep,
    kode_obat,
    tipe_obat
) => {
    try {
        const payload = {
            nosepapotek: no_sjp,
            noresep: no_resep,
            kodeobat: kode_obat,
            tipeobat: tipe_obat
        };

        let hasil = await fungsi_permintaan_apotek(`pelayanan/obat/hapus`, "DELETE", JSON.stringify(payload));
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

const daftar_pelayanan_obat = async (sep) => {
    try {
        let hasil = await fungsi_permintaan_apotek(`obat/daftar/${sep}`, "GET", "");
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

const riwayat_pelayanan_obat = async (tgl_awal, tgl_akhir, no_kartu) => {
    try {
        let hasil = await fungsi_permintaan_apotek(`riwayatobat/${tgl_awal}/${tgl_akhir}/${no_kartu}`, "GET", "");
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
    hapus_pelayanan_obat,
    daftar_pelayanan_obat,
    riwayat_pelayanan_obat
}
// core

// 3rd

// local
const { fungsi_permintaan_vclaim } = require("../../fungsi");

const insert_sppri = async (
    no_kartu,
    kode_dokter,
    poli_kontrol,
    tgl_rencana_kontrol,
    user
) => {
    try {
        const payload = {
            request: {
                noKartu: no_kartu,
                kodeDokter: kode_dokter,
                poliKontrol: poli_kontrol,
                tglRencanaKontrol: tgl_rencana_kontrol,                
                user: user
            }
        };

        let hasil = await fungsi_permintaan_vclaim(`RencanaKontrol/InsertSPRI`, "POST", JSON.stringify(payload));
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
    insert_sppri
}
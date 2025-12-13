// core

// 3rd
const express = require("express");

// local
const {
    cari_sep,
    cari_sep_no_rujukan,
    insert_sep,
    delete_sep
} = require("../../../../bpjs/vclaim/sep/index");

const router = express.Router();

router.post("/cari_sep", async (req, res) => {
    if (!req.body || req.body.sep === undefined) {
        return res.status(400).json({
            status: 400,
            message: "Parameter belum lengkap"
        });
    }

    let varsep = req.body.sep;

    try {
        let hasil = await cari_sep(varsep);
        return res.status(hasil.status).json({
            status: hasil.status,
            message: hasil.message,
            data: hasil.data
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Terjadi kesalahan : " + error.message
        });
    }
})

router.post("/cari_sep_no_rujukan", async (req, res) => {
    if (!req.body || req.body.no_rujukan === undefined) {
        return res.status(400).json({
            status: 400,
            message: "Parameter belum lengkap"
        });
    }

    let varno_rujukan = req.body.no_rujukan;

    try {
        let hasil = await cari_sep_no_rujukan(varno_rujukan);
        return res.status(hasil.status).json({
            status: hasil.status,
            message: hasil.message,
            data: hasil.data
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Terjadi kesalahan : " + error.message
        });
    }
})

router.post("/insert_sep", async (req, res) => {
    if (!req.body ||
        req.body.no_kartu === undefined ||
        req.body.tgl_sep === undefined ||
        req.body.ppk_pelayanan === undefined ||
        req.body.jenis_pelayanan === undefined ||
        req.body.kelas_rawat_hak === undefined ||
        req.body.kelas_rawat_naik === undefined ||
        req.body.kelas_rawat_pembiayaan === undefined ||
        req.body.kelas_rawat_penanggung_jawab === undefined ||
        req.body.norm === undefined ||
        req.body.rujukan_asal === undefined ||
        req.body.rujukan_tgl === undefined ||
        req.body.rujukan_no === undefined ||
        req.body.rujukan_ppk === undefined ||
        req.body.catatan === undefined ||
        req.body.diagnosa_awal === undefined ||
        req.body.poli_tujuan === undefined ||
        req.body.poli_eksekutif === undefined ||
        req.body.cob === undefined ||
        req.body.katarak === undefined ||
        req.body.jaminan_laka_lantas === undefined ||
        req.body.jaminan_no_lp === undefined ||
        req.body.jaminan_penjamin_tgl_kejadian === undefined ||
        req.body.jaminan_penjamin_keterangan === undefined ||
        req.body.jaminan_penjamin_suplesi === undefined ||
        req.body.jaminan_penjamin_suplesi_no_sep === undefined ||
        req.body.jaminan_penjamin_suplesi_lokasi_laka_propinsi === undefined ||
        req.body.jaminan_penjamin_suplesi_lokasi_laka_kabupaten === undefined ||
        req.body.jaminan_penjamin_suplesi_lokasi_laka_kecamatan === undefined ||
        req.body.tujuan_kunjungan === undefined ||
        req.body.flag_procedure === undefined ||
        req.body.kd_penunjang === undefined ||
        req.body.asesmen_pel === undefined ||
        req.body.skdp_no_surat === undefined ||
        req.body.skdp_dpjp === undefined ||
        req.body.dpjp === undefined ||
        req.body.no_telpon === undefined ||
        req.body.user === undefined
    ) {
        return res.status(400).json({
            status: 400,
            message: "Parameter belum lengkap"
        });
    }

    let varno_kartu = req.body.no_kartu;
    let vartgl_sep = req.body.tgl_sep;
    let varppk_pelayanan = req.body.ppk_pelayanan;
    let varjenis_pelayanan = req.body.jenis_pelayanan;
    let varkelas_rawat_hak = req.body.kelas_rawat_hak;
    let varkelas_rawat_naik = req.body.kelas_rawat_naik;
    let varkelas_rawat_pembiayaan = req.body.kelas_rawat_pembiayaan;
    let varkelas_rawat_penanggung_jawab = req.body.kelas_rawat_penanggung_jawab;
    let varnorm = req.body.norm;
    let varrujukan_asal = req.body.rujukan_asal;
    let varrujukan_tgl = req.body.rujukan_tgl;
    let varrujukan_no = req.body.rujukan_no;
    let varrujukan_ppk = req.body.rujukan_ppk;
    let varcatatan = req.body.catatan;
    let vardiagnosa_awal = req.body.diagnosa_awal;
    let varpoli_tujuan = req.body.poli_tujuan;
    let varpoli_eksekutif = req.body.poli_eksekutif;
    let varcob = req.body.cob;
    let varkatarak = req.body.katarak;
    let varjaminan_laka_lantas = req.body.jaminan_laka_lantas;
    let varjaminan_no_lp = req.body.jaminan_no_lp;
    let varjaminan_penjamin_tgl_kejadian = req.body.jaminan_penjamin_tgl_kejadian;
    let varjaminan_penjamin_keterangan = req.body.jaminan_penjamin_keterangan;
    let varjaminan_penjamin_suplesi = req.body.jaminan_penjamin_suplesi;
    let varjaminan_penjamin_suplesi_no_sep = req.body.jaminan_penjamin_suplesi_no_sep;
    let varjaminan_penjamin_suplesi_lokasi_laka_propinsi = req.body.jaminan_penjamin_suplesi_lokasi_laka_propinsi;
    let varjaminan_penjamin_suplesi_lokasi_laka_kabupaten = req.body.jaminan_penjamin_suplesi_lokasi_laka_kabupaten;
    let varjaminan_penjamin_suplesi_lokasi_laka_kecamatan = req.body.jaminan_penjamin_suplesi_lokasi_laka_kecamatan;
    let vartujuan_kunjungan = req.body.tujuan_kunjungan;
    let varflag_procedure = req.body.flag_procedure;
    let varkd_penunjang = req.body.kd_penunjang;
    let varskdp_no_surat = req.body.skdp_no_surat;
    let varskdp_dpjp = req.body.skdp_dpjp;
    let varasesmen_pel = req.body.asesmen_pel;
    let vardpjp = req.body.dpjp;
    let varno_telpon = req.body.no_telpon;
    let varuser = req.body.user;

    try {
        let hasil = await insert_sep(
            varno_kartu,
            vartgl_sep,
            varppk_pelayanan,
            varjenis_pelayanan,
            varkelas_rawat_hak,
            varkelas_rawat_naik,
            varkelas_rawat_pembiayaan,
            varkelas_rawat_penanggung_jawab,
            varnorm,
            varrujukan_asal,
            varrujukan_tgl,
            varrujukan_no,
            varrujukan_ppk,
            varcatatan,
            vardiagnosa_awal,
            varpoli_tujuan,
            varpoli_eksekutif,
            varcob,
            varkatarak,
            varjaminan_laka_lantas,
            varjaminan_no_lp,
            varjaminan_penjamin_tgl_kejadian,
            varjaminan_penjamin_keterangan,
            varjaminan_penjamin_suplesi,
            varjaminan_penjamin_suplesi_no_sep,
            varjaminan_penjamin_suplesi_lokasi_laka_propinsi,
            varjaminan_penjamin_suplesi_lokasi_laka_kabupaten,
            varjaminan_penjamin_suplesi_lokasi_laka_kecamatan,
            vartujuan_kunjungan,
            varflag_procedure,
            varkd_penunjang,
            varasesmen_pel,
            varskdp_no_surat,
            varskdp_dpjp,
            vardpjp,
            varno_telpon,
            varuser
        );
        return res.status(hasil.status).json({
            status: hasil.status,
            message: hasil.message,
            data: hasil.data
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Terjadi kesalahan : " + error.message
        });
    }
})

router.delete("/delete_sep", async (req, res) => {
    if (!req.body || req.body.sep === undefined || req.body.user === undefined) {
        return res.status(400).json({
            status: 400,
            message: "Parameter belum lengkap"
        });
    }

    let varsep = req.body.sep;
    let varuser = req.body.user;

    try {
        let hasil = await delete_sep(varsep, varuser);
        return res.status(hasil.status).json({
            status: hasil.status,
            message: hasil.message,
            data: hasil.data
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Terjadi kesalahan : " + error.message
        });
    }
})

module.exports = router;
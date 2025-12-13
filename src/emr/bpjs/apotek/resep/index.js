// core

// 3rd
const express = require("express");

// local
const {
    simpan_resep,
    hapus_resep,
    daftar_resep
} = require("../../../../bpjs/apotek/resep/index");

const router = express.Router();

router.post("/simpan_resep", async (req, res) => {
    if (!req.body ||
        req.body.tgl_sjp === undefined ||
        req.body.ref_asal_sjp === undefined ||
        req.body.poli_rsp === undefined ||
        req.body.kd_jns_obat === undefined ||
        req.body.no_resep === undefined ||
        req.body.id_user === undefined ||
        req.body.tgl_resep === undefined ||
        req.body.tgl_pel_rsp === undefined ||
        req.body.kd_dr === undefined ||
        req.body.iterasi === undefined
    ) {
        return res.status(400).json({
            status: 400,
            message: "Parameter belum lengkap"
        });
    }

    let vartgl_sjp = req.body.tgl_sjp;
    let varref_asal_sjp = req.body.ref_asal_sjp;
    let varpoli_rsp = req.body.poli_rsp;
    let varkd_jns_obat = req.body.kd_jns_obat;
    let varno_resep = req.body.no_resep;
    let varid_user = req.body.id_user;
    let vartgl_resep = req.body.tgl_resep;
    let vartgl_pel_rsp = req.body.tgl_pel_rsp;
    let varkd_dr = req.body.kd_dr;
    let variterasi = req.body.iterasi;

    try {
        let hasil = await simpan_resep(
            vartgl_sjp,
            varref_asal_sjp,
            varpoli_rsp,
            varkd_jns_obat,
            varno_resep,
            varid_user,
            vartgl_resep,
            vartgl_pel_rsp,
            varkd_dr,
            variterasi
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

router.delete("/hapus_resep", async (req, res) => {
    if (!req.body ||
        req.body.no_sjp === undefined ||
        req.body.ref_asal_sjp === undefined ||
        req.body.no_resep === undefined
    ) {
        return res.status(400).json({
            status: 400,
            message: "Parameter belum lengkap"
        });
    }

    let varno_sjp = req.body.no_sjp;
    let varref_asal_sjp = req.body.ref_asal_sjp;
    let varno_resep = req.body.no_resep;

    try {
        let hasil = await hapus_resep(
            varno_sjp,
            varref_asal_sjp,
            varno_resep
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

router.post("/daftar_resep", async (req, res) => {
    if (!req.body ||
        req.body.kd_ppk === undefined ||
        req.body.kd_jns_obat === undefined ||
        req.body.jns_tgl === undefined ||
        req.body.tgl_mulai === undefined ||
        req.body.tgl_akhir === undefined
    ) {
        return res.status(400).json({
            status: 400,
            message: "Parameter belum lengkap"
        });
    }

    let varkd_ppk = req.body.kd_ppk;
    let varkd_jns_obat = req.body.kd_jns_obat;
    let varjns_tgl = req.body.jns_tgl;
    let vartgl_mulai = req.body.tgl_mulai;
    let vartgl_akhir = req.body.tgl_akhir;

    try {
        let hasil = await daftar_resep(
            varkd_ppk,
            varkd_jns_obat,
            varjns_tgl,
            vartgl_mulai,
            vartgl_akhir
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

module.exports = router;
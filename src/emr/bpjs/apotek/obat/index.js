// core

// 3rd
const express = require("express");

// local
const { 
    non_racikan,
    racikan,
    update_stok_obat
} = require("../../../../bpjs/apotek/obat/index");

const router = express.Router();

router.post("/non_racikan", async (req, res) => {
    if (!req.body || 
        req.body.no_sjp === undefined ||
        req.body.no_resep === undefined ||
        req.body.kd_obt === undefined ||
        req.body.nm_obt === undefined ||
        req.body.signa1_obt === undefined ||
        req.body.signa2_obt === undefined ||
        req.body.jml_obt === undefined ||
        req.body.jho === undefined ||
        req.body.catatan_khusus === undefined
    ) {
        return res.status(400).json({
            status: 400,
            message: "Parameter belum lengkap"
        });
    }

    let varno_sjp = req.body.no_sjp;
    let varno_resep = req.body.no_resep;
    let varkd_obt = req.body.kd_obt;
    let varnm_obt = req.body.nm_obt;
    let varsigna1_obt = req.body.signa1_obt;
    let varsigna2_obt = req.body.signa2_obt;
    let varjml_obt = req.body.jml_obt;
    let varjho = req.body.jho;
    let varcatatan_khusus = req.body.catatan_khusus;

    try {
        let hasil = await non_racikan(
            varno_sjp,
            varno_resep,
            varkd_obt,
            varnm_obt,
            varsigna1_obt,
            varsigna2_obt,
            varjml_obt,
            varjho,
            varcatatan_khusus
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

router.post("/racikan", async (req, res) => {
    if (!req.body || 
        req.body.no_sjp === undefined ||
        req.body.no_resep === undefined ||
        req.body.jns_obt === undefined ||
        req.body.kd_obt === undefined ||
        req.body.nm_obt === undefined ||
        req.body.signa1_obt === undefined ||
        req.body.signa2_obt === undefined ||
        req.body.permintaan === undefined ||
        req.body.jml_obt === undefined ||
        req.body.jho === undefined ||
        req.body.catatan_khusus === undefined
    ) {
        return res.status(400).json({
            status: 400,
            message: "Parameter belum lengkap"
        });
    }

    let varno_sjp = req.body.no_sjp;
    let varno_resep = req.body.no_resep;
    let varjns_obt = req.body.jns_obt;
    let varkd_obt = req.body.kd_obt;
    let varnm_obt = req.body.nm_obt;
    let varsigna1_obt = req.body.signa1_obt;
    let varsigna2_obt = req.body.signa2_obt;
    let varpermintaan = req.body.permintaan;
    let varjml_obt = req.body.jml_obt;
    let varjho = req.body.jho;
    let varcatatan_khusus = req.body.catatan_khusus;

    try {
        let hasil = await racikan(
            varno_sjp,
            varno_resep,
            varjns_obt,
            varkd_obt,
            varnm_obt,
            varsigna1_obt,
            varsigna2_obt,
            varpermintaan,
            varjml_obt,
            varjho,
            varcatatan_khusus
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

router.post("/update_stok_obat", async (req, res) => {
    if (!req.body || 
        req.body.kd_obat === undefined ||
        req.body.stok === undefined
    ) {
        return res.status(400).json({
            status: 400,
            message: "Parameter belum lengkap"
        });
    }

    let varkd_obt = req.body.kd_obt;
    let varstok = req.body.stok;

    try {
        let hasil = await update_stok_obat(            
            varkd_obt,
            varstok
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
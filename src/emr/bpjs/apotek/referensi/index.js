// core

// 3rd
const express = require("express");

// local
const { 
    dpho,
    poli,
    fasilitas_kesehatan,
    setting_apotek,
    spesialistik,
    obat
} = require("../../../../bpjs/apotek/referensi/index");

const router = express.Router();

router.get("/dpho", async (req, res) => {
    try {
        let hasil = await dpho();
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

router.post("/poli", async (req, res) => {
    if (!req.body || req.body.poli === undefined) {
        return res.status(400).json({
            status: 400,
            message: "Parameter belum lengkap"
        });
    }

    let varpoli = req.body.poli;

    try {
        let hasil = await poli(varpoli);
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

router.post("/fasilitas_kesehatan", async (req, res) => {
    if (!req.body || req.body.jenis === undefined || req.body.nama === undefined) {
        return res.status(400).json({
            status: 400,
            message: "Parameter belum lengkap"
        });
    }

    let varjenis = req.body.jenis;
    let varnama = req.body.nama;

    try {
        let hasil = await fasilitas_kesehatan(varjenis, varnama);
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

router.post("/setting_apotek", async (req, res) => {
    if (!req.body || req.body.kode === undefined) {
        return res.status(400).json({
            status: 400,
            message: "Parameter belum lengkap"
        });
    }

    let varkode = req.body.kode;

    try {
        let hasil = await setting_apotek(varkode);
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

router.get("/spesialistik", async (req, res) => {
    try {
        let hasil = await spesialistik();
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

router.post("/obat", async (req, res) => {
    if (!req.body || req.body.jenis === undefined || req.body.tgl_resep === undefined || req.body.pencarian === undefined) {
        return res.status(400).json({
            status: 400,
            message: "Parameter belum lengkap"
        });
    }

    let varjenis = req.body.jenis;
    let vartglresep = req.body.tgl_resep;
    let varpencarian = req.body.pencarian;

    try {
        let hasil = await obat(varjenis, vartglresep,  varpencarian);
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
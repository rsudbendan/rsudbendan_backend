// core

// 3rd
const express = require("express");

// local
const { 
    cari_no_kunjungan
} = require("../../../../bpjs/apotek/sep/index");

const router = express.Router();

router.post("/cari_no_kunjungan", async (req, res) => {
    if (!req.body || req.body.sep === undefined) {
        return res.status(400).json({
            status: 400,
            message: "Parameter belum lengkap"
        });
    }

    let varsep = req.body.sep;

    try {
        let hasil = await cari_no_kunjungan(varsep);
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
// core

// 3rd
const express = require("express");

// local
const { 
    rekap_peserta_prb
} = require("../../../../bpjs/apotek/prb/index");

const router = express.Router();

router.post("/rekap_peserta_prb", async (req, res) => {
    if (!req.body || req.body.tahun === undefined || req.body.bulan === undefined) {
        return res.status(400).json({
            status: 400,
            message: "Parameter belum lengkap"
        });
    }

    let vartahun = req.body.tahun;
    let varbulan = req.body.bulan;

    try {
        let hasil = await rekap_peserta_prb(vartahun, varbulan);
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
// core

// 3rd
const express = require("express");

// local
const { 
    history_pelayanan_peserta
} = require("../../../../bpjs/vclaim/monitoring/index");

const router = express.Router();

router.post("/history_pelayanan_peserta", async (req, res) => {
    if (!req.body || req.body.no_kartu === undefined || req.body.tgl_awal === undefined || req.body.tgl_akhir === undefined) {
        return res.status(400).json({
            status: 400,
            message: "Parameter belum lengkap"
        });
    }

    let varnokartu = req.body.no_kartu;
    let vartgl_awal = req.body.tgl_awal;
    let vartgl_akhir = req.body.tgl_akhir;

    try {
        let hasil = await history_pelayanan_peserta(varnokartu, vartgl_awal, vartgl_akhir);
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
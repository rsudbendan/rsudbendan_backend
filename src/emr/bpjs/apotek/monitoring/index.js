// core

// 3rd
const express = require("express");

// local
const { 
    data_klaim
} = require("../../../../bpjs/apotek/monitoring/index");

const router = express.Router();

router.post("/data_klaim", async (req, res) => {
    if (!req.body || 
        req.body.bulan === undefined ||
        req.body.tahun === undefined ||
        req.body.jenis_obat === undefined ||
        req.body.status === undefined
    ) {
        return res.status(400).json({
            status: 400,
            message: "Parameter belum lengkap"
        });
    }

    let varbulan = req.body.bulan;
    let vartahun = req.body.tahun;
    let varjenis_obat = req.body.jenis_obat;
    let varstatus = req.body.status;

    try {
        let hasil = await data_klaim(varbulan, vartahun, varjenis_obat, varstatus);
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
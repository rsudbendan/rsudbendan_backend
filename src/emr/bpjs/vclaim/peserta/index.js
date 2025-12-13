// core

// 3rd
const express = require("express");

// local
const { 
    no_kartu_bpjs,
    nik
} = require("../../../../bpjs/vclaim/peserta/index");

const router = express.Router();

router.post("/no_kartu_bpjs", async (req, res) => {
    if (!req.body || req.body.no_kartu === undefined || req.body.tgl === undefined) {
        return res.status(400).json({
            status: 400,
            message: "Parameter belum lengkap"
        });
    }

    let varnokartu = req.body.no_kartu;
    let vartgl = req.body.tgl;

    try {
        let hasil = await no_kartu_bpjs(varnokartu, vartgl);
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

router.post("/nik", async (req, res) => {
    if (!req.body || req.body.nik === undefined || req.body.tgl === undefined) {
        return res.status(400).json({
            status: 400,
            message: "Parameter belum lengkap"
        });
    }

    let varnik = req.body.nik;
    let vartgl = req.body.tgl;

    try {
        let hasil = await nik(varnik, vartgl);
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
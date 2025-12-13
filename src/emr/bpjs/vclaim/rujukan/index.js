// core

// 3rd
const express = require("express");

// local
const {
    nomor_rujukan,
    nomor_kartu,
    nomor_kartu_multi
} = require("../../../../bpjs/vclaim/rujukan/index");

const router = express.Router();

router.post("/nomor_rujukan", async (req, res) => {
    if (!req.body || req.body.nomor_rujukan === undefined) {
        return res.status(400).json({
            status: 400,
            message: "Parameter belum lengkap"
        });
    }

    let varnomor_rujukan = req.body.nomor_rujukan;

    try {
        let hasil = await nomor_rujukan(varnomor_rujukan);
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

router.post("/nomor_kartu", async (req, res) => {
    if (!req.body || req.body.nomor_kartu === undefined) {
        return res.status(400).json({
            status: 400,
            message: "Parameter belum lengkap"
        });
    }

    let varnomor_kartu = req.body.nomor_kartu;

    try {
        let hasil = await nomor_kartu(varnomor_kartu);
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

router.post("/nomor_kartu_multi", async (req, res) => {
    if (!req.body || req.body.nomor_kartu === undefined) {
        return res.status(400).json({
            status: 400,
            message: "Parameter belum lengkap"
        });
    }

    let varnomor_kartu = req.body.nomor_kartu;

    try {
        let hasil = await nomor_kartu_multi(varnomor_kartu);
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
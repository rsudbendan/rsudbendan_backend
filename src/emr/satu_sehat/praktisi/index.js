// core

// 3rd
const express = require("express");

// local
require('dotenv').config();
const { fungsi_generate_token } = require("../fungsi");
const { cari_by_nik } = require("../../../satu_sehat/praktisi/index");

const router = express.Router();

router.post("/cari_by_nik", async (req, res) => {
    if (!req.body || !req.body.nik) {
        return res.status(400).json({
            status: 400,
            message: "Parameter belum lengkap"
        });
    }

    let nik = req.body.nik;

    // generate token
    let hasil_generate_token = await fungsi_generate_token();
    if (hasil_generate_token.status !== 200) {
        return res.status(hasil_generate_token.status).json({
            status: hasil_generate_token.status,
            message: hasil_generate_token.message
        })
    }

    let token = hasil_generate_token.data.token

    // fungsi utama
    try {
        let hasil_cari_by_nik = await cari_by_nik(token, nik);
        return res.status(hasil_cari_by_nik.status).json({
            status: hasil_cari_by_nik.status,
            message: hasil_cari_by_nik.message,
            data: hasil_cari_by_nik.data
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Terjadi kesalahan : " + error.message
        });
    }    
})

module.exports = router;
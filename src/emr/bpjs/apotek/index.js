// core

// 3rd
const express = require("express");

// local
const { fungsi_permintaan_vclaim } = require("../fungsi");

const router = express.Router();

router.get("/dpho", async (req, res) => {
    // // buat timestamp
    // let hasil_buat_timestamp = await fungsi_buat_timestamp();
    // if (hasil_buat_timestamp.status !== 200) {
    //     return res.status(hasil_buat_timestamp.status).json({
    //         status: hasil_buat_timestamp.status,
    //         message: hasil_buat_timestamp.message
    //     })
    // }

    // let timestamp = hasil_buat_timestamp.data.timestamp;

    // // buat signature
    // let hasil_buat_signature = await fungsi_buat_signature(timestamp);
    // if (hasil_buat_signature.status !== 200) {
    //     return res.status(hasil_buat_signature.status).json({
    //         status: hasil_buat_signature.status,
    //         message: hasil_buat_signature.message
    //     })
    // }

    // fungsi utama
    try {
        let hasil_permintaan_vclaim = await fungsi_permintaan_vclaim("referensi/propinsi", "GET", "");
        return res.status(hasil_permintaan_vclaim.status).json({
            status: hasil_permintaan_vclaim.status,
            message: hasil_permintaan_vclaim.message,
            data: hasil_permintaan_vclaim.data
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Terjadi kesalahan : " + error.message
        });
    }    
})

module.exports = router;
// core

// 3rd
const express = require("express");

// local
require('dotenv').config();
const { fungsi_generate_token } = require("../fungsi");

const router = express.Router();

router.get("/generate_token", async (req, res) => {
    let hasil_perbarui_token = await fungsi_generate_token();

    return res.status(hasil_perbarui_token.status).json({
        status: hasil_perbarui_token.status,
        message: hasil_perbarui_token.message,
        data: hasil_perbarui_token.data
    })    
})

module.exports = router;
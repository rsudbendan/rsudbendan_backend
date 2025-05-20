// core

// 3rd
const express = require("express");

// local
require('dotenv').config();
// const { fungsi_generate_token } = require("../fungsi");
const { generate_token } = require("../../../satu_sehat/autentikasi/index");

const router = express.Router();

router.get("/generate_token", async (req, res) => {
    let hasil_generate_token = await generate_token();

    return res.status(hasil_generate_token.status).json({
        status: hasil_generate_token.status,
        message: hasil_generate_token.message,
        data: hasil_generate_token.data
    })    
})

module.exports = router;
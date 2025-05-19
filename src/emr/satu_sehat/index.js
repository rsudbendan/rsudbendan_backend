// core

// 3rd
const express = require("express");

const router = express.Router();

// local
const autentikasi = require("./autentikasi/index");
const pasien = require("./pasien/index");

// fungsi
router.use("/autentikasi", autentikasi);
router.use("/pasien", pasien);

module.exports = router;
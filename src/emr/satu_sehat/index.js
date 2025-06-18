// core

// 3rd
const express = require("express");

const router = express.Router();

// local
const autentikasi = require("./autentikasi/index");
const pasien = require("./pasien/index");
const praktisi = require("./praktisi/index");
const encounter = require("./encounter/index");

// fungsi
router.use("/autentikasi", autentikasi);
router.use("/pasien", pasien);
router.use("/praktisi", praktisi);
router.use("/encounter", encounter);

module.exports = router;
// core

// 3rd
const express = require("express");

const router = express.Router();

// local
const monitoring = require("./monitoring/index");
const peserta = require("./peserta/index");
const referensi = require("./referensi/index");
const rujukan = require("./rujukan/index");

// fungsi
router.use("/monitoring", monitoring);
router.use("/peserta", peserta);
router.use("/referensi", referensi);
router.use("/rujukan", rujukan);

module.exports = router;
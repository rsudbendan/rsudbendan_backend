// core

// 3rd
const express = require("express");

const router = express.Router();

// local
const monitoring = require("./monitoring/index");
const peserta = require("./peserta/index");
const referensi = require("./referensi/index");
const rencana_kontrol = require("./rencana_kontrol/index");
const rujukan = require("./rujukan/index");
const sep = require("./sep/index");

// fungsi
router.use("/monitoring", monitoring);
router.use("/peserta", peserta);
router.use("/referensi", referensi);
router.use("/rencana_kontrol", rencana_kontrol);
router.use("/rujukan", rujukan);
router.use("/sep", sep);

module.exports = router;
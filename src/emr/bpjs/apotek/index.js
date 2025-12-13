// core

// 3rd
const express = require("express");

const router = express.Router();

// local
const referensi = require("./referensi/index");
const obat = require("./obat/index");
const pelayanan_obat = require("./pelayanan_obat/index");
const resep = require("./resep/index");
const sep = require("./sep/index");
const monitoring = require("./monitoring/index");
const prb = require("./prb/index");

// fungsi
router.use("/referensi", referensi);
router.use("/obat", obat);
router.use("/pelayanan_obat", pelayanan_obat);
router.use("/resep", resep);
router.use("/sep", sep);
router.use("/monitoring", monitoring);
router.use("/prb", prb);

module.exports = router;
// core

// 3rd
const express = require("express");

const router = express.Router();

// local
const satu_sehat = require("./satu_sehat/index");
const bpjs = require("./bpjs/index");

// fungsi
router.use("/satu_sehat", satu_sehat);
router.use("/bpjs", bpjs);

module.exports = router;
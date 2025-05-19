// core

// 3rd
const express = require("express");

const router = express.Router();

// local
const satu_sehat = require("./satu_sehat/index");

// fungsi
router.use("/satu_sehat", satu_sehat);

module.exports = router;
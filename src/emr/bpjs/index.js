// core

// 3rd
const express = require("express");

const router = express.Router();

// local
const apotek = require("./apotek/index");

// fungsi
router.use("/apotek", apotek);

module.exports = router;
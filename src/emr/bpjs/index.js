// core

// 3rd
const express = require("express");

const router = express.Router();

// local
const apotek = require("./apotek/index");
const vclaim = require("./vclaim/index");

// fungsi
router.use("/apotek", apotek);
router.use("/vclaim", vclaim);

module.exports = router;
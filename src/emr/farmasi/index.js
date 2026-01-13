// core

// 3rd
const express = require("express");

const router = express.Router();

// local
const e_resep = require("./e_resep/index");

// fungsi
router.use("/e_resep", e_resep);

module.exports = router;
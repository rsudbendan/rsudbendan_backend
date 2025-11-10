// core

// 3rd
const express = require("express");

const router = express.Router();

// local
// const satu_sehat = require("./satu_sehat/index");

// fungsi
// router.use("/satu_sehat", satu_sehat);

router.use("/", (req, res) => {
    res.status(404);
    res.json({
        "status": 404,
        "message": "Sip"
    })
});

module.exports = router;
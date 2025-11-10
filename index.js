// core

// 3rd
const express = require("express");
const cors = require("cors");

const app = express();

// local
require('dotenv').config();
const emr = require("./src/emr/index");
const bpjs = require("./src/bpjs/index");

// application level middleware
app.use(cors());
app.use(express.json());

// built in middleware
app.use(express.static("public"));

// fungsi
app.use("/emr", emr);
app.use("/bpjs", bpjs);

app.use("/", (req, res) => {
    res.status(404);
    res.json({
        "status": 404,
        "message": "Error 404 : Halaman tidak ditemukan"
    })
});

app.listen(process.env.PORT, () => {
    console.log(`Aplikasi berjalan di http://localhost:${process.env.PORT}`);
});
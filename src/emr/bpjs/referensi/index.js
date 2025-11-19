// core

// 3rd
const express = require("express");

// local
const {
    diagnosa,
    poli,
    fasilitas_kesehatan,
    dokter_dpjp,
    propinsi,
    kabupaten,
    kecamatan,
    diagnosa_program_prb,
    obat_generik_program_prb
} = require("../../../bpjs/referensi/index");

const router = express.Router();

router.post("/diagnosa", async (req, res) => {
    if (!req.body || req.body.diagnosa === undefined) {
        return res.status(400).json({
            status: 400,
            message: "Parameter belum lengkap"
        });
    }

    let vardiagnosa = req.body.diagnosa;

    try {
        let hasil = await diagnosa(vardiagnosa);
        return res.status(hasil.status).json({
            status: hasil.status,
            message: hasil.message,
            data: hasil.data
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Terjadi kesalahan : " + error.message
        });
    }
})

router.post("/poli", async (req, res) => {
    if (!req.body || req.body.poli === undefined) {
        return res.status(400).json({
            status: 400,
            message: "Parameter belum lengkap"
        });
    }

    let varpoli = req.body.poli;

    try {
        let hasil = await poli(varpoli);
        return res.status(hasil.status).json({
            status: hasil.status,
            message: hasil.message,
            data: hasil.data
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Terjadi kesalahan : " + error.message
        });
    }
})

router.post("/fasilitas_kesehatan", async (req, res) => {
    if (!req.body || req.body.nama === undefined || req.body.jenis === undefined) {
        return res.status(400).json({
            status: 400,
            message: "Parameter belum lengkap"
        });
    }

    let varnama = req.body.nama;
    let varjenis = req.body.jenis;

    try {
        let hasil = await fasilitas_kesehatan(varnama, varjenis);
        return res.status(hasil.status).json({
            status: hasil.status,
            message: hasil.message,
            data: hasil.data
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Terjadi kesalahan : " + error.message
        });
    }
})

router.post("/dokter_dpjp", async (req, res) => {
    if (!req.body || req.body.jenis === undefined || req.body.tgl === undefined || req.body.spesialis === undefined) {
        return res.status(400).json({
            status: 400,
            message: "Parameter belum lengkap"
        });
    }

    let varjenis = req.body.jenis;
    let vartgl = req.body.tgl;
    let varspesialis = req.body.spesialis;

    try {
        let hasil = await dokter_dpjp(varjenis, vartgl, varspesialis);
        return res.status(hasil.status).json({
            status: hasil.status,
            message: hasil.message,
            data: hasil.data
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Terjadi kesalahan : " + error.message
        });
    }
})

router.get("/propinsi", async (req, res) => {
    try {
        let hasil = await propinsi();
        return res.status(hasil.status).json({
            status: hasil.status,
            message: hasil.message,
            data: hasil.data
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Terjadi kesalahan : " + error.message
        });
    }
})

router.post("/kabupaten", async (req, res) => {
    if (!req.body || req.body.propinsi === undefined) {
        return res.status(400).json({
            status: 400,
            message: "Parameter belum lengkap"
        });
    }

    let varpropinsi = req.body.propinsi;

    try {
        let hasil = await kabupaten(varpropinsi);
        return res.status(hasil.status).json({
            status: hasil.status,
            message: hasil.message,
            data: hasil.data
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Terjadi kesalahan : " + error.message
        });
    }
})

router.post("/kecamatan", async (req, res) => {
    if (!req.body || req.body.kabupaten === undefined) {
        return res.status(400).json({
            status: 400,
            message: "Parameter belum lengkap"
        });
    }

    let varkabupaten = req.body.kabupaten;

    try {
        let hasil = await kecamatan(varkabupaten);
        return res.status(hasil.status).json({
            status: hasil.status,
            message: hasil.message,
            data: hasil.data
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Terjadi kesalahan : " + error.message
        });
    }
})

router.get("/diagnosa_program_prb", async (req, res) => {
    try {
        let hasil = await diagnosa_program_prb();
        return res.status(hasil.status).json({
            status: hasil.status,
            message: hasil.message,
            data: hasil.data
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Terjadi kesalahan : " + error.message
        });
    }
})

router.post("/obat_generik_program_prb", async (req, res) => {
    if (!req.body || req.body.obat === undefined) {
        return res.status(400).json({
            status: 400,
            message: "Parameter belum lengkap"
        });
    }

    let varobat = req.body.obat;

    try {
        let hasil = await obat_generik_program_prb(varobat);
        return res.status(hasil.status).json({
            status: hasil.status,
            message: hasil.message,
            data: hasil.data
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Terjadi kesalahan : " + error.message
        });
    }
})

module.exports = router;
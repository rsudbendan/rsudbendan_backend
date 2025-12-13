// core

// 3rd
const express = require("express");

// local
const { 
    hapus_pelayanan_obat,
    daftar_pelayanan_obat,
    riwayat_pelayanan_obat
} = require("../../../../bpjs/apotek/pelayanan_obat/index");

const router = express.Router();

router.delete("/hapus_pelayanan_obat", async (req, res) => {
    if (!req.body || 
        req.body.no_sjp === undefined ||
        req.body.no_resep === undefined ||
        req.body.kode_obat === undefined ||
        req.body.tipe_obat === undefined
    ) {
        return res.status(400).json({
            status: 400,
            message: "Parameter belum lengkap"
        });
    }

    let varno_sjp = req.body.no_sjp;
    let varno_resep = req.body.no_resep;
    let varkode_obat = req.body.kode_obat;
    let vartipe_obat = req.body.tipe_obat;

    try {
        let hasil = await hapus_pelayanan_obat(
            varno_sjp,
            varno_resep,
            varkode_obat,
            vartipe_obat
        );
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

router.post("/daftar_pelayanan_obat", async (req, res) => {
    if (!req.body || req.body.sep === undefined) {
        return res.status(400).json({
            status: 400,
            message: "Parameter belum lengkap"
        });
    }

    let varsep = req.body.sep;

    try {
        let hasil = await daftar_pelayanan_obat(varsep);
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

router.post("/riwayat_pelayanan_obat", async (req, res) => {
    if (!req.body || req.body.tgl_awal === undefined || req.body.tgl_akhir === undefined || req.body.no_kartu === undefined) {
        return res.status(400).json({
            status: 400,
            message: "Parameter belum lengkap"
        });
    }

    let vartgl_awal = req.body.tgl_awal;
    let vartgl_akhir = req.body.tgl_akhir;
    let varno_kartu = req.body.no_kartu;

    try {
        let hasil = await riwayat_pelayanan_obat(vartgl_awal, vartgl_akhir, varno_kartu);
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
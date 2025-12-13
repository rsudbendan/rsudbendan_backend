// core

// 3rd
const express = require("express");

// local
const {
    insert_sep,
    insert_sppri
} = require("../../../../bpjs/vclaim/rencana_kontrol/index");

const router = express.Router();

router.post("/insert_sppri", async (req, res) => {
    if (!req.body ||
        req.body.no_kartu === undefined ||
        req.body.kode_dokter === undefined ||
        req.body.poli_kontrol === undefined ||
        req.body.tgl_rencana_kontrol === undefined ||        
        req.body.user === undefined
    ) {
        return res.status(400).json({
            status: 400,
            message: "Parameter belum lengkap"
        });
    }

    let varno_kartu = req.body.no_kartu;
    let varkode_dokter = req.body.kode_dokter;
    let varpoli_kontrol = req.body.poli_kontrol;
    let vartgl_rencana_kontrol = req.body.tgl_rencana_kontrol;    
    let varuser = req.body.user;

    try {
        let hasil = await insert_sppri(
            varno_kartu,
            varkode_dokter,
            varpoli_kontrol,
            vartgl_rencana_kontrol,            
            varuser
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

module.exports = router;
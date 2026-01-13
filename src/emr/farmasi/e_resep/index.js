// core

// 3rd
const express = require("express");

// local
const koneksi = require("../../../koneksi");

const router = express.Router();

router.post("/tampil_obat_dpho", async (req, res) => {
    if (!req.body || req.body.status === undefined) {
        return res.status(400).json({
            status: 400,
            message: "Parameter belum lengkap"
        });
    }

    let varstatus = "";
    if (req.body.status === 1) {
        varstatus = "IFNULL(bpjs_kodeobat,'') <> ''";
    }
    else {
        varstatus = "IFNULL(bpjs_kodeobat,'') = ''";
    }
    let connection;
    try {
        connection = await koneksi.koneksi_rsbendan.getConnection();

        let [baris] = await connection.query(`
            SELECT
                kdbrg,
                kdsatuan,
                nmbrg,
                hrgdsrjual,
                hrgstdjual,
                bpjs_kodeobat 
            FROM
                barang
            WHERE
                ${varstatus}
            ORDER BY 
                nmbrg
        `);

        return res.status(200).json({
            status: 200,
            message: "Sukses",
            data: baris
        });        
    } catch (error) {
        if (connection) await connection.rollback();
        return res.status(400).json({
            status: 400,
            message: "Terjadi kesalahan dalam koneksi database : " + error.message
        });
    } finally {
        if (connection) connection.release();
    }
})

module.exports = router;
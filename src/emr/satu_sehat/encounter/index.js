// core

// 3rd
const express = require("express");

// local
require('dotenv').config();
const { fungsi_generate_token } = require("../fungsi");
const { buat } = require("../../../satu_sehat/encounter/index");

const router = express.Router();

router.post("/buat", async (req, res) => {
    if (!req.body || !req.body.nik) {
        return res.status(400).json({
            status: 400,
            message: "Parameter belum lengkap"
        });
    }

    let nik = req.body.nik;

    // generate token
    let hasil_generate_token = await fungsi_generate_token();
    if (hasil_generate_token.status !== 200) {
        return res.status(hasil_generate_token.status).json({
            status: hasil_generate_token.status,
            message: hasil_generate_token.message
        })
    }

    let token = hasil_generate_token.data.token

    let body = {
        resourceType: "Encounter",
        status: "arrived",
        class: {
            system: "http://terminology.hl7.org/CodeSystem/v3-ActCode",
            code: "AMB",
            display: "ambulatory"
        },
        subject: {
            reference: "Patient/P03647103112",
            display: "patient 2"
        },
        participant: [
            {
                type: [
                    {
                        coding: [
                            {
                                system: "http://terminology.hl7.org/CodeSystem/v3-ParticipationType",
                                code: "ATND",
                                display: "attender"
                            }
                        ]
                    }
                ],
                individual: {
                    reference: "Practitioner/10006926841",
                    display: "dr. Yoga Yandika, Sp.A"
                }
            }
        ],
        period: {
            start: "2022-06-14T07:00:00+07:00"
        },
        location: [
            {
                location: {
                    reference: "Location/b017aa54-f1df-4ec2-9d84-8823815d7228",
                    display: "Ruang 1A, Poliklinik Bedah Rawat Jalan Terpadu, Lantai 2, Gedung G"
                }
            }
        ],
        statusHistory: [
            {
                status: "arrived",
                period: {
                    start: "2022-06-14T07:00:00+07:00"
                }
            }
        ],
        serviceProvider: {
            reference: "Organization/7688ce50-bdb3-43c5-9777-b58c9effe8f8"
        },
        identifier: [
            {
                system: "http://sys-ids.kemkes.go.id/encounter/7688ce50-bdb3-43c5-9777-b58c9effe8f8",
                value: "P20240001"
            }
        ]
    };

    // fungsi utama
    try {
        let hasil_buat = await buat(token, body);
        return res.status(hasil_buat.status).json({
            status: hasil_buat.status,
            message: hasil_buat.message,
            data: hasil_buat.data
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Terjadi kesalahan : " + error.message
        });
    }
})

module.exports = router;
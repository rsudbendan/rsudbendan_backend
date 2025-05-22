// core

// 3rd
const express = require("express");

// local
require('dotenv').config();
const koneksi = require("../../../koneksi");
const { convertToISO } = require("../../../fungsi");
const { fungsi_generate_token } = require("../fungsi");
const { buat } = require("../../../satu_sehat/encounter/index");

const router = express.Router();

router.post("/buat", async (req, res) => {
    // if (!req.body || !req.body.nik) {
    //     return res.status(400).json({
    //         status: 400,
    //         message: "Parameter belum lengkap"
    //     });
    // }

    if (!req.body) {
        return res.status(400).json({
            status: 400,
            message: "Parameter belum lengkap"
        });
    }

    let norm = req.body.norm;
    let noreg = req.body.noreg;
    let status = req.body.status;
    let class_code = req.body.class_code;
    let class_display = req.body.class_display;
    let subject_patient_id = req.body.subject_patient_id;
    let subject_patient_name = req.body.subject_patient_name;
    let participant_coding_code = req.body.participant_coding_code;
    let participant_coding_display = req.body.participant_coding_display;
    let participant_individual_id = req.body.participant_individual_id;
    let participant_individual_display = req.body.participant_individual_display;
    let period_start = convertToISO(req.body.period_start);
    let location_id = req.body.location_id;
    let location_display = req.body.location_display;
    let history_status = req.body.history_status;
    let history_start = convertToISO(req.body.history_start);

    // generate token
    let hasil_generate_token = await fungsi_generate_token();
    if (hasil_generate_token.status !== 200) {
        return res.status(hasil_generate_token.status).json({
            status: hasil_generate_token.status,
            message: hasil_generate_token.message
        })
    }

    let token = hasil_generate_token.data.token

    // fungsi utama
    // let body = {
    //     resourceType: "Encounter",
    //     status: "arrived",
    //     class: {
    //         system: "http://terminology.hl7.org/CodeSystem/v3-ActCode",
    //         code: "AMB",
    //         display: "ambulatory"
    //     },
    //     subject: {
    //         reference: "Patient/P03647103112",
    //         display: "patient 2"
    //     },
    //     participant: [
    //         {
    //             type: [
    //                 {
    //                     coding: [
    //                         {
    //                             system: "http://terminology.hl7.org/CodeSystem/v3-ParticipationType",
    //                             code: "ATND",
    //                             display: "attender"
    //                         }
    //                     ]
    //                 }
    //             ],
    //             individual: {
    //                 reference: "Practitioner/10006926841",
    //                 display: "dr. Yoga Yandika, Sp.A"
    //             }
    //         }
    //     ],
    //     period: {
    //         start: "2022-06-14T07:00:00+07:00"
    //     },
    //     location: [
    //         {
    //             location: {
    //                 reference: "Location/b017aa54-f1df-4ec2-9d84-8823815d7228",
    //                 display: "Ruang 1A, Poliklinik Bedah Rawat Jalan Terpadu, Lantai 2, Gedung G"
    //             }
    //         }
    //     ],
    //     statusHistory: [
    //         {
    //             status: "arrived",
    //             period: {
    //                 start: "2022-06-14T07:00:00+07:00"
    //             }
    //         }
    //     ],
    //     serviceProvider: {
    //         reference: "Organization/7688ce50-bdb3-43c5-9777-b58c9effe8f8"
    //     },
    //     identifier: [
    //         {
    //             system: "http://sys-ids.kemkes.go.id/encounter/7688ce50-bdb3-43c5-9777-b58c9effe8f8",
    //             value: "P20240001"
    //         }
    //     ]
    // };

    let body = {
        resourceType: "Encounter",
        status: status,
        class: {
            system: "http://terminology.hl7.org/CodeSystem/v3-ActCode",
            code: class_code,
            display: class_display
        },
        subject: {
            reference: "Patient/" + subject_patient_id,
            display: subject_patient_name
        },
        participant: [
            {
                type: [
                    {
                        coding: [
                            {
                                system: "http://terminology.hl7.org/CodeSystem/v3-ParticipationType",
                                code: participant_coding_code,
                                display: participant_coding_display
                            }
                        ]
                    }
                ],
                individual: {
                    reference: "Practitioner/" + participant_individual_id,
                    display: participant_individual_display
                }
            }
        ],
        period: {
            start: period_start
        },
        location: [
            {
                location: {
                    reference: "Location/" + location_id,
                    display: location_display
                }
            }
        ],
        statusHistory: [
            {
                status: history_status,
                period: {
                    start: history_start
                }
            }
        ],
        serviceProvider: {
            reference: "Organization/" + process.env.SATU_SEHAT_ORGANIZATION_ID
        },
        identifier: [
            {
                system: "http://sys-ids.kemkes.go.id/encounter/" + process.env.SATU_SEHAT_ORGANIZATION_ID,
                value: noreg
            }
        ]
    };

    try {
        let hasil_buat = await buat(token, body);

        let id_encounter = "";
        if (hasil_buat.status === 200) {
            id_encounter = hasil_buat.data.id;
        }

        let json_response = JSON.stringify(hasil_buat.data, null, 2);

        let connection;
        try {
            connection = await koneksi.koneksi_rsbendan.getConnection();

            // Memulai transaksi
            await connection.beginTransaction();

            // INSERT
            await connection.query(`
                INSERT INTO 
                    satusehat_encounter_baru ( 
                        id_encounter,
                        environment, 
                        norm, 
                        noreg, 
                        json_response, 
                        waktu_entry 
                    )
                VALUES
                (?, ?, ?, ?, ?, now())
            `, [id_encounter, process.env.SATU_SEHAT_ENVIRONMENT, norm, noreg, json_response]);

            await connection.commit();
        } catch (error) {
            if (connection) await connection.rollback();
            return ({
                status: 400,
                message: "Terjadi kesalahan dalam koneksi database : " + error.message
            });
        } finally {
            if (connection) connection.release();
        }

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
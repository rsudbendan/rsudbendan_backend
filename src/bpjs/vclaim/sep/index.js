// core

// 3rd

// local
const { fungsi_permintaan_vclaim } = require("../../fungsi");

const cari_sep = async (sep) => {
    try {
        let hasil = await fungsi_permintaan_vclaim(`SEP/${sep}`, "GET", "");
        return ({
            status: hasil.status,
            message: hasil.message,
            data: hasil.data
        });
    } catch (error) {
        return ({
            status: 500,
            message: "Terjadi kesalahan : " + error.message
        });
    }
}

const cari_sep_no_rujukan = async (no_rujukan) => {
    try {
        let hasil = await fungsi_permintaan_vclaim(`Rujukan/lastsep/norujukan/${no_rujukan}`, "GET", "");
        return ({
            status: hasil.status,
            message: hasil.message,
            data: hasil.data
        });
    } catch (error) {
        return ({
            status: 500,
            message: "Terjadi kesalahan : " + error.message
        });
    }
}

const insert_sep = async (
    no_kartu,
    tgl_sep,
    ppk_pelayanan,
    jenis_pelayanan,
    kelas_rawat_hak,
    kelas_rawat_naik,
    kelas_rawat_pembiayaan,
    kelas_rawat_penanggung_jawab,
    norm,
    rujukan_asal,
    rujukan_tgl,
    rujukan_no,
    rujukan_ppk,
    catatan,
    diagnosa_awal,
    poli_tujuan,
    poli_eksekutif,
    cob,
    katarak,
    jaminan_laka_lantas,
    jaminan_no_lp,
    jaminan_penjamin_tgl_kejadian,
    jaminan_penjamin_keterangan,
    jaminan_penjamin_suplesi,
    jaminan_penjamin_suplesi_no_sep,
    jaminan_penjamin_suplesi_lokasi_laka_propinsi,
    jaminan_penjamin_suplesi_lokasi_laka_kabupaten,
    jaminan_penjamin_suplesi_lokasi_laka_kecamatan,
    tujuan_kunjungan,
    flag_procedure,
    kd_penunjang,
    asesmen_pel,
    skdp_no_surat,
    skdp_dpjp,
    dpjp,
    no_telpon,
    user
) => {
    try {
        const payload = {
            request: {
                t_sep: {
                    noKartu: no_kartu,
                    tglSep: tgl_sep,
                    ppkPelayanan: ppk_pelayanan,
                    jnsPelayanan: jenis_pelayanan,
                    klsRawat: {
                        klsRawatHak: kelas_rawat_hak,
                        klsRawatNaik: kelas_rawat_naik,
                        pembiayaan: kelas_rawat_pembiayaan,
                        penanggungJawab: kelas_rawat_penanggung_jawab
                    },
                    noMR: norm,
                    rujukan: {
                        asalRujukan: rujukan_asal,
                        tglRujukan: rujukan_tgl,
                        noRujukan: rujukan_no,
                        ppkRujukan: rujukan_ppk
                    },
                    catatan: catatan,
                    diagAwal: diagnosa_awal,
                    poli: {
                        tujuan: poli_tujuan,
                        eksekutif: poli_eksekutif
                    },
                    cob: {
                        cob: cob
                    },
                    katarak: {
                        katarak: katarak
                    },
                    jaminan: {
                        lakaLantas: jaminan_laka_lantas,
                        noLP: jaminan_no_lp,
                        penjamin: {
                            tglKejadian: jaminan_penjamin_tgl_kejadian,
                            keterangan: jaminan_penjamin_keterangan,
                            suplesi: {
                                suplesi: jaminan_penjamin_suplesi,
                                noSepSuplesi: jaminan_penjamin_suplesi_no_sep,
                                lokasiLaka: {
                                    kdPropinsi: jaminan_penjamin_suplesi_lokasi_laka_propinsi,
                                    kdKabupaten: jaminan_penjamin_suplesi_lokasi_laka_kabupaten,
                                    kdKecamatan: jaminan_penjamin_suplesi_lokasi_laka_kecamatan
                                }
                            }
                        }
                    },
                    tujuanKunj: tujuan_kunjungan,
                    flagProcedure: flag_procedure,
                    kdPenunjang: kd_penunjang,
                    assesmentPel: asesmen_pel,
                    skdp: {
                        noSurat: skdp_no_surat,
                        kodeDPJP: skdp_dpjp
                    },
                    dpjpLayan: dpjp,
                    noTelp: no_telpon,
                    user: user
                }
            }
        };


        let hasil = await fungsi_permintaan_vclaim(`SEP/2.0/insert`, "POST", JSON.stringify(payload));
        return ({
            status: hasil.status,
            message: hasil.message,
            data: hasil.data
        });
    } catch (error) {
        return ({
            status: 500,
            message: "Terjadi kesalahan : " + error.message
        });
    }
}

const delete_sep = async (sep, user) => {
    try {
        const payload = {
            request: {
                t_sep: {
                    noSep: sep,                    
                    user: user
                }
            }
        };

        let hasil = await fungsi_permintaan_vclaim(`SEP/2.0/delete`, "DELETE", JSON.stringify(payload));
        return ({
            status: hasil.status,
            message: hasil.message,
            data: hasil.data
        });
    } catch (error) {
        return ({
            status: 500,
            message: "Terjadi kesalahan : " + error.message
        });
    }
}

module.exports = {
    cari_sep,
    cari_sep_no_rujukan,
    insert_sep,
    delete_sep
}
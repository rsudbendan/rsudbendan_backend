// core

// 3rd
const axios = require("axios");

// local
require('dotenv').config();

const by_nik = async (token, nik) => {
    try {
        let url = process.env.SATU_SEHAT_BASE_URL + `/Patient?identifier=https://fhir.kemkes.go.id/id/nik|${nik}`;

        let response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
            },
        });

        let pesan = "Sukses";
        let status = response.status;
        if (response.data.total === 0){
            status = 206;
            pesan = "Data tidak ditemukan";
        }

        return {
            status: status,
            message: pesan,
            data: response.data
        };
    } catch (error) {
        let pesan = "";
        if (error.response.status.toString().substring(0,1) === "4"){
            pesan = "Error dari klien2 : ";
        }
        else if (error.response.status.toString().substring(0,1) === "5"){
            pesan = "Error dari Satu Sehat : ";
        }

        return {
            status: error.response.status,
            message: pesan + error.message
        };
    }
}

module.exports = {
    by_nik
};
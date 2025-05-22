// core

// 3rd
const axios = require("axios");

// local
require('dotenv').config();

const buat = async (token, body) => {
    try {
        let url = `${process.env.SATU_SEHAT_BASE_URL}/Encounter`;        

        let response = await axios.post(url, body, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });

        let pesan = "Sukses";
        let status = response.status;

        return {
            status: status,
            message: pesan,
            data: response.data
        };
    } catch (error) {
        let pesan = "";
        if (error.response.status.toString().substring(0,1) === "4"){
            pesan = "Error dari klien : ";
        }
        else if (error.response.status.toString().substring(0,1) === "5"){
            pesan = "Error dari Satu Sehat : ";
        }

        return {
            status: error.response.status,
            message: pesan + error.response.data.issue[0].details.text,
            data: error.response.data
        }
    }
}

module.exports = {
    buat
};
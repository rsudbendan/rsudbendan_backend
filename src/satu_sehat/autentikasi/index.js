// core

// 3rd
const axios = require("axios");

// local
require('dotenv').config();

const generate_token = async () => {
    try {
        let url = process.env.SATU_SEHAT_AUTH_URL + '/accesstoken?grant_type=client_credentials';
        let params = new URLSearchParams();
        params.append('client_id', process.env.SATU_SEHAT_CLIENT_ID);
        params.append('client_secret', process.env.SATU_SEHAT_CLIENT_SECRET);

        let response = await axios.post(url, params.toString(), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        return {
            status: 200,
            message: "Sukses",
            data: response.data
        };
    } catch (error) {
        let pesan = "";
        if (error.response.status.toString().substring(0,1) === "4"){
            pesan = "Error dari klien1 : ";
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
    generate_token
};
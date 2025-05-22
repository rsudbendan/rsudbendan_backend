// core

// 3rd
const axios = require("axios");

// local
require('dotenv').config();

const convertToISO = (tanggal) => {
    tanggal = tanggal.replace(" ", "T");
    let date = new Date(tanggal);    
    let offset = "+07:00";
    
    let isoString = date.toISOString().split(".")[0] + offset;
    return isoString;
}

module.exports = {
    convertToISO
};
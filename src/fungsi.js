// core

// 3rd

// local

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
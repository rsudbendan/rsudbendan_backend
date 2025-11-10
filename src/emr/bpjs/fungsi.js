// core
const crypto = require('crypto');
const LZString = require('lz-string');

// 3rd
const axios = require('axios');

// local
require('dotenv').config();

const fungsi_buat_timestamp = () => {
    try {
        let timestamp = Math.floor(Date.now() / 1000).toString();

        return ({
            status: 200,
            message: "Sukses",
            data: {
                timestamp: timestamp
            }
        });
    } catch (error) {
        return ({
            status: 400,
            message: "Terjadi kesalahan dalam pembuatan timestamp"
        });
    }
}

function fungsi_buat_signature(timestamp) {
    try {
        let consumer_id = process.env.BPJS_CONSUMER_ID;
        let secret_key = process.env.BPJS_SECRET_KEY;
        let data = `${consumer_id}&${timestamp}`;
        let hmac = crypto.createHmac('sha256', secret_key).update(data).digest();
        let signature = Buffer.from(hmac).toString('base64');

        return ({
            status: 200,
            message: "Sukses",
            data: {
                signature: signature
            }
        });
    } catch (error) {
        return ({
            status: 400,
            message: "Terjadi kesalahan dalam pembuatan signature"
        });
    }
}

function fungsi_dekripsi(key, string) {
    try {
        let encryptMethod = 'aes-256-cbc';
        let keyHash = crypto.createHash('sha256').update(key).digest();
        let iv = keyHash.slice(0, 16);

        let encryptedBuffer = Buffer.from(string, 'base64');
        let decipher = crypto.createDecipheriv(encryptMethod, keyHash, iv);
        let decrypted = decipher.update(encryptedBuffer);
        decrypted = Buffer.concat([decrypted, decipher.final()]);

        let decompressed = LZString.decompressFromEncodedURIComponent(decrypted.toString());
        return ({
            status: 200,
            message: "Sukses",
            data: {
                dekripsi: decompressed
            }
        });
    } catch (error) {
        return ({
            status: 400,
            message: "Terjadi kesalahan dalam pembuatan signature"
        });
    }
}

const fungsi_permintaan_vclaim = async (url, metode, data) => {
    try {
        let fullUrl = process.env.BPJS_VCLAIM_BASE_URL + url;

        let timestamp = "";
        let hasil_buat_timestamp = await fungsi_buat_timestamp();
        if (hasil_buat_timestamp.status === 200) {
            timestamp = hasil_buat_timestamp.data.timestamp;
        }
        else {
            return ({
                status: hasil_buat_timestamp.status,
                message: hasil_buat_timestamp.message
            });
        }

        let signature = "";
        let hasil_buat_signature = await fungsi_buat_signature(timestamp);
        if (hasil_buat_signature.status === 200) {
            signature = hasil_buat_signature.data.signature;
        }
        else {
            return ({
                status: hasil_buat_signature.status,
                message: hasil_buat_signature.message
            });
        }

        let contentType = 'application/json';
        if (['POST', 'PUT', 'DELETE'].includes(metode)) {
            contentType = 'application/x-www-form-urlencoded';
        }

        const headers = {
            'X-cons-id': process.env.BPJS_CONSUMER_ID,
            'X-Timestamp': timestamp,
            'X-Signature': signature,
            'X-Authorization': '',
            'accept': 'application/json',
            'Content-Type': contentType,
            'user_key': process.env.BPJS_USER_KEY
        };

        const config = {
            method: metode.toLowerCase(),
            url: fullUrl,
            headers,
            data,
            httpsAgent: new (require('https').Agent)({ rejectUnauthorized: false }),
        };

        const response = await axios(config);
        const hasil = response.data;

        if (hasil.metaData?.code === '200') {
            const encrypted = hasil.response;
            const key = process.env.BPJS_CONSUMER_ID + process.env.BPJS_SECRET_KEY + timestamp;
            const decrypted = fungsi_dekripsi(key, encrypted);
            hasil.response = JSON.parse(decrypted.data.dekripsi);

            return ({
                status: 200,
                message: "Sukses",
                data: hasil
            });
        }
        else {
            return ({
                status: 400,
                message: hasil
            });
        }
    } catch (error) {
        return ({
            status: 400,
            message: "Terjadi kesalahan pada koneksi ke BPJS"
        });
    }
}

module.exports = {
    fungsi_buat_timestamp,
    fungsi_buat_signature,
    fungsi_dekripsi,
    fungsi_permintaan_vclaim
};
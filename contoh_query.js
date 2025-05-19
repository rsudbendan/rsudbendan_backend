const mysql = require('mysql2/promise');

// Konfigurasi koneksi database
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'nama_database',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

async function selectThenInsert() {
    let connection;
    
    try {
        connection = await pool.getConnection();

        // Menjalankan SELECT dari tabel
        const [rows] = await connection.query(`
            SELECT column1, column2 FROM example_table WHERE column1 = ?
        `, ['some_value']);

        console.log("Hasil SELECT:", rows);

        if (rows.length > 0) {
            // Menjalankan INSERT jika data ditemukan
            await connection.query(`
                INSERT INTO another_table (columnA, columnB) VALUES (?, ?)
            `, [rows[0].column1, rows[0].column2]);

            console.log("INSERT berhasil!");
        } else {
            console.log("Data tidak ditemukan, INSERT tidak dilakukan.");
        }

    } catch (error) {
        console.error("Terjadi kesalahan:", error.message);
    } finally {
        if (connection) connection.release(); // Pastikan koneksi dilepaskan
    }
}

// Contoh pemanggilan fungsi
selectThenInsert();
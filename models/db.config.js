const mysql = require('mysql2');

// Konfigurasi koneksi database tanpa database
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '', // sesuaikan password MySQL kamu
};

// Buat koneksi untuk membuat database jika belum ada
const tempDb = mysql.createConnection(dbConfig);

tempDb.connect(err => {
    if (err) {
        console.error('Koneksi database gagal:', err);
        return;
    }

    // Buat database jika belum ada
    tempDb.query('CREATE DATABASE IF NOT EXISTS dbprakatikum8', (err, result) => {
        if (err) {
            console.error('Gagal membuat database:', err);
            tempDb.end();
            return;
        }
        console.log('Database dbprakatikum8 siap digunakan');

        // Tutup koneksi sementara
        tempDb.end();

        // Buat koneksi ke database yang sudah ada
        const db = mysql.createConnection({
            ...dbConfig,
    database: 'dbpraktikum8'
        });

        db.connect(err => {
            if (err) {
                console.error('Koneksi ke database gagal:', err);
            } else {
                console.log('Terhubung ke database MySQL');
            }
        });

        module.exports = db;
    });
});

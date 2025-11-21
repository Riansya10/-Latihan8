const mysql = require('mysql2');

// Konfigurasi koneksi tanpa database
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '', // sesuaikan jika ada password
};

// Buat koneksi
const connection = mysql.createConnection(dbConfig);

connection.connect(err => {
    if (err) {
        console.error('Koneksi gagal:', err);
        return;
    }
    console.log('Terhubung ke MySQL');

    // Buat database
    connection.query('CREATE DATABASE IF NOT EXISTS dbpraktikum8', (err, result) => {
        if (err) {
            console.error('Gagal membuat database:', err);
            connection.end();
            return;
        }
        console.log('Database dbpraktikum8 dibuat');

        // Gunakan database
        connection.query('USE dbpraktikum8', (err) => {
            if (err) {
                console.error('Gagal menggunakan database:', err);
                connection.end();
                return;
            }

            // Buat tabel users
            const createTableQuery = `
                CREATE TABLE IF NOT EXISTS users (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(100) NOT NULL,
                    email VARCHAR(100) NOT NULL UNIQUE,
                    password VARCHAR(255) DEFAULT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
                )
            `;

            connection.query(createTableQuery, (err, result) => {
                if (err) {
                    console.error('Gagal membuat tabel:', err);
                } else {
                    console.log('Tabel users dibuat');
                }
                connection.end();
            });
        });
    });
});

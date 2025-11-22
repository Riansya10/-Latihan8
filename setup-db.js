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
            const createUsersTableQuery = `
                CREATE TABLE IF NOT EXISTS users (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(100) NOT NULL,
                    email VARCHAR(100) NOT NULL UNIQUE,
                    password VARCHAR(255) DEFAULT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
                )
            `;

            connection.query(createUsersTableQuery, (err, result) => {
                if (err) {
                    console.error('Gagal membuat tabel users:', err);
                } else {
                    console.log('Tabel users dibuat');
                }

                // Buat tabel products
                const createProductsTableQuery = `
                    CREATE TABLE IF NOT EXISTS products (
                        id INT AUTO_INCREMENT PRIMARY KEY,
                        nama VARCHAR(100) NOT NULL,
                        deskripsi TEXT,
                        harga DECIMAL(10,2) NOT NULL,
                        foto VARCHAR(255),
                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
                    )
                `;

                connection.query(createProductsTableQuery, (err, result) => {
                    if (err) {
                        console.error('Gagal membuat tabel products:', err);
                    } else {
                        console.log('Tabel products dibuat');

                        // Insert sample data
                        const insertProductsQuery = `
                            INSERT INTO products (nama, deskripsi, harga, foto) VALUES
                            ('Indomie Goreng', 'Mie instan goreng', 2500, 'images/miegoreng.jpg'),
                            ('Aqua', 'Air mineral', 3000, 'images/aqua.jpg'),
                            ('Lifebuoy', 'Sabun mandi', 5000, 'images/lifebuoy.jpg'),
                            ('Teh Botol Sosro', 'Minuman teh', 4000, 'images/tehbotol.jpg'),
                            ('Kopi Kapal Api', 'Kopi bubuk', 15000, 'images/kapalapi.jpg'),
                            ('Mie Sedap', 'Mie instan', 2500, 'images/miesedap.jpg'),
                            ('Coca Cola', 'Minuman soda', 5000, 'images/cocacola.jpg'),
                            ('Rinso', 'Deterjen', 10000, 'images/rinso.jpg'),
                            ('Pepsodent', 'Pasta gigi', 8000, 'images/pepsodent.jpg'),
                            ('Sunsilk', 'Shampoo', 12000, 'images/sunsilk.jpg')
                        `;

                        connection.query(insertProductsQuery, (err, result) => {
                            if (err) {
                                console.error('Gagal memasukkan data sample:', err);
                            } else {
                                console.log('Data sample dimasukkan');
                            }
                            connection.end();
                        });
                    }
                });
            });
        });
    });
});

const db = require('../config/database');

class Product {
    static getAll(callback) {
        db.query('SELECT * FROM products', callback);
    }

    static getById(id, callback) {
        db.query('SELECT * FROM products WHERE id = ?', [id], callback);
    }

    static create(data, callback) {
        db.query('INSERT INTO products (nama, deskripsi, harga, foto) VALUES (?, ?, ?, ?)', [data.nama, data.deskripsi, data.harga, data.foto], (err, result) => {
            if (err) return callback(err);
            callback(null, { id: result.insertId, ...data });
        });
    }

    static update(id, data, callback) {
        db.query('UPDATE products SET nama = ?, deskripsi = ?, harga = ?, foto = ? WHERE id = ?', [data.nama, data.deskripsi, data.harga, data.foto, id], (err, result) => {
            if (err) return callback(err);
            if (result.affectedRows === 0) return callback(new Error('Product not found'));
            callback(null, { id, ...data });
        });
    }

    static delete(id, callback) {
        db.query('DELETE FROM products WHERE id = ?', [id], (err, result) => {
            if (err) return callback(err);
            if (result.affectedRows === 0) return callback(new Error('Product not found'));
            callback(null, true);
        });
    }
}

module.exports = Product;

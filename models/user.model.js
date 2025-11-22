const db = require('../config/database');
const bcrypt = require('bcryptjs');

class User {
    static getAll(callback) {
        db.query('SELECT id, name, email, created_at, updated_at FROM users', callback);
    }

    static getById(id, callback) {
        db.query('SELECT id, name, email, created_at, updated_at FROM users WHERE id = ?', [id], callback);
    }

    static create(data, callback) {
        const { name, email, password } = data;
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) return callback(err);
            db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword], (err, result) => {
                if (err) return callback(err);
                callback(null, { id: result.insertId, name, email });
            });
        });
    }

    static update(id, data, callback) {
        const { name, email, password } = data;
        if (password) {
            bcrypt.hash(password, 10, (err, hashedPassword) => {
                if (err) return callback(err);
                db.query('UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?', [name, email, hashedPassword, id], (err, result) => {
                    if (err) return callback(err);
                    if (result.affectedRows === 0) return callback(new Error('User not found'));
                    callback(null, { id, name, email });
                });
            });
        } else {
            db.query('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, id], (err, result) => {
                if (err) return callback(err);
                if (result.affectedRows === 0) return callback(new Error('User not found'));
                callback(null, { id, name, email });
            });
        }
    }

    static delete(id, callback) {
        db.query('DELETE FROM users WHERE id = ?', [id], (err, result) => {
            if (err) return callback(err);
            if (result.affectedRows === 0) return callback(new Error('User not found'));
            callback(null, true);
        });
    }

    static findByEmail(email, callback) {
        db.query('SELECT * FROM users WHERE email = ?', [email], callback);
    }
}

module.exports = User;

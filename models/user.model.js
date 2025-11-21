const db = require('../config/database');

class User {
    static getAll(callback) {
        db.query('SELECT * FROM users', callback);
    }

    static getById(id, callback) {
        db.query('SELECT * FROM users WHERE id = ?', [id], callback);
    }

    static create(data, callback) {
        db.query('INSERT INTO users (name, email) VALUES (?, ?)', [data.name, data.email], (err, result) => {
            if (err) return callback(err);
            callback(null, { id: result.insertId, ...data });
        });
    }

    static update(id, data, callback) {
        db.query('UPDATE users SET name = ?, email = ? WHERE id = ?', [data.name, data.email, id], (err, result) => {
            if (err) return callback(err);
            if (result.affectedRows === 0) return callback(new Error('User not found'));
            callback(null, { id, ...data });
        });
    }

    static delete(id, callback) {
        db.query('DELETE FROM users WHERE id = ?', [id], (err, result) => {
            if (err) return callback(err);
            if (result.affectedRows === 0) return callback(new Error('User not found'));
            callback(null, true);
        });
    }
}

module.exports = User;

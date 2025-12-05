const db = require('../config/database');
const bcrypt = require('bcryptjs');

class User {
    // Get All Users
    static getAll(callback) {
        db.query(
            'SELECT id, name, email, created_at, updated_at FROM users',
            callback
        );
    }

    // Get User by ID
    static getById(id, callback) {
        db.query(
            'SELECT id, name, email, created_at, updated_at FROM users WHERE id = ?',
            [id],
            callback
        );
    }

    // Create User (Hash Password)
    static create(data, callback) {
        const { name, email, password } = data;

        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) return callback(err);

            db.query(
                'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
                [name, email, hashedPassword],
                (err, result) => {
                    if (err) return callback(err);

                    callback(null, {
                        id: result.insertId,
                        name,
                        email
                    });
                }
            );
        });
    }

    // Update User
    static update(id, data, callback) {
        const { name, email, password } = data;

        if (password) {
            bcrypt.hash(password, 10, (err, hashedPassword) => {
                if (err) return callback(err);

                db.query(
                    'UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?',
                    [name, email, hashedPassword, id],
                    (err, result) => {
                        if (err) return callback(err);
                        if (result.affectedRows === 0) return callback(new Error('User not found'));

                        callback(null, { id, name, email });
                    }
                );
            });

        } else {
            db.query(
                'UPDATE users SET name = ?, email = ? WHERE id = ?',
                [name, email, id],
                (err, result) => {
                    if (err) return callback(err);
                    if (result.affectedRows === 0) return callback(new Error('User not found'));

                    callback(null, { id, name, email });
                }
            );
        }
    }

    // Delete User
    static delete(id, callback) {
        db.query(
            'DELETE FROM users WHERE id = ?',
            [id],
            (err, result) => {
                if (err) return callback(err);
                if (result.affectedRows === 0)
                    return callback(new Error('User not found'));

                callback(null, true);
            }
        );
    }

    // Find By Email (For Login)
    static findByEmail(email, callback) {
        db.query(
            'SELECT * FROM users WHERE email = ?',
            [email],
            callback
        );
    }
}

module.exports = User;

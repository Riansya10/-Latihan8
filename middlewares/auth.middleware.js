const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const authBearer = (req, res, next) => {
    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const token = header.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Optional: cek user masih ada
        User.getById(decoded.id, (err, results) => {
            if (err) return res.status(500).json({ message: err.message });
            if (results.length === 0) {
                return res.status(401).json({ message: "Invalid token user" });
            }

            req.user = results[0];
            next();
        });

    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = { authBearer };

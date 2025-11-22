const jwt = require('jsonwebtoken');
const secretKey = '12345TOKENRAHASIA'; // Ganti dengan secret key yang aman

const authBearer = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token tidak ditemukan atau tidak valid' });
  }

  const token = authHeader.substring(7); // Menghilangkan 'Bearer ' dari header

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded; // Menyimpan data user yang ter-decode ke req.user
    next(); // Lanjut ke middleware berikutnya atau handler route
  } catch (error) {
    return res.status(401).json({ message: 'Token tidak valid' });
  }
};

module.exports = { authBearer };

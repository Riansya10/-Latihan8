const bcrypt = require('bcryptjs');

const hash = bcrypt.hashSync('passwordkamu', 10);

console.log(hash);

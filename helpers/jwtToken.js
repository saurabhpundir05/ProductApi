const jwt = require('jsonwebtoken');
require('dotenv').config();

// generate jwt token
module.exports = function generateToken(id, name) {
  const token = jwt.sign(
    { id: id, name: name },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
  return token;
};
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET; 

function generateAuthToken(user) {
  const payload = {
    userId: user._id,
    role: user.role,
    name: user.name
  };
  return jwt.sign(payload, secretKey, { expiresIn: '1h' }); 
}

module.exports = { generateAuthToken };

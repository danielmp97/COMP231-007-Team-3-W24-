// authMiddleware.js

const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  // Get the JWT token from the request headers
  const token = req.headers.authorization;

  // Check if token exists
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized - Token missing' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user information to the request object
    req.user = decoded.user;

    // Proceed with the request
    next();
  } catch (error) {
    // Token verification failed
    return res.status(401).json({ message: 'Unauthorized - Invalid token' });
  }
}

module.exports = authMiddleware;

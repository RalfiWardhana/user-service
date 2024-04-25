const { expressjwt: expressJwt } = require('express-jwt');
const jwt = require('jsonwebtoken');

// Define the secret key used to sign the JWT token
const secretKey = 'secret_key';

exports.authMiddleware = (req, res, next) => {
  expressJwt({
    secret: secretKey,
    algorithms: ['HS256'],
    requestProperty: 'user',
  })(req, res, (err) => {
    if (err) {
      if (err.name === 'UnauthorizedError') {
        return res.status(401).json({ message: 'Unauthorized', status: 401 });
      }
      return res.status(500).json({ message: err.message, status: 500 });
    }
    next();
  });
};


// Define a middleware function to check if the user has the required role
exports.authorize = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ message: 'Forbidden', status: 403 });
  }
  next();
};
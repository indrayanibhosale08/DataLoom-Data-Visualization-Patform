// server/middleware/adminMiddleware.js

const adminMiddleware = (req, res, next) => {
  // We assume authMiddleware has already run and attached the user object
  if (req.user && req.user.role === 'admin') {
    next(); // User is an admin, proceed to the next middleware/controller
  } else {
    res.status(403).json({ msg: 'Access denied. Admins only.' });
  }
};

module.exports = adminMiddleware;
// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { registerUser, loginUser } = require('../controllers/authController');

// ⭐ Add validation middleware to the register route
router.post(
  '/register',
  [
    body('name', 'Name is required').not().isEmpty(),
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
  ],
  registerUser
);

// This defines a POST endpoint at '/register'
router.post('/register', registerUser); 

// This defines a POST endpoint at '/login'
router.post('/login', loginUser);


router.post('/login', loginUser);

module.exports = router;
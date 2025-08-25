// server/routes/adminRoutes.js
const express = require('express');
const router = express.Router();

const auth = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware'); // Our new admin middleware

const { getStats, getAllUsers, deleteUser, changeUserRole } = require('../controllers/adminController');

// The middleware array [auth, admin] ensures a user is first authenticated, then checked for admin role.
// @route    GET api/admin/stats
// @desc     Get usage statistics
// @access   Private, Admin
router.get('/stats', [auth, admin], getStats);

// @route    GET api/admin/users
// @desc     Get all users
// @access   Private, Admin
router.get('/users', [auth, admin], getAllUsers);

router.delete('/users/:id', [auth, admin], deleteUser);

router.put('/users/:id/role', [auth, admin], changeUserRole);

module.exports = router;

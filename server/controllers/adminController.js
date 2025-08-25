// server/controllers/adminController.js
const User = require('../models/User');
const AnalysisHistory = require('../models/AnalysisHistory');

// @desc    Get usage statistics
// @route   GET /api/admin/stats
// @access  Private, Admin
const getStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalUploads = await AnalysisHistory.countDocuments();
    // You could add more stats here, like total file size, etc.

    res.json({
      totalUsers,
      totalUploads,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private, Admin
const getAllUsers = async (req, res) => {
    try {
        // Find all users but exclude their passwords from the result
        const users = await User.find().select('-password');
        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Prevent admin from deleting themselves
        if (req.user.id === userId) {
            return res.status(400).json({ msg: 'You cannot delete your own admin account.' });
        }

        // Delete the user's analysis history first
        await AnalysisHistory.deleteMany({ user: userId });
        
        // Then, delete the user
        await User.findByIdAndDelete(userId);

        res.json({ msg: 'User and their history have been deleted.' });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

const changeUserRole = async (req, res) => {
    try {
        const { role } = req.body;
        if (!['user', 'admin'].includes(role)) {
            return res.status(400).json({ msg: 'Invalid role specified.' });
        }

        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        user.role = role;
        await user.save();

        res.json({ msg: 'User role updated successfully.', user });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};


module.exports = {
  getStats,
  getAllUsers,
  deleteUser,
  changeUserRole,
};
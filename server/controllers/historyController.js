// server/controllers/historyController.js
const AnalysisHistory = require('../models/AnalysisHistory');

// @desc    Get analysis history for logged in user
// @route   GET /api/history
// @access  Private
const getHistory = async (req, res) => {
  try {
    const history = await AnalysisHistory.find({ user: req.user.id }).sort({ analysisDate: -1 });
    res.json(history);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
const getHistoryStats = async (req, res) => {
    try {
      // Count how many documents in the history belong to this user
      const uploadCount = await AnalysisHistory.countDocuments({ user: req.user.id });
      
      // We can add more stats here in the future
      // For now, we only have the upload count
      const userStats = {
          totalFiles: uploadCount,
          chartsCreated: 0, // Placeholder
          exports: 0,       // Placeholder
      };

      res.json(userStats);

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
};

const getRecentHistory = async (req, res) => {
    try {
      const recentHistory = await AnalysisHistory.find({ user: req.user.id })
        .sort({ analysisDate: -1 }) // Sort by date in descending order (newest first)
        .limit(5);                  // Limit the results to the top 5
      
      res.json(recentHistory);

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
};

const incrementChartsCreated = async (req, res) => {
    try {
        const historyId = req.params.id;
        // Use findOneAndUpdate with the $inc operator to atomically increment the field
        const updatedHistory = await AnalysisHistory.findOneAndUpdate(
            { _id: historyId, user: req.user.id }, // Ensure the item belongs to the logged-in user
            { $inc: { chartsCreated: 1 } },
            { new: true } // Return the updated document
        );

        if (!updatedHistory) {
            return res.status(404).json({ msg: 'History record not found or user not authorized.' });
        }

        res.json(updatedHistory);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};



module.exports = {
  getHistory,
  getHistoryStats,
  getRecentHistory, // <-- Export the new function
  incrementChartsCreated
};
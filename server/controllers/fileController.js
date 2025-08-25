// server/controllers/fileController.js
const xlsx = require('xlsx');
const AnalysisHistory = require('../models/AnalysisHistory'); // <-- Import the new model

const uploadFile = async (req, res) => { // <-- Make the function async
  try {
    if (!req.file) {
      return res.status(400).json({ msg: 'No file uploaded' });
    }

    const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(worksheet);

    // --- SAVE HISTORY ---
    // Create a new history record
    const historyRecord = new AnalysisHistory({
      user: req.user.id, // We get this from the authMiddleware
      fileName: req.file.originalname,
      fileSize: req.file.size,
      rowCount: data.length,
      columns: Object.keys(data[0] || {}), // Get column headers
    });

    // Save the record to the database
    await historyRecord.save();
    // --------------------
    
    res.status(200).json({
      jsonData: data,
      historyId: historyRecord._id,
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

module.exports = {
  uploadFile,
};
// server/controllers/fileController.js
const xlsx = require('xlsx');
const AnalysisHistory = require('../models/AnalysisHistory');

const uploadFile = async (req, res) => {
  console.log('--- UPLOAD FILE REQUEST RECEIVED ---'); // Log #1
  
  try {
    if (!req.file) {
      console.log('LOG: req.file is MISSING. Multer might have failed.'); // Log #2
      return res.status(400).json({ msg: 'No file uploaded' });
    }

    console.log('LOG: req.file EXISTS. Originalname:', req.file.originalname); // Log #3

    const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(worksheet);

    console.log('LOG: File parsed successfully. Row count:', data.length); // Log #4

    const historyRecord = new AnalysisHistory({
      user: req.user.id,
      fileName: req.file.originalname,
      fileSize: req.file.size,
      rowCount: data.length,
      columns: Object.keys(data[0] || {}),
    });

    await historyRecord.save();
    console.log('LOG: History record saved to DB.'); // Log #5
    
    res.status(200).json({
      jsonData: data,
      historyId: historyRecord._id,
    });
    console.log('LOG: JSON response sent successfully.'); // Log #6

  } catch (err) {
    console.error('--- ERROR IN FILE CONTROLLER ---:', err); // Log #7
    res.status(500).send('Server error');
  }
};

module.exports = {
  uploadFile,
};
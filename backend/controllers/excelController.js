// backend/controllers/excelController.js
const xlsx = require('xlsx');

// @desc    Upload and parse an excel file
// @route   POST /api/excel/upload
const uploadAndParse = (req, res, next) => {
  // The multer fileFilter already validates the file type
  if (!req.file) {
    res.status(400);
    return next(new Error('No file uploaded.'));
  }

  try {
    const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    
    // Convert sheet to JSON, getting headers as well
    const data = xlsx.utils.sheet_to_json(worksheet, { defval: "" }); // Use defval to handle empty cells
    const headers = xlsx.utils.sheet_to_json(worksheet, { header: 1 })[0];

    if (!data || data.length === 0) {
      res.status(400);
      return next(new Error('The Excel file is empty or could not be read.'));
    }

    // Now we send back both the data and the column headers
    res.status(200).json({ headers, data });

  } catch (error) {
    // Pass any parsing errors to the centralized handler
    return next(error);
  }
};

module.exports = {
  uploadAndParse,
};
// backend/routes/excel.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadAndParse } = require('../controllers/excelController');
const { protect } = require('../middleware/authMiddleware'); // ⭐ Import middleware

// Set up multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    // ⭐ Add file type validation
    if (file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || file.mimetype === 'application/vnd.ms-excel') {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type, only Excel files are allowed!'), false);
    }
  },
});

// ⭐ Apply the 'protect' middleware to this route
router.post('/upload', protect, upload.single('excelFile'), uploadAndParse);

module.exports = router;
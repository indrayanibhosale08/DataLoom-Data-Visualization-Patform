// server/routes/fileRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const auth = require('../middleware/authMiddleware'); // Our auth middleware
const { uploadFile } = require('../controllers/fileController');

// Configure Multer for in-memory storage
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    // Accept .xls and .xlsx files
    if (file.mimetype === 'application/vnd.ms-excel' || file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      cb(null, true);
    } else {
      cb(new Error('Only .xls and .xlsx files are allowed!'), false);
    }
  },
});

// @route    POST api/files/upload
// @desc     Upload, parse, and return Excel data
// @access   Private
router.post('/upload', [auth, upload.single('file')], uploadFile);
// Note the middleware array:
// 1. `auth` runs first to check the JWT.
// 2. `upload.single('file')` runs next to process the file attached to the 'file' field of the form data.

module.exports = router;
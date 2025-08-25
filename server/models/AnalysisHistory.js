// server/models/AnalysisHistory.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AnalysisHistorySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  fileName: {
    type: String,
    required: true,
  },
  fileSize: {
    type: Number, // Storing size in bytes
    required: true,
  },
  rowCount: {
    type: Number,
    required: true,
  },
  columns: {
    type: [String], // An array of strings
    required: true,
  },
  analysisDate: {
    type: Date,
    default: Date.now,
  },
  chartsCreated: {
    type: Number,
    default: 0, // Default to 0 when a file is first uploaded
  },
});

module.exports = mongoose.model('AnalysisHistory', AnalysisHistorySchema);
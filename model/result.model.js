const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  course: { type: String, required: true },
  subTopic: { type: String, required: true },
  score: { type: Number, required: true },
  totalQuestions: { type: Number, required: true },
  level: { type: String, required: true },  // Ensure 'level' is required
  certificate: { type: Boolean, default: false }, // New field to track certificate status
  certificateId: { type: String, unique: true, required: true }, // New field for certificate ID
  // certificateUrl: { type: String, required: true }, // New field for certificate URL
}, {
  timestamps: true // Automatically adds createdAt and updatedAt
});

const Result = mongoose.model('Result', resultSchema);

module.exports = { Result };
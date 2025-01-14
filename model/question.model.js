const mongoose = require('mongoose');

// Define the schema for a question
const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: String, required: true },
}, {
  timestamps: true,
});

// Define the schema for sub-topics
const subTopicSchema = new mongoose.Schema({
  name: { type: String, required: true },
  levels: {
    easy: [questionSchema],        
    intermediate: [questionSchema], 
    advanced: [questionSchema],   
  },
});

// Define the schema for courses
const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  subTopics: [subTopicSchema],  // Array of sub-topics under the course
});

const Course = mongoose.model('Course', courseSchema);

module.exports = { Course };
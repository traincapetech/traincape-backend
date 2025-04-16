
import mongoose from "mongoose";
// Question Content Schema (the actual question content)
const QuestionContentSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  options: [String], // Array of options
  correctAnswer: { type: String, required: true },
});

// Modified Level Schema (now an object with arrays for each difficulty)
const LevelSchema = new mongoose.Schema({
  easy: [QuestionContentSchema],
  intermediate: [QuestionContentSchema],
  advanced: [QuestionContentSchema]
});

// Subtopic Schema
const SubtopicSchema = new mongoose.Schema({
  name: { type: String, required: true },
  levels: LevelSchema, // Now a single object with three arrays instead of array of level objects

});

// Main Question Category Schema with complete hierarchy
const QuestionSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Main topic name
  subTopics: [SubtopicSchema], // Array of subtopics

});

const QuestionModel = mongoose.model('courses', QuestionSchema);
export { QuestionModel };
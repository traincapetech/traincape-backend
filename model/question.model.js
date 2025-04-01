import mongoose from "mongoose";

const questionSchema = mongoose.Schema({
  course: {
    type: String,
    required: true
  },
  subTopic: {
    type: String,
    required: true
  },
  level: {
    type: String,
    required: true
  },
  question: {
    type: String,
    required: true
  },
  options: {
    type: [String],
    required: true
  },
  correctAnswer: {
    type: String,
    required: true
  },
  explanation: {
    type: String,
    required: false
  }
}, {
  timestamps: true
});

const QuestionModel = mongoose.model("questions", questionSchema);

export { QuestionModel }; 
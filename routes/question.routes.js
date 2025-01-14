const express = require('express');
const { addQuestion, getQuestions, updateQuestion, deleteQuestion } = require('../controllers/question.controller');

const router = express.Router();

// Route to add a new question
router.post('/addQuestion', addQuestion);

// Route to get questions based on course, sub-topic, and level
router.get('/getQuestions', getQuestions);

// Route to update a question by ID
router.put('/updateQuestion/:questionId', updateQuestion);

// Route to delete a question by ID
router.delete('/deleteQuestion/:questionId', deleteQuestion);

module.exports = { questionRouter: router };
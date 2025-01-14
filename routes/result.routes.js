const express = require('express');
const { addResult, getResults, verifyCertificate } = require('../controllers/result.controller');

const router = express.Router();

// Route to add a new result
router.post('/addResult', addResult);

// Route to fetch results based on course, sub-topic, or email
router.get('/getResults', getResults);

router.get('/verifyCertificate', verifyCertificate);

module.exports = { resultRouter: router };
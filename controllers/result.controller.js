const { Result } = require('../model/result.model');
const { Course } = require('../model/question.model');
const { v4: uuidv4 } = require('uuid');

// Add a new result
const addResult = async (req, res) => {
  try {
    const { name, email, course, subTopic, score, totalQuestions, level } = req.body;

    // Validate the course and sub-topic
    const foundCourse = await Course.findOne({ name: course });
    if (!foundCourse) {
      return res.status(404).json({ error: 'Course not found'});
    }

    const foundSubTopic = foundCourse.subTopics.find(sub => sub.name === subTopic);
    if (!foundSubTopic) {
      return res.status(404).json({ error: 'Sub-topic not found' });
    }

    // Validate the level
    const validLevels = ['easy', 'intermediate', 'advanced']; // You can adjust the levels as needed
    if (!validLevels.includes(level)) {
      return res.status(400).json({ error: 'Invalid level provided' });
    }

    // Determine if the user should receive a certificate (assuming 70% score required)
    const passingScore = 0.8 * totalQuestions; // 80% of the total questions
    const certificate = score >= passingScore;

    const certificateId = uuidv4(); 

    // const certificateUrl = `http://localhost:8080/results/verifyCertificate?certificateId=${certificateId}`;

    // Create and save the result (with level and certificate status)
    const newResult = new Result({
      name,
      email,
      course,
      subTopic,
      score,
      totalQuestions,
      level,
      certificate,  // Store certificate status
      certificateId,  // Store certificateId
      // certificateUrl, // Store certificateUrl
    });

    await newResult.save();

    // res.status(201).json({ message: 'Result saved successfully', result: newResult });

    res.status(201).json({
      message: 'Result saved successfully',
      result: newResult,
      // certificateUrl,
    });

  } catch (err) {
    console.error('Error adding result:', err);
    res.status(500).json({ error: 'Error saving result', message: err.message });
  }
};

// Fetch results based on course, sub-topic, email, or level
const getResults = async (req, res) => {
  try {
    const { course, subTopic, email, level } = req.query;

    // Build the query dynamically based on provided filters
    const query = {};
    if (course) query.course = course;
    if (subTopic) query.subTopic = subTopic;
    if (email) query.email = email;
    if (level) query.level = level; // Add filtering by level

    // Fetch the results
    const results = await Result.find(query).exec();

    if (results.length === 0) {
      return res.status(404).json({ error: 'No results found for the given filters' });
    }

    res.status(200).json(results);

  } catch (err) {
    console.error('Error fetching results:', err);
    res.status(500).json({ error: 'Error fetching results', message: err.message });
  }
};

const verifyCertificate = async (req, res) => {
  try {
    const { certificateId } = req.query;

    if (!certificateId) {
      return res.status(400).json({ error: 'Certificate ID is required' });
    }

    // Find the result by certificateId
    const result = await Result.findOne({ certificateId });

    if (!result) {
      return res.status(404).json({ error: 'Certificate not found' });
    }

    // Return the certificate data (name, course, score, etc.)
    res.status(200).json({
      message: 'Certificate verified successfully',
      certificate: result,
    });
  } catch (err) {
    console.error('Error verifying certificate:', err);
    res.status(500).json({ error: 'Error verifying certificate', message: err.message });
  }
};

module.exports = { addResult, getResults, verifyCertificate };
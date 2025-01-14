const mongoose = require('mongoose');
const { Course } = require('../model/question.model');

// Add a new question to the specified course, sub-topic, and level
const addQuestion = async (req, res) => {
  try {
    const { questionText, course, subTopic, level, options, correctAnswer } = req.body;

    let foundCourse = await Course.findOne({ name: course });

    if (!foundCourse) {
      foundCourse = new Course({ name: course, subTopics: [] });
    }

    let foundSubTopic = foundCourse.subTopics.find(sub => sub.name === subTopic);
    if (!foundSubTopic) {
      foundSubTopic = { name: subTopic, levels: { easy: [], intermediate: [], advanced: [] } };
      foundCourse.subTopics.push(foundSubTopic);
    }

    const newQuestion = {
      questionText,
      options,
      correctAnswer,
      _id: new mongoose.Types.ObjectId(),
    };

    if (['easy', 'intermediate', 'advanced'].includes(level)) {
      foundSubTopic.levels[level].push(newQuestion);
    } else {
      return res.status(400).json({ error: 'Invalid level. Valid levels are easy, intermediate, and advanced.' });
    }

    await foundCourse.save();
    res.status(201).json({ message: 'Question added successfully', newQuestion });
  } catch (err) {
    res.status(500).json({ error: 'Error saving question', message: err.message });
  }
};

// Fetch questions based on course, sub-topic, and level
const getQuestions = async (req, res) => {
  const { course, subTopic, level } = req.query;

  try {
    // Ensure that subTopic is URL-decoded (in case it was encoded in the URL)
    const decodedSubTopic = decodeURIComponent(subTopic);

    // Find the course by name (case-insensitive)
    const foundCourse = await Course.findOne({ name: new RegExp("^" + course + "$", "i") });

    if (!foundCourse) {
      return res.status(404).json({ error: 'Course not found' });
    }

    // Find the sub-topic under the course (case-sensitive matching)
    const foundSubTopic = foundCourse.subTopics.find(sub => sub.name === decodedSubTopic);

    if (!foundSubTopic) {
      return res.status(404).json({ error: 'Sub-topic not found' });
    }

    // Validate the level (easy, intermediate, or advanced)
    if (!['easy', 'intermediate', 'advanced'].includes(level)) {
      return res.status(400).json({ error: 'Invalid level. Valid levels are easy, intermediate, and advanced.' });
    }

    // Fetch the questions for the given level
    const filteredQuestions = foundSubTopic.levels[level];

    // Return the questions
    res.status(200).json(filteredQuestions);

  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ error: 'Error fetching questions', message: err.message });
  }
};

// Update an existing question by its ID
const updateQuestion = async (req, res) => {
  const { questionId } = req.params; // questionId from URL parameter
  const { questionText, options, correctAnswer } = req.body; // Data to update

  try {
    // Convert questionId to ObjectId
    const objectId = new mongoose.Types.ObjectId(questionId);
    
    // Find the course containing the question
    const course = await Course.findOne({
      "subTopics.levels.easy._id": objectId,
      // Or include checks for "intermediate" and "advanced" if necessary
    });

    if (!course) {
      return res.status(404).json({ error: 'Course not found for the given questionId' });
    }

    // Traverse the subTopics and levels to find the question
    let foundSubTopic = null;
    let foundLevel = null;
    let questionToUpdate = null;

    for (const sub of course.subTopics) {
      for (const level in sub.levels) {
        // Check if the question exists in this level (easy, intermediate, or advanced)
        questionToUpdate = sub.levels[level].find(q => q._id.toString() === questionId);

        if (questionToUpdate) {
          foundSubTopic = sub;
          foundLevel = level;
          break;
        }
      }
      if (questionToUpdate) break;
    }

    if (!questionToUpdate) {
      return res.status(404).json({ error: 'Question not found in any subTopic/level' });
    }

    // Update the fields if they exist in the request
    if (questionText) questionToUpdate.questionText = questionText;
    if (options) questionToUpdate.options = options;
    if (correctAnswer) questionToUpdate.correctAnswer = correctAnswer;

    // Save the updated course object
    await course.save();

    // Respond with the updated question
    res.status(200).json({ message: 'Question updated successfully', question: questionToUpdate });

  } catch (err) {
    console.error('Error updating question:', err);
    res.status(500).json({ error: 'Error updating question', message: err.message });
  }
};

const deleteQuestion = async (req, res) => {
  const { questionId } = req.params;

  try {
    // Convert the questionId to ObjectId for MongoDB queries (ensure 'new' is used)
    const objectId = new mongoose.Types.ObjectId(questionId); // <-- Fixed here

    // Find the course that contains the question by ID
    const course = await Course.findOne({
      $or: [
        { "subTopics.levels.easy._id": objectId },
        { "subTopics.levels.intermediate._id": objectId },
        { "subTopics.levels.advanced._id": objectId }
      ]
    });

    if (!course) {
      return res.status(404).json({ error: 'Question not found' });
    }

    // Now, remove the question from the correct level and sub-topic
    const result = await Course.updateOne(
      { _id: course._id }, // Match the course by its ID
      {
        $pull: {
          "subTopics.$[].levels.easy": { _id: objectId },
          "subTopics.$[].levels.intermediate": { _id: objectId },
          "subTopics.$[].levels.advanced": { _id: objectId }
        }
      }
    );

    // Log the result to ensure the question was removed
    console.log('Delete result:', result);

    // If no document was modified, it means the question might not have been found or deleted
    if (result.nModified === 0) {
      return res.status(404).json({ error: 'Question not found or already deleted' });
    }

    res.status(200).json({ message: 'Question deleted successfully' });
  } catch (err) {
    console.error('Error deleting question:', err);
    res.status(500).json({ error: 'Error deleting question', message: err.message });
  }
};


module.exports = { addQuestion, getQuestions, updateQuestion, deleteQuestion };
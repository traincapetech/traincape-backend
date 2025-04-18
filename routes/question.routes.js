import express from "express";
import { QuestionModel } from "../model/question.model.js";
import mongoose from "mongoose";
const questionRouter = express.Router();

questionRouter.get("/getQuestions", async (req, res) => {
  try {
    const { course, subTopic, level } = req.query;

    // Validate input
    if (!course || !subTopic) {
      return res.status(400).json({
        message: "course and subTopic are required query parameters.",
      });
    }

    // Step 1: Fetch questions by course name
    const questions = await QuestionModel.find({ name: course });

    // Step 2: Filter questions by subTopic name
    const matchingSubTopics = [];

    questions.forEach((question) => {
      const matched = question.subTopics
        .filter((sub) => sub.name === subTopic)
        .flatMap((sub) => sub.levels[level] || []);
      matchingSubTopics.push(...matched);
    });

    // Step 3: Send response
    res.status(200).json(matchingSubTopics);
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).send({ error: error.message });
  }
});

questionRouter.post("/addQuestion", async (req, res) => {
  try {
    const { questionText, course, subTopic, level, options, correctAnswer } =
      req.body;
    console.log("addQuestion body", req.body);
    let foundCourse = await QuestionModel.findOne({ name: course });
    if (!foundCourse) {
      foundCourse = new QuestionModel({ name: course, subTopics: [] });
    }
    let foundSubTopic = foundCourse.subTopics.find(
      (sub) => sub.name === subTopic
    );

    if (!foundSubTopic) {
      foundSubTopic = {
        name: subTopic,
        levels: { easy: [], intermediate: [], advanced: [] },
      };
      foundCourse.subTopics.push(foundSubTopic);
    }

    const newQuestion = {
      questionText,
      options,
      correctAnswer,
      _id: new mongoose.Types.ObjectId(),
    };

    if (["easy", "intermediate", "advanced"].includes(level)) {
      foundSubTopic.levels[level].push(newQuestion);
    } else {
      return res.status(400).json({
        error:
          "Invalid level. Valid levels are easy, intermediate, and advanced.",
      });
    }
    console.log("done");
    await foundCourse.save();
    res
      .status(201)
      .json({ message: "Question added successfully", newQuestion });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error saving question", message: err.message });
  }
});

questionRouter.delete("/deleteQuestion/:questionId", async (req, res) => {
  const { questionId } = req.params;
  try {
    // Convert the questionId to ObjectId for MongoDB queries (ensure 'new' is used)
    const objectId = new mongoose.Types.ObjectId(questionId); // <-- Fixed here

    // Find the course that contains the question by ID
    const course = await QuestionModel.findOne({
      $or: [
        { "subTopics.levels.easy._id": objectId },
        { "subTopics.levels.intermediate._id": objectId },
        { "subTopics.levels.advanced._id": objectId },
      ],
    });

    if (!course) {
      return res.status(404).json({ error: "Question not found" });
    }

    // Now, remove the question from the correct level and sub-topic
    const result = await QuestionModel.updateOne(
      { _id: course._id }, // Match the course by its ID
      {
        $pull: {
          "subTopics.$[].levels.easy": { _id: objectId },
          "subTopics.$[].levels.intermediate": { _id: objectId },
          "subTopics.$[].levels.advanced": { _id: objectId },
        },
      }
    );

    // Log the result to ensure the question was removed
    console.log("Delete result:", result);

    // If no document was modified, it means the question might not have been found or deleted
    if (result.nModified === 0) {
      return res
        .status(404)
        .json({ error: "Question not found or already deleted" });
    }

    res.status(200).json({ message: "Question deleted successfully" });
  } catch (err) {
    console.error("Error deleting question:", err);
    res
      .status(500)
      .json({ error: "Error deleting question", message: err.message });
  }
});

questionRouter.put("/updateQuestion/:questionId", async (req, res) => {
  const { questionId } = req.params; // questionId from URL parameter
  const { questionText, options, correctAnswer } = req.body; // Data to update from frontend

  try {
    // Find the course document containing the question with the given ID
    // Using $or to search across all difficulty levels
    const courseDoc = await QuestionModel.findOne({
      $or: [
        { "subTopics.levels.easy._id": questionId },
        { "subTopics.levels.intermediate._id": questionId },
        { "subTopics.levels.advanced._id": questionId },
      ],
    });

    if (!courseDoc) {
      return res.status(404).json({ error: "Question not found" });
    }

    // Find and update the specific question
    let updated = false;

    for (const subtopic of courseDoc.subTopics) {
      // Check each difficulty level
      for (const difficulty of ["easy", "intermediate", "advanced"]) {
        const questionIndex = subtopic.levels[difficulty].findIndex(
          (question) => question._id.toString() === questionId
        );

        if (questionIndex !== -1) {
          // Update the found question
          subtopic.levels[difficulty][questionIndex].questionText =
            questionText;
          subtopic.levels[difficulty][questionIndex].options = options;
          subtopic.levels[difficulty][questionIndex].correctAnswer =
            correctAnswer;
          updated = true;
          break;
        }
      }

      if (updated) break;
    }

    if (!updated) {
      return res.status(404).json({ error: "Question not found in any level" });
    }

    // Save the updated document
    await courseDoc.save();

    return res.status(200).json({
      success: true,
      message: "Question updated successfully",
    });
  } catch (err) {
    console.error("Error updating question:", err);
    res
      .status(500)
      .json({ error: "Error updating question", message: err.message });
  }
});

export { questionRouter };
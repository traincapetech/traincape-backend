import express from "express";
import { QuestionModel } from "../model/question.model.js";

const questionRouter = express.Router();

questionRouter.get("/getQuestions", async (req, res) => {
  try {
    const { course, subTopic, level } = req.query;

    console.log("Fetching questions with:");
    console.log("Course:", course);
    console.log("SubTopic:", subTopic);
    console.log("Level:", level);

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
      // const matched = question.subTopics.filter((sub) =>
      //     {
      //     if (sub.name === subTopic) {
      //       return true;
      //     }

      //   }

      // );
      //   matchingSubTopics.push(...matched); // Spread to flatten into a single array
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

questionRouter.post("/add", async (req, res) => {
  try {
    const question = new QuestionModel(req.body);
    await question.save();
    res.status(201).send({ msg: "Question added successfully", question });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

export { questionRouter };
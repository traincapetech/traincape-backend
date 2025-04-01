import express from "express";
import { QuestionModel } from "../model/question.model.js";

const questionRouter = express.Router();

questionRouter.get("/", async (req, res) => {
  try {
    const questions = await QuestionModel.find();
    res.status(200).send(questions);
  } catch (error) {
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
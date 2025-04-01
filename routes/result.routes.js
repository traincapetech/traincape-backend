import express from "express";
import { ResultModel } from "../model/result.model.js";

const resultRouter = express.Router();

resultRouter.get("/", async (req, res) => {
  try {
    const results = await ResultModel.find();
    res.status(200).send(results);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

resultRouter.post("/add", async (req, res) => {
  try {
    const result = new ResultModel(req.body);
    await result.save();
    res.status(201).send({ msg: "Result added successfully", result });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

export { resultRouter };
import express from "express";
import { ResultModel } from "../model/result.model.js";
import { v4 as uuidv4 } from "uuid";

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
    const {
      name,
      email,
      course,
      subTopic,
      score,
      totalQuestions,
      level,
      certificate: certificateFromClient
    } = req.body;

    // Compute certificate if not provided
    const certificateComputed = typeof certificateFromClient === 'boolean'
      ? certificateFromClient
      : (typeof score === 'number' && typeof totalQuestions === 'number')
        ? score >= 0.7 * totalQuestions
        : false;

    const resultDoc = new ResultModel({
      name,
      email,
      course,
      subTopic,
      score,
      totalQuestions,
      level,
      certificate: certificateComputed,
      certificateId: req.body.certificateId || uuidv4(),
    });

    await resultDoc.save();
    res.status(201).send({ msg: "Result added successfully", result: resultDoc });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// New endpoint expected by the frontend
resultRouter.post("/addResult", async (req, res) => {
  try {
    const {
      name,
      email,
      course,
      subTopic,
      score,
      totalQuestions,
      level
    } = req.body;

    if (!name || !email || !course || !subTopic ||
        typeof score !== 'number' || typeof totalQuestions !== 'number' || !level) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const passingScore = 0.7 * totalQuestions;
    const certificate = score >= passingScore;
    const certificateId = uuidv4();

    const newResult = new ResultModel({
      name,
      email,
      course,
      subTopic,
      score,
      totalQuestions,
      level,
      certificate,
      certificateId,
    });

    await newResult.save();

    res.status(201).json({
      message: 'Result saved successfully',
      result: newResult,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error saving result', message: error.message });
  }
});

// Certificate verification by certificateId
resultRouter.get('/verifyCertificate', async (req, res) => {
  try {
    const { certificateId } = req.query;
    if (!certificateId) {
      return res.status(400).json({ success: false, message: 'Certificate ID is required' });
    }

    const result = await ResultModel.findOne({ certificateId });
    if (!result) {
      return res.status(404).json({ success: false, message: 'Certificate not found' });
    }

    res.status(200).json({ success: true, result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export { resultRouter };
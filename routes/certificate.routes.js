import express from "express";
import { Certificate } from "../model/certificate.model.js";

const router = express.Router();

// Create certificate entry
router.post("/", async (req, res) => {
  try {
    const cert = new Certificate(req.body);
    await cert.save();
    res.status(201).json({ success: true, message: "Certificate added", data: cert });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Fetch certificate by ID
router.get("/:id", async (req, res) => {
  try {
    const cert = await Certificate.findOne({ certificateId: req.params.id });
    if (!cert) {
      return res.status(404).json({ success: false, message: "Certificate not found" });
    }
    res.json({ success: true, data: cert });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;

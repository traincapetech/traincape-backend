import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Consultant from "../model/consultant.model.js";
import ChatSession from "../model/chatSession.model.js";
import { verifyConsultant } from "../middleware/consultantAuth.middleware.js";

const router = express.Router();

// Register a new consultant
router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingConsultant = await Consultant.findOne({ email });
        if (existingConsultant) return res.status(400).json({ message: "Email already registered" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newConsultant = new Consultant({
            name,
            email,
            password: hashedPassword,
        });

        await newConsultant.save();

        // Auto-login after registration
        const token = jwt.sign({ _id: newConsultant._id, name: newConsultant.name }, process.env.SECRET_KEY, { expiresIn: "10h" });
        res.status(201).json({ token, name: newConsultant.name, message: "Registration successful" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const consultant = await Consultant.findOne({ email });

        if (!consultant) return res.status(400).json({ message: "Consultant not found" });

        const validPass = await bcrypt.compare(password, consultant.password);
        if (!validPass) return res.status(400).json({ message: "Invalid password" });

        const token = jwt.sign({ _id: consultant._id, name: consultant.name }, process.env.SECRET_KEY, { expiresIn: "10h" });
        res.header("auth-token", token).json({ token, name: consultant.name });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get Current Consultant Info
router.get("/me", verifyConsultant, async (req, res) => {
    try {
        const consultant = await Consultant.findById(req.consultant._id).select("-password");
        res.json(consultant);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get My Chat Sessions (history)
router.get("/my-sessions", verifyConsultant, async (req, res) => {
    try {
        const sessions = await ChatSession.find({
            consultantId: req.consultant._id
        }).sort({ createdAt: -1 });
        res.json({ success: true, sessions });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

export default router;

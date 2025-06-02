import express from "express";
import { Certificate } from "../model/certificate.model.js";

const router = express.Router();

// Helper function to convert DD/MM/YYYY to Date object
const convertDateString = (dateString) => {
  if (!dateString) return null;
  
  // Check if it's already a valid date object
  if (dateString instanceof Date) return dateString;
  
  // Handle DD/MM/YYYY format
  if (typeof dateString === 'string') {
    // Check for DD/MM/YYYY or DD-MM-YYYY format
    const ddmmyyyyPattern = /^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/;
    const match = dateString.match(ddmmyyyyPattern);
    
    if (match) {
      const [, day, month, year] = match;
      // Create date in YYYY-MM-DD format (month is 0-indexed in JS Date)
      const convertedDate = new Date(year, month - 1, day);
      console.log(`Date conversion: "${dateString}" -> ${convertedDate.toISOString()}`);
      return convertedDate;
    }
    
    // Try to parse as-is (for ISO format or other valid formats)
    const parsedDate = new Date(dateString);
    if (!isNaN(parsedDate.getTime())) {
      console.log(`Date parsed as-is: "${dateString}" -> ${parsedDate.toISOString()}`);
      return parsedDate;
    }
  }
  
  throw new Error(`Invalid date format: ${dateString}. Expected DD/MM/YYYY or valid date string.`);
};

// Helper function to process all date fields in certificate data
const processDateFields = (data) => {
  const dateFields = ['issueDate', 'expiryDate', 'completionDate']; // Add any other date fields here
  const processedData = { ...data };
  
  console.log("Processing certificate data:", data);
  
  for (const field of dateFields) {
    if (processedData[field]) {
      try {
        processedData[field] = convertDateString(processedData[field]);
        console.log(`Successfully converted ${field}:`, processedData[field]);
      } catch (error) {
        console.error(`Error converting ${field}:`, error.message);
        throw error;
      }
    }
  }
  
  return processedData;
};

// Create certificate entry
router.post("/", async (req, res) => {
  try {
    console.log("Received certificate data:", req.body);
    
    // Validate required fields
    const requiredFields = ['certificateId', 'fullName', 'courseName', 'issueDate', 'issuedBy'];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({
          success: false,
          message: `Missing required field: ${field}`
        });
      }
    }
    
    // Process all date fields
    const certificateData = processDateFields(req.body);
    console.log("Processed certificate data:", certificateData);
    
    const cert = new Certificate(certificateData);
    await cert.save();
    
    console.log("Certificate saved successfully:", cert._id);
    res.status(201).json({ success: true, message: "Certificate added successfully", data: cert });
  } catch (error) {
    console.error("Certificate creation error:", error);
    
    // Provide more specific error messages
    if (error.message.includes('Invalid date format')) {
      return res.status(400).json({ 
        success: false, 
        message: error.message 
      });
    }
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        success: false, 
        message: `Validation error: ${error.message}` 
      });
    }
    
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Certificate ID already exists. Please use a unique certificate ID."
      });
    }
    
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
    console.error("Certificate fetch error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get all certificates (optional - for admin purposes)
router.get("/", async (req, res) => {
  try {
    const certificates = await Certificate.find().sort({ createdAt: -1 });
    res.json({ success: true, data: certificates });
  } catch (error) {
    console.error("Certificates fetch error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;

import express from "express";
import { SecurityLogModel } from "../model/securityLog.model.js";

const securityRouter = express.Router();

// Log security violation
securityRouter.post("/log-violation", async (req, res) => {
  try {
    const {
      userId,
      username,
      email,
      course,
      subTopic,
      level,
      violationType,
      violationCount,
      timestamp,
      userAgent,
      ipAddress
    } = req.body;

    const securityLog = new SecurityLogModel({
      userId,
      username,
      email,
      course,
      subTopic,
      level,
      violationType,
      violationCount,
      timestamp: timestamp || new Date(),
      userAgent: userAgent || req.headers['user-agent'],
      ipAddress: ipAddress || req.ip,
      sessionId: req.session?.id
    });

    await securityLog.save();

    res.status(200).json({
      success: true,
      message: "Security violation logged successfully",
      logId: securityLog._id
    });
  } catch (error) {
    console.error("Error logging security violation:", error);
    res.status(500).json({
      success: false,
      message: "Failed to log security violation",
      error: error.message
    });
  }
});

// Get security logs for admin
securityRouter.get("/logs", async (req, res) => {
  try {
    const { course, subTopic, level, violationType, startDate, endDate, limit = 100 } = req.query;
    
    let query = {};
    
    if (course) query.course = course;
    if (subTopic) query.subTopic = subTopic;
    if (level) query.level = level;
    if (violationType) query.violationType = violationType;
    
    if (startDate || endDate) {
      query.timestamp = {};
      if (startDate) query.timestamp.$gte = new Date(startDate);
      if (endDate) query.timestamp.$lte = new Date(endDate);
    }

    const logs = await SecurityLogModel.find(query)
      .sort({ timestamp: -1 })
      .limit(parseInt(limit))
      .select('-__v');

    res.status(200).json({
      success: true,
      logs,
      total: logs.length
    });
  } catch (error) {
    console.error("Error fetching security logs:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch security logs",
      error: error.message
    });
  }
});

// Get violation statistics
securityRouter.get("/statistics", async (req, res) => {
  try {
    const { course, subTopic, level, startDate, endDate } = req.query;
    
    let matchQuery = {};
    
    if (course) matchQuery.course = course;
    if (subTopic) matchQuery.subTopic = subTopic;
    if (level) matchQuery.level = level;
    
    if (startDate || endDate) {
      matchQuery.timestamp = {};
      if (startDate) matchQuery.timestamp.$gte = new Date(startDate);
      if (endDate) matchQuery.timestamp.$lte = new Date(endDate);
    }

    const stats = await SecurityLogModel.aggregate([
      { $match: matchQuery },
      {
        $group: {
          _id: {
            violationType: "$violationType",
            course: "$course",
            level: "$level"
          },
          count: { $sum: 1 },
          uniqueUsers: { $addToSet: "$userId" }
        }
      },
      {
        $group: {
          _id: "$_id.violationType",
          totalViolations: { $sum: "$count" },
          courses: {
            $push: {
              course: "$_id.course",
              level: "$_id.level",
              count: "$count",
              uniqueUsers: { $size: "$uniqueUsers" }
            }
          }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      statistics: stats
    });
  } catch (error) {
    console.error("Error fetching security statistics:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch security statistics",
      error: error.message
    });
  }
});

export { securityRouter };

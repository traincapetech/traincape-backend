import express from "express";
import jwt from "jsonwebtoken";
import { VideoCourseModel } from "../model/videoCourse.model.js";
import { UserModel } from "../model/user.model.js";
import auth from "../middleware/auth.middleware.js";
import adminOnly from "../middleware/admin.middleware.js";

const videoCourseRouter = express.Router();

const extractDriveFileId = (input) => {
  if (!input) return "";
  const cleanInput = input.trim();
  const fileDMatch = cleanInput.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileDMatch && fileDMatch[1]) {
    return fileDMatch[1];
  }
  const idParamMatch = cleanInput.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (idParamMatch && idParamMatch[1]) {
    return idParamMatch[1];
  }
  return cleanInput;
};

// Helper to decode token optionally (without throwing unauthorized errors)
const getDecodedToken = (req) => {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;
  if (!token) return null;
  try {
    const secret = process.env.SECRET_KEY;
    return jwt.verify(token, secret);
  } catch (_) {
    return null;
  }
};

// 1. GET ALL VIDEO COURSES
videoCourseRouter.get("/", async (req, res) => {
  try {
    const courses = await VideoCourseModel.find({}).sort({ createdAt: -1 });
    const decoded = getDecodedToken(req);
    let user = null;
    if (decoded) {
      user = await UserModel.findById(decoded.userId);
    }

    const results = courses.map(course => {
      const hasAccess = user
        ? (user.role === "Admin" || user.role === "admin" || decoded.role === "Instructor" || user.courses.some(c => c.courseId === course._id.toString()))
        : false;

      return {
        _id: course._id,
        title: course.title,
        description: course.description,
        price: course.price,
        thumbnailUrl: course.thumbnailUrl,
        videosCount: course.videos.length,
        freeVideosCount: course.videos.filter(v => v.isFree).length,
        isPurchased: hasAccess,
        createdAt: course.createdAt
      };
    });

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2. GET SINGLE VIDEO COURSE DETAILS
videoCourseRouter.get("/:id", async (req, res) => {
  try {
    const course = await VideoCourseModel.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    const decoded = getDecodedToken(req);
    let hasAccess = false;
    if (decoded) {
      if (decoded.role === "Admin" || decoded.role === "admin" || decoded.role === "Instructor") {
        hasAccess = true;
      } else {
        const user = await UserModel.findById(decoded.userId);
        if (user && user.courses.some(c => c.courseId === course._id.toString())) {
          hasAccess = true;
        }
      }
    }

    // Obfuscate paid video IDs if not purchased
    const sanitizedVideos = course.videos.map(video => {
      if (video.isFree || hasAccess) {
        return video;
      } else {
        return {
          _id: video._id,
          title: video.title,
          isFree: false,
          driveFileId: null // Protected ID
        };
      }
    });

    res.status(200).json({
      _id: course._id,
      title: course.title,
      description: course.description,
      price: course.price,
      thumbnailUrl: course.thumbnailUrl,
      videos: sanitizedVideos,
      isPurchased: hasAccess,
      createdAt: course.createdAt
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3. CREATE A NEW VIDEO COURSE (Admin/Instructor only)
videoCourseRouter.post("/", auth, adminOnly, async (req, res) => {
  const { title, description, price, thumbnailUrl, videos } = req.body;
  try {
    if (!title || price == null) {
      return res.status(400).json({ error: "Title and price are required" });
    }

    const cleanedVideos = (videos || []).map(video => ({
      title: video.title,
      driveFileId: extractDriveFileId(video.driveFileId),
      isFree: !!video.isFree
    }));

    const newCourse = new VideoCourseModel({
      title,
      description,
      price,
      thumbnailUrl,
      videos: cleanedVideos
    });

    await newCourse.save();
    res.status(201).json({ success: true, course: newCourse });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 4. UPDATE VIDEO COURSE (Admin/Instructor only)
videoCourseRouter.put("/:id", auth, adminOnly, async (req, res) => {
  const { title, description, price, thumbnailUrl, videos } = req.body;
  try {
    const course = await VideoCourseModel.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    if (title !== undefined) course.title = title;
    if (description !== undefined) course.description = description;
    if (price !== undefined) course.price = price;
    if (thumbnailUrl !== undefined) course.thumbnailUrl = thumbnailUrl;
    if (videos !== undefined) {
      course.videos = videos.map(video => ({
        title: video.title,
        driveFileId: extractDriveFileId(video.driveFileId),
        isFree: !!video.isFree
      }));
    }

    await course.save();
    res.status(200).json({ success: true, course });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 5. DELETE VIDEO COURSE (Admin/Instructor only)
videoCourseRouter.delete("/:id", auth, adminOnly, async (req, res) => {
  try {
    const course = await VideoCourseModel.findByIdAndDelete(req.params.id);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    res.status(200).json({ success: true, message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export { videoCourseRouter };

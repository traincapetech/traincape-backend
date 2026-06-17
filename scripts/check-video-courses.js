import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { VideoCourseModel } from '../model/videoCourse.model.js';

dotenv.config();

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

async function run() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB database");

    const courses = await VideoCourseModel.find({});
    console.log("Cleaning database entries...");

    for (let course of courses) {
      let modified = false;
      for (let video of course.videos) {
        const cleaned = extractDriveFileId(video.driveFileId);
        if (cleaned !== video.driveFileId) {
          console.log(`Updating video "${video.title}" from:`);
          console.log(`  OLD: ${video.driveFileId}`);
          console.log(`  NEW: ${cleaned}`);
          video.driveFileId = cleaned;
          modified = true;
        }
      }
      if (modified) {
        await course.save();
        console.log(`Saved changes to course: ${course.title}`);
      }
    }

    console.log("Database cleanup complete!");
    await mongoose.connection.close();
  } catch (err) {
    console.error(err);
  }
}

run();

import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  driveFileId: { type: String, required: true },
  isFree: { type: Boolean, default: false }
});

const videoCourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true, min: 0, default: 0 },
  thumbnailUrl: { type: String, default: "" },
  videos: [videoSchema],
  createdAt: { type: Date, default: Date.now }
});

const VideoCourseModel = mongoose.model("videocourses", videoCourseSchema);

export { VideoCourseModel };

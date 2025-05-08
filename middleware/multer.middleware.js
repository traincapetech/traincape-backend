import multer from "multer";

const storage = multer.memoryStorage(); // ✅ store file in RAM

export const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    // Optional: add file type validation
    cb(null, true);
  },
});
import express from "express";
import { upload } from "../middleware/multer.middleware.js";
import {
    addIntern,
    getInterns,
    getInternPhoto,
    updateIntern,
    deleteIntern,
} from "../controllers/intern.controller.js";

const router = express.Router();

router.post("/", upload.fields([{ name: "photo", maxCount: 1 }]), addIntern);
router.get("/", getInterns);
router.get("/:id/photo", getInternPhoto);
router.put("/:id", upload.fields([{ name: "photo", maxCount: 1 }]), updateIntern);
router.delete("/:id", deleteIntern);

export default router;

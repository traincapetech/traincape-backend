//buynow.route.js
import express from "express";
import { storebuynow } from "../Controllers/buynow.controller.js";


const router = express.Router();


//Routes
router.post('/store', storebuynow);

export default router;

//newuser.route.js
import express from "express";
import { registerUser, getnewuser, getnewUserById, loginNewUser} from "../Controllers/newuser.controller.js";

const router = express.Router();

//create a new user
router.post("/register", registerUser);
router.get("/all", getnewuser);
router.get("/:id", getnewUserById);
router.post("/login", loginNewUser);

export default router;
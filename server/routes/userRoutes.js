import express from "express";
import { userRegister, userLogin } from "../controllers/userController.js";

const router = express.Router();

// LOGIC: Linking the URL path to the Controller function
router.post("/register", userRegister);
router.post("/login", userLogin);

export default router;
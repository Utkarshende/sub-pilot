import express from "express";
import { 
  getSubscriptions, 
  addSubscription, 
  deleteSubscription,
  updateSubscription // 1. ADD THIS IMPORT
} from "../controllers/subController.js";
import jwtCheck from "../middleware/jwtCheck.js";

const router = express.Router();

// LOGIC: Security middleware
router.use(jwtCheck); 

router.get("/", getSubscriptions);
router.post("/", addSubscription);

// 2. ADD THIS LINE: This fixes the 404 "Cannot PUT" error
router.put("/:id", updateSubscription); 

router.delete("/:id", deleteSubscription);

export default router;
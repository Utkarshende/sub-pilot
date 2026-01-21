import express from "express";
import { 
  getSubscriptions, 
  addSubscription, 
  deleteSubscription 
} from "../controllers/subController.js";
import jwtCheck from "../middleware/jwtCheck.js";

const router = express.Router();

// LOGIC: Apply middleware to all routes in this file
router.use(jwtCheck); 

router.get("/", getSubscriptions);
router.post("/", addSubscription);
router.delete("/:id", deleteSubscription);

export default router;
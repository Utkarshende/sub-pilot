import express from "express";
import { addSub, deleteSub,getSubs} from '../controllers/subController.js'
import jwtCheck from "../middleware/jwtCheck.js";

const router = express.Router();

router.use(jwtCheck); 

router.get("/", getSubs);
router.post("/", addSub);
router.delete("/:id", deleteSub);

export default router;
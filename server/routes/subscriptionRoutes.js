import express from "express";
import {getSub , addSub, deleteSub} from '../controllers/subController.js';
import {protect} from '../middleware/jwtCheck.js';

const router=express.Router();
router.route('/').get(protect, getSubs).post(protect, addSub);
router.delete('/:id', protect, deleteSub)

export default router;s
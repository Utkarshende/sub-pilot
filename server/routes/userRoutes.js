// server/routes/userRoutes.js
import express from 'express';
const router = express.Router();
import { getProfile, updateProfile } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js'; // Ensure user is logged in

// This creates the endpoint: GET /api/users/profile
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);

export default router;a
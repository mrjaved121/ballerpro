import { Router } from 'express';
import { getProfile, updateProfile } from '../controllers/userController.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

// All user routes require authentication
router.use(authenticate);

// User profile routes
router.get('/profile', getProfile);
router.put('/profile', updateProfile);

export default router;


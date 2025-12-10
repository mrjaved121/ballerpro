import { Router } from 'express';
import {
  saveStep1,
  saveStep2,
  saveStep3,
  saveStep4,
  saveStep5,
  getOnboardingStatus,
} from '../controllers/onboardingController.js';
import { authenticate } from '../middleware/auth.js';
import { validate } from '../utils/validation.js';
import {
  step1Schema,
  step2Schema,
  step3Schema,
  step4Schema,
  step5Schema,
} from '../utils/onboardingValidation.js';

const router = Router();

// All onboarding routes require authentication
router.use(authenticate);

// Onboarding routes
router.post('/step1', validate(step1Schema), saveStep1);
router.post('/step2', validate(step2Schema), saveStep2);
router.post('/step3', validate(step3Schema), saveStep3);
router.post('/step4', validate(step4Schema), saveStep4);
router.post('/step5', validate(step5Schema), saveStep5);
router.get('/status', getOnboardingStatus);

export default router;


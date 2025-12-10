import { z } from 'zod';

// Step 1 validation - Gender Selection
export const step1Schema = z.object({
  gender: z.enum(['male', 'female', 'other'], {
    required_error: 'Please select your gender',
  }),
});

// Step 2 validation - Journey (Goal & Training Level)
export const step2Schema = z.object({
  goal: z.enum(['muscle', 'fat_loss', 'endurance', 'strength'], {
    required_error: 'Please select your main goal',
  }),
  trainingLevel: z.enum(['strength_athlete', 'endurance_runner', 'casual', 'beginner'], {
    required_error: 'Please select your training level',
  }),
});

// Step 3 validation - Training Experience
export const step3Schema = z.object({
  experienceLevel: z.enum(['beginner', 'intermediate', 'advanced'], {
    required_error: 'Please select an experience level',
  }),
});

// Step 4 validation - Injury History
export const step4Schema = z.object({
  injuries: z.array(z.string()).optional(),
  otherDetails: z.string().optional(),
});

// Step 5 validation - Main Goal Selection
export const step5Schema = z.object({
  goal: z.enum(['muscle-gain', 'fat-loss', 'maintenance'], {
    required_error: 'Please select a goal',
  }),
});


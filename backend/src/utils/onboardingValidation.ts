import { z } from 'zod';

// Step 1 validation - Gender Selection
export const step1Schema = z.object({
  gender: z.enum(['male', 'female', 'other'], {
    required_error: 'Please select your gender',
  }),
});

// Step 2 validation - Training Experience
export const step2Schema = z.object({
  experienceLevel: z.enum(['beginner', 'intermediate', 'advanced'], {
    required_error: 'Please select an experience level',
  }),
});

// Step 3 validation - Injury History
export const step3Schema = z.object({
  injuries: z.array(z.string()).optional(),
  otherDetails: z.string().optional(),
});

// Step 4 validation - Goal Selection
export const step4Schema = z.object({
  goal: z.enum(['muscle-gain', 'fat-loss', 'maintenance'], {
    required_error: 'Please select a goal',
  }),
});


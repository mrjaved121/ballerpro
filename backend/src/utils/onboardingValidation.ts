import { z } from 'zod';

// Step 1 validation
export const step1Schema = z.object({
  goal: z.enum(['build-muscle', 'lose-fat', 'improve-endurance', 'increase-strength'], {
    required_error: 'Please select a goal',
  }),
  trainingLevel: z.enum(['strength-athlete', 'endurance-runner', 'casual-gym-goer', 'beginner'], {
    required_error: 'Please select a training level',
  }),
});

// Step 2 validation (placeholder - update when step 2 is defined)
export const step2Schema = z.object({
  // Add step 2 fields here
}).passthrough(); // Allow additional fields

// Step 3 validation (placeholder - update when step 3 is defined)
export const step3Schema = z.object({
  // Add step 3 fields here
}).passthrough(); // Allow additional fields

// Step 4 validation (placeholder - update when step 4 is defined)
export const step4Schema = z.object({
  // Add step 4 fields here
}).passthrough(); // Allow additional fields


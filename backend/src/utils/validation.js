import { z } from 'zod';

// Register validation schema
export const registerSchema = z.object({
  email: z
    .string()
    .email('Invalid email')
    .min(1, 'Email is required'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(100, 'Password is too long'),
  name: z
    .string()
    .min(1, 'Name is required')
    .max(100, 'Name is too long')
    .optional(),
});

// Login validation schema
export const loginSchema = z.object({
  email: z
    .string()
    .email('Invalid email')
    .min(1, 'Email is required'),
  password: z
    .string()
    .min(1, 'Password is required'),
});

// Forgot password validation schema
export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .email('Invalid email')
    .min(1, 'Email is required'),
});

// Reset password validation schema
export const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Token is required'),
  password: z
    .string()
    .min(6, 'String must contain at least 6 character(s)')
    .max(100, 'Password is too long'),
});

// Validation middleware
export const validate = (schema) => {
  return (req, res, next) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Safety check for errors array
        const errors = error.errors || error.issues || [];
        
        res.status(400).json({
          success: false,
          message: 'Validation error',
          errors: errors.map((err) => {
            const errorObj = {
              field: err.path ? err.path.join('.') : 'unknown',
              message: err.message,
              code: err.code,
            };
            
            // Add validation type for string validations
            if (err.code === 'invalid_string' && err.validation) {
              errorObj.validation = err.validation;
            }
            
            // Add minimum value for too_small errors
            if (err.code === 'too_small' && err.minimum !== undefined) {
              errorObj.minimum = err.minimum;
            }
            
            // Add maximum value for too_big errors
            if (err.code === 'too_big' && err.maximum !== undefined) {
              errorObj.maximum = err.maximum;
            }
            
            // Add expected values for enum errors
            if (err.code === 'invalid_enum_value' && err.options) {
              errorObj.options = err.options;
            }
            
            return errorObj;
          }),
        });
      } else {
        // For non-Zod errors, pass to error handler
        console.error('Validation error:', error);
        res.status(400).json({
          success: false,
          message: 'Invalid request format',
        });
      }
    }
  };
};


import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';

export const generateToken = (payload) => {
  return jwt.sign(payload, config.jwtSecret, {
    expiresIn: config.jwtExpire,
  });
};

export const generateRefreshToken = (payload) => {
  return jwt.sign(payload, config.jwtSecret, {
    expiresIn: '30d', // Refresh tokens last longer
  });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, config.jwtSecret);
  } catch (error) {
    // Check if token is expired
    if (error.name === 'TokenExpiredError') {
      const expiredError = new Error('Token has expired');
      expiredError.name = 'TokenExpiredError';
      throw expiredError;
    }
    // For all other errors (invalid signature, malformed, etc.)
    throw new Error('Invalid or expired token');
  }
};


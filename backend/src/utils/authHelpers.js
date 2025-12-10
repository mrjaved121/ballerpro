// Helper functions for authentication

import { generateToken, generateRefreshToken } from './jwt.js';

/**
 * Generate both access and refresh tokens for a user
 * @param {Object} user - User object with _id and email
 * @returns {Object} Object containing token and refreshToken
 */
export const generateTokenPair = (user) => {
  const payload = {
    userId: user._id.toString(),
    email: user.email,
  };

  return {
    token: generateToken(payload),
    refreshToken: generateRefreshToken(payload),
  };
};

/**
 * Format user object for API response (excludes sensitive fields)
 * @param {Object} user - User document from database
 * @param {Object} options - Formatting options
 * @param {boolean} options.includeUpdatedAt - Whether to include updatedAt (default: true)
 * @returns {Object} Formatted user object
 */
export const formatUserResponse = (user, options = {}) => {
  const { includeUpdatedAt = true } = options;
  
  const formattedUser = {
    id: user._id,
    email: user.email,
    name: user.name,
    avatar: user.avatar,
    isEmailVerified: user.isEmailVerified,
    createdAt: user.createdAt,
  };

  if (includeUpdatedAt) {
    formattedUser.updatedAt = user.updatedAt;
  }

  return formattedUser;
};


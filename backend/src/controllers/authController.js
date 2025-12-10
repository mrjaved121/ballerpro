import { User } from '../models/User.js';
import { hashPassword, comparePassword } from '../utils/password.js';
import { verifyToken } from '../utils/jwt.js';
import { generateTokenPair, formatUserResponse } from '../utils/authHelpers.js';

// Register new user
export const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(409).json({
        success: false,
        message: 'Email already registered',
      });
      return;
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = await User.create({
      email,
      password: hashedPassword,
      name: name || email.split('@')[0], // Use email prefix as default name
    });

    // Generate tokens
    const tokens = generateTokenPair(user);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: formatUserResponse(user, { includeUpdatedAt: false }), // Register doesn't return updatedAt
        ...tokens,
      },
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to register user',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

// Login user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user and include password field
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
      return;
    }

    // Verify password
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
      return;
    }

    // Generate tokens
    const tokens = generateTokenPair(user);

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: formatUserResponse(user), // Includes both timestamps
        ...tokens,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Login failed. Please try again.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

// Get current user
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user?.userId);
    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found',
      });
      return;
    }

    res.json({
      success: true,
      data: {
        user: formatUserResponse(user), // Includes both timestamps
      },
    });
  } catch (error) {
    console.error('Get me error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user data',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

// Refresh token
export const refreshToken = async (req, res) => {
  try {
    const { refreshToken: refreshTokenValue } = req.body;

    if (!refreshTokenValue) {
      res.status(400).json({
        success: false,
        message: 'Refresh token is required',
      });
      return;
    }

    // Verify refresh token
    const decoded = verifyToken(refreshTokenValue);

    // Generate new token pair with decoded user info
    const tokens = generateTokenPair({
      _id: decoded.userId,
      email: decoded.email,
    });

    res.json({
      success: true,
      data: tokens,
    });
  } catch (error) {
    console.error('Refresh token error:', error);
    
    // Handle specific token errors (401) vs server errors (500)
    if (error.message && (error.message.includes('token') || error.name === 'TokenExpiredError' || error.name === 'JsonWebTokenError')) {
      const message = error.name === 'TokenExpiredError' 
        ? 'Refresh token has expired' 
        : 'Invalid refresh token';
      
      res.status(401).json({
        success: false,
        message,
      });
    } else {
      // Unexpected server error
      res.status(500).json({
        success: false,
        message: 'Failed to refresh token',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined,
      });
    }
  }
};

// Logout user
export const logout = async (req, res) => {
  try {
    // In a stateless JWT implementation, logout is handled client-side by removing tokens
    // Server-side: Could implement token blacklist for additional security
    // For now, we just confirm successful logout
    res.json({
      success: true,
      message: 'Logged out successfully',
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      message: 'Logout failed',
    });
  }
};

// Forgot password
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    
    // Always return same message for security (prevent email enumeration)
    // Whether user exists or not, we return success
    if (!user) {
      res.json({
        success: true,
        message: 'If an account exists with this email, a password reset link has been sent',
      });
      return;
    }

    // TODO: Generate reset token and send email
    // For production: 
    // 1. Generate secure reset token
    // 2. Store token with expiration (1 hour) in database
    // 3. Send email with reset link
    // 4. Implement rate limiting (3 requests per hour per email)
    
    res.json({
      success: true,
      message: 'If an account exists with this email, a password reset link has been sent',
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process password reset request',
    });
  }
};

// Reset password
export const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;

    // TODO: Complete implementation
    // Production implementation steps:
    // 1. Hash the provided token
    // 2. Find user with matching resetPasswordToken
    // 3. Check if token hasn't expired (resetPasswordExpires > Date.now())
    // 4. If valid, hash new password and update user
    // 5. Clear reset token fields
    // 6. Invalidate all user sessions (optional)
    // 7. Return success message
    
    // For now, return placeholder message
    res.json({
      success: true,
      message: 'Password reset functionality will be implemented soon',
    });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to reset password',
    });
  }
};


import { verifyToken } from '../utils/jwt.js';

export const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({
        success: false,
        message: 'No token provided',
      });
      return;
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    // Handle specific token errors
    const message = error.name === 'TokenExpiredError' 
      ? 'Token has expired' 
      : 'Invalid or expired token';
    
    res.status(401).json({
      success: false,
      message,
    });
  }
};


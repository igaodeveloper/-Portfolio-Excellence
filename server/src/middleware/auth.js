import jwt from 'jsonwebtoken';
import { findByField } from '../models/index.js';

// JWT Secret (in production this would be environment variable)
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key';

/**
 * Middleware to authenticate JWT tokens
 */
export const authMiddleware = (req, res, next) => {
  // Get token from header
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: { message: 'Authorization token required' } });
  }
  
  const token = authHeader.split(' ')[1];
  
  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Add user info to request
    req.user = decoded;
    
    next();
  } catch (err) {
    return res.status(401).json({ error: { message: 'Invalid token' } });
  }
};

/**
 * Middleware to check if user is admin
 */
export const adminMiddleware = (req, res, next) => {
  // First run auth middleware
  authMiddleware(req, res, (authErr) => {
    if (authErr) return next(authErr);
    
    // Check if user is admin
    if (req.user && req.user.role === 'admin') {
      return next();
    }
    
    return res.status(403).json({
      error: { message: 'Access denied. Admin privileges required.' }
    });
  });
};

/**
 * Generate JWT token for a user
 */
export const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role
    },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
};

export default {
  authMiddleware,
  adminMiddleware,
  generateToken
}; 
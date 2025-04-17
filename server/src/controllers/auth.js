import bcrypt from 'bcryptjs';
import { findByField } from '../models/index.js';
import { generateToken } from '../middleware/auth.js';

/**
 * User login
 * @route POST /api/auth/login
 * @access Public
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user by email
    const user = findByField('users', 'email', email);
    
    if (!user) {
      return res.status(401).json({ error: { message: 'Invalid credentials' } });
    }
    
    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(401).json({ error: { message: 'Invalid credentials' } });
    }
    
    // Generate JWT
    const token = generateToken(user);
    
    return res.status(200).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: { message: 'Server error' } });
  }
};

/**
 * Get current user
 * @route GET /api/auth/me
 * @access Private
 */
export const getMe = (req, res) => {
  try {
    // req.user is set from the auth middleware
    const user = findByField('users', 'id', req.user.id);
    
    if (!user) {
      return res.status(404).json({ error: { message: 'User not found' } });
    }
    
    // Don't send the password
    const { password, ...userData } = user;
    
    return res.status(200).json(userData);
  } catch (error) {
    console.error('Get me error:', error);
    return res.status(500).json({ error: { message: 'Server error' } });
  }
};

export default {
  login,
  getMe
}; 
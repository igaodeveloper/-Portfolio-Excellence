import express from 'express';
import { login, getMe } from '../controllers/auth.js';
import { loginValidationRules } from '../middleware/validators.js';
import { validateRequest } from '../middleware/validators.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

/**
 * @route   POST /api/auth/login
 * @desc    Login user and get token
 * @access  Public
 */
router.post('/login', loginValidationRules, validateRequest, login);

/**
 * @route   GET /api/auth/me
 * @desc    Get current user
 * @access  Private
 */
router.get('/me', authMiddleware, getMe);

export default router; 
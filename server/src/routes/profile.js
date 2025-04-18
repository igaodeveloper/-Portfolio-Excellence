import express from 'express';
import { getProfileData, updateProfileData } from '../controllers/profile.js';
import { profileValidationRules } from '../middleware/validators.js';
import { validateRequest } from '../middleware/validators.js';
import { adminMiddleware } from '../middleware/auth.js';

const router = express.Router();

/**
 * @route   GET /api/profile
 * @desc    Get profile data
 * @access  Public
 */
router.get('/', getProfileData);

/**
 * @route   PUT /api/profile
 * @desc    Update profile data
 * @access  Private (Admin)
 */
router.put(
  '/',
  adminMiddleware,
  profileValidationRules,
  validateRequest,
  updateProfileData,
);

export default router;

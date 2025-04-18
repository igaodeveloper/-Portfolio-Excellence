import express from 'express';
import {
  getAllExperiences,
  getExperienceById,
  createExperience,
  updateExperience,
  deleteExperience,
} from '../controllers/experience.js';
import {
  experienceValidationRules,
  idParamValidation,
} from '../middleware/validators.js';
import { validateRequest } from '../middleware/validators.js';
import { adminMiddleware } from '../middleware/auth.js';

const router = express.Router();

/**
 * @route   GET /api/experience
 * @desc    Get all experiences
 * @access  Public
 */
router.get('/', getAllExperiences);

/**
 * @route   GET /api/experience/:id
 * @desc    Get experience by ID
 * @access  Public
 */
router.get('/:id', idParamValidation, validateRequest, getExperienceById);

/**
 * @route   POST /api/experience
 * @desc    Create a new experience
 * @access  Private (Admin)
 */
router.post(
  '/',
  adminMiddleware,
  experienceValidationRules,
  validateRequest,
  createExperience,
);

/**
 * @route   PUT /api/experience/:id
 * @desc    Update an experience
 * @access  Private (Admin)
 */
router.put(
  '/:id',
  adminMiddleware,
  idParamValidation,
  experienceValidationRules,
  validateRequest,
  updateExperience,
);

/**
 * @route   DELETE /api/experience/:id
 * @desc    Delete an experience
 * @access  Private (Admin)
 */
router.delete(
  '/:id',
  adminMiddleware,
  idParamValidation,
  validateRequest,
  deleteExperience,
);

export default router;

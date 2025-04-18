import express from 'express';
import {
  getAllProjects,
  getProjectById,
  getFeaturedProjects,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/projects.js';
import {
  projectValidationRules,
  idParamValidation,
} from '../middleware/validators.js';
import { validateRequest } from '../middleware/validators.js';
import { adminMiddleware } from '../middleware/auth.js';

const router = express.Router();

/**
 * @route   GET /api/projects
 * @desc    Get all projects
 * @access  Public
 */
router.get('/', getAllProjects);

/**
 * @route   GET /api/projects/featured
 * @desc    Get featured projects
 * @access  Public
 */
router.get('/featured', getFeaturedProjects);

/**
 * @route   GET /api/projects/:id
 * @desc    Get project by ID
 * @access  Public
 */
router.get('/:id', idParamValidation, validateRequest, getProjectById);

/**
 * @route   POST /api/projects
 * @desc    Create a new project
 * @access  Private (Admin)
 */
router.post(
  '/',
  adminMiddleware,
  projectValidationRules,
  validateRequest,
  createProject,
);

/**
 * @route   PUT /api/projects/:id
 * @desc    Update a project
 * @access  Private (Admin)
 */
router.put(
  '/:id',
  adminMiddleware,
  idParamValidation,
  projectValidationRules,
  validateRequest,
  updateProject,
);

/**
 * @route   DELETE /api/projects/:id
 * @desc    Delete a project
 * @access  Private (Admin)
 */
router.delete(
  '/:id',
  adminMiddleware,
  idParamValidation,
  validateRequest,
  deleteProject,
);

export default router;

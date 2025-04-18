import express from 'express';
import {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
} from '../controllers/services.js';
import {
  serviceValidationRules,
  idParamValidation,
} from '../middleware/validators.js';
import { validateRequest } from '../middleware/validators.js';
import { adminMiddleware } from '../middleware/auth.js';

const router = express.Router();

/**
 * @route   GET /api/services
 * @desc    Get all services
 * @access  Public
 */
router.get('/', getAllServices);

/**
 * @route   GET /api/services/:id
 * @desc    Get service by ID
 * @access  Public
 */
router.get('/:id', idParamValidation, validateRequest, getServiceById);

/**
 * @route   POST /api/services
 * @desc    Create a new service
 * @access  Private (Admin)
 */
router.post(
  '/',
  adminMiddleware,
  serviceValidationRules,
  validateRequest,
  createService,
);

/**
 * @route   PUT /api/services/:id
 * @desc    Update a service
 * @access  Private (Admin)
 */
router.put(
  '/:id',
  adminMiddleware,
  idParamValidation,
  serviceValidationRules,
  validateRequest,
  updateService,
);

/**
 * @route   DELETE /api/services/:id
 * @desc    Delete a service
 * @access  Private (Admin)
 */
router.delete(
  '/:id',
  adminMiddleware,
  idParamValidation,
  validateRequest,
  deleteService,
);

export default router;

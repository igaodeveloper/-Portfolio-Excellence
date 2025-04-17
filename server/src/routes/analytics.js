import express from 'express';
import {
  getAnalyticsData,
  updateAnalyticsData,
  recordPageView,
  recordProjectView
} from '../controllers/analytics.js';
import { idParamValidation } from '../middleware/validators.js';
import { validateRequest } from '../middleware/validators.js';
import { adminMiddleware } from '../middleware/auth.js';

const router = express.Router();

/**
 * @route   GET /api/analytics
 * @desc    Get analytics data
 * @access  Private (Admin)
 */
router.get('/', adminMiddleware, getAnalyticsData);

/**
 * @route   PUT /api/analytics
 * @desc    Update analytics data
 * @access  Private (Admin)
 */
router.put('/', adminMiddleware, updateAnalyticsData);

/**
 * @route   POST /api/analytics/pageview
 * @desc    Record page view
 * @access  Public
 */
router.post('/pageview', recordPageView);

/**
 * @route   POST /api/analytics/project/:projectId
 * @desc    Record project view
 * @access  Public
 */
router.post('/project/:projectId', idParamValidation, validateRequest, recordProjectView);

export default router; 
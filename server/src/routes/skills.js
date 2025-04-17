import express from 'express';
import {
  getAllSkills,
  getSkillById,
  createSkill,
  updateSkill,
  deleteSkill
} from '../controllers/skills.js';
import { skillValidationRules, idParamValidation } from '../middleware/validators.js';
import { validateRequest } from '../middleware/validators.js';
import { adminMiddleware } from '../middleware/auth.js';

const router = express.Router();

/**
 * @route   GET /api/skills
 * @desc    Get all skills
 * @access  Public
 */
router.get('/', getAllSkills);

/**
 * @route   GET /api/skills/:id
 * @desc    Get skill by ID
 * @access  Public
 */
router.get('/:id', idParamValidation, validateRequest, getSkillById);

/**
 * @route   POST /api/skills
 * @desc    Create a new skill
 * @access  Private (Admin)
 */
router.post('/', adminMiddleware, skillValidationRules, validateRequest, createSkill);

/**
 * @route   PUT /api/skills/:id
 * @desc    Update a skill
 * @access  Private (Admin)
 */
router.put('/:id', adminMiddleware, idParamValidation, skillValidationRules, validateRequest, updateSkill);

/**
 * @route   DELETE /api/skills/:id
 * @desc    Delete a skill
 * @access  Private (Admin)
 */
router.delete('/:id', adminMiddleware, idParamValidation, validateRequest, deleteSkill);

export default router; 
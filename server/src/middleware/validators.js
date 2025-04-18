import { body, param, validationResult } from 'express-validator';

/**
 * Middleware to check validation results
 */
export const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: {
        message: 'Validation failed',
        details: errors.array(),
      },
    });
  }
  next();
};

/**
 * Auth validation rules
 */
export const loginValidationRules = [
  body('email').isEmail().withMessage('Please provide a valid email address'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
];

/**
 * Profile validation rules
 */
export const profileValidationRules = [
  body('name')
    .optional()
    .isString()
    .withMessage('Name must be a string')
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('title')
    .optional()
    .isString()
    .withMessage('Title must be a string')
    .isLength({ min: 2, max: 100 })
    .withMessage('Title must be between 2 and 100 characters'),
  body('bio').optional().isString().withMessage('Bio must be a string'),
  body('email')
    .optional()
    .isEmail()
    .withMessage('Please provide a valid email address'),
  body('phone').optional().isString().withMessage('Phone must be a string'),
  body('location')
    .optional()
    .isString()
    .withMessage('Location must be a string'),
  body('socialLinks')
    .optional()
    .isObject()
    .withMessage('Social links must be an object'),
];

/**
 * Project validation rules
 */
export const projectValidationRules = [
  body('title')
    .isString()
    .withMessage('Title must be a string')
    .isLength({ min: 2, max: 100 })
    .withMessage('Title must be between 2 and 100 characters'),
  body('slug')
    .optional()
    .isString()
    .withMessage('Slug must be a string')
    .isLength({ min: 2, max: 100 })
    .withMessage('Slug must be between 2 and 100 characters')
    .matches(/^[a-z0-9-]+$/)
    .withMessage(
      'Slug can only contain lowercase letters, numbers, and hyphens',
    ),
  body('description').isString().withMessage('Description must be a string'),
  body('technologies').isArray().withMessage('Technologies must be an array'),
  body('imageUrl')
    .optional()
    .isURL()
    .withMessage('Image URL must be a valid URL'),
  body('demoUrl')
    .optional()
    .isURL()
    .withMessage('Demo URL must be a valid URL'),
  body('githubUrl')
    .optional()
    .isURL()
    .withMessage('GitHub URL must be a valid URL'),
  body('featured')
    .optional()
    .isBoolean()
    .withMessage('Featured must be a boolean'),
  body('order')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Order must be a positive integer'),
];

/**
 * Skill validation rules
 */
export const skillValidationRules = [
  body('name')
    .isString()
    .withMessage('Name must be a string')
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  body('category').isString().withMessage('Category must be a string'),
  body('level')
    .isInt({ min: 1, max: 100 })
    .withMessage('Level must be an integer between 1 and 100'),
];

/**
 * Experience validation rules
 */
export const experienceValidationRules = [
  body('company')
    .isString()
    .withMessage('Company must be a string')
    .isLength({ min: 2, max: 100 })
    .withMessage('Company must be between 2 and 100 characters'),
  body('title')
    .isString()
    .withMessage('Title must be a string')
    .isLength({ min: 2, max: 100 })
    .withMessage('Title must be between 2 and 100 characters'),
  body('location')
    .optional()
    .isString()
    .withMessage('Location must be a string'),
  body('startDate')
    .isString()
    .withMessage('Start date must be a string')
    .matches(/^\d{4}-\d{2}-\d{2}$/)
    .withMessage('Start date must be in YYYY-MM-DD format'),
  body('endDate')
    .optional({ nullable: true })
    .isString()
    .withMessage('End date must be a string')
    .matches(/^\d{4}-\d{2}-\d{2}$/)
    .withMessage('End date must be in YYYY-MM-DD format'),
  body('current').isBoolean().withMessage('Current must be a boolean'),
  body('description').isString().withMessage('Description must be a string'),
];

/**
 * Service validation rules
 */
export const serviceValidationRules = [
  body('title')
    .isString()
    .withMessage('Title must be a string')
    .isLength({ min: 2, max: 100 })
    .withMessage('Title must be between 2 and 100 characters'),
  body('description').isString().withMessage('Description must be a string'),
  body('icon').isString().withMessage('Icon must be a string'),
  body('order')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Order must be a positive integer'),
];

// ID parameter validation
export const idParamValidation = [
  param('id').notEmpty().withMessage('ID parameter is required'),
];

export default {
  validateRequest,
  loginValidationRules,
  profileValidationRules,
  projectValidationRules,
  skillValidationRules,
  experienceValidationRules,
  serviceValidationRules,
  idParamValidation,
};

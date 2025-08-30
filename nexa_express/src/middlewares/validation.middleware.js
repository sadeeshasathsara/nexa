
export const handleValidationErrors = (req, res, next) => next();

export const validateDonorRegistration = [ (req, res, next) => next() ];
export const validateDonorLogin = [ (req, res, next) => next() ];
export const validateProfileUpdate = [ (req, res, next) => next() ];
export const validatePasswordChange = [ (req, res, next) => next() ];
export const validateForgotPassword = [ (req, res, next) => next() ];
export const validateResetPassword = [ (req, res, next) => next() ];

import { body, validationResult } from 'express-validator';

// Middleware to check for validation errors
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation errors',
      errors: errors.array().map(error => ({
        field: error.path,
        message: error.msg
      }))
    });
  }
  next();
};

// Validation rules for donor registration
export const validateDonorRegistration = [
  body('firstName')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('First name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('First name can only contain letters and spaces'),
  
  body('lastName')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Last name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Last name can only contain letters and spaces'),
  
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  
  body('phone')
    .optional()
    .matches(/^[\+]?[1-9][\d]{0,15}$/)
    .withMessage('Please provide a valid phone number'),
  
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
  
  body('dateOfBirth')
    .optional()
    .isISO8601()
    .withMessage('Please provide a valid date of birth'),
  
  body('gender')
    .optional()
    .isIn(['male', 'female', 'other', 'prefer-not-to-say'])
    .withMessage('Please select a valid gender option'),
  
  body('address.street')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Street address cannot exceed 100 characters'),
  
  body('address.city')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('City cannot exceed 50 characters'),
  
  body('address.state')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('State cannot exceed 50 characters'),
  
  body('address.country')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('Country cannot exceed 50 characters'),
  
  body('address.zipCode')
    .optional()
    .trim()
    .isLength({ max: 20 })
    .withMessage('Zip code cannot exceed 20 characters'),
  
  body('preferredCauses')
    .optional()
    .isArray()
    .withMessage('Preferred causes must be an array'),
  
  body('preferredCauses.*')
    .optional()
    .isIn(['education', 'healthcare', 'poverty', 'environment', 'arts', 'sports', 'technology', 'other'])
    .withMessage('Please select valid preferred causes'),
  
  body('donationFrequency')
    .optional()
    .isIn(['one-time', 'monthly', 'quarterly', 'yearly'])
    .withMessage('Please select a valid donation frequency'),
  
  body('preferredCurrency')
    .optional()
    .isIn(['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY', 'INR', 'LKR'])
    .withMessage('Please select a valid currency'),
  
  handleValidationErrors
];

// Validation rules for donor login
export const validateDonorLogin = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  
  handleValidationErrors
];

// Validation rules for profile update
export const validateProfileUpdate = [
  body('firstName')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('First name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('First name can only contain letters and spaces'),
  
  body('lastName')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Last name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Last name can only contain letters and spaces'),
  
  body('phone')
    .optional()
    .matches(/^[\+]?[1-9][\d]{0,15}$/)
    .withMessage('Please provide a valid phone number'),
  
  body('dateOfBirth')
    .optional()
    .isISO8601()
    .withMessage('Please provide a valid date of birth'),
  
  body('gender')
    .optional()
    .isIn(['male', 'female', 'other', 'prefer-not-to-say'])
    .withMessage('Please select a valid gender option'),
  
  body('address.street')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Street address cannot exceed 100 characters'),
  
  body('address.city')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('City cannot exceed 50 characters'),
  
  body('address.state')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('State cannot exceed 50 characters'),
  
  body('address.country')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('Country cannot exceed 50 characters'),
  
  body('address.zipCode')
    .optional()
    .trim()
    .isLength({ max: 20 })
    .withMessage('Zip code cannot exceed 20 characters'),
  
  body('preferredCauses')
    .optional()
    .isArray()
    .withMessage('Preferred causes must be an array'),
  
  body('preferredCauses.*')
    .optional()
    .isIn(['education', 'healthcare', 'poverty', 'environment', 'arts', 'sports', 'technology', 'other'])
    .withMessage('Please select valid preferred causes'),
  
  body('donationFrequency')
    .optional()
    .isIn(['one-time', 'monthly', 'quarterly', 'yearly'])
    .withMessage('Please select a valid donation frequency'),
  
  body('preferredCurrency')
    .optional()
    .isIn(['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY', 'INR', 'LKR'])
    .withMessage('Please select a valid currency'),
  
  handleValidationErrors
];

// Validation rules for password change
export const validatePasswordChange = [
  body('currentPassword')
    .notEmpty()
    .withMessage('Current password is required'),
  
  body('newPassword')
    .isLength({ min: 8 })
    .withMessage('New password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('New password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
  
  handleValidationErrors
];

// Validation rules for forgot password
export const validateForgotPassword = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  
  handleValidationErrors
];

// Validation rules for reset password
export const validateResetPassword = [
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
  
  handleValidationErrors
];


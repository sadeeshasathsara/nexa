// Minimal validators to unblock server. Replace with express-validator later.

export const handleValidationErrors = (req, res, next) => next();

export const validateDonorRegistration = [ (req, res, next) => next() ];
export const validateDonorLogin = [ (req, res, next) => next() ];
export const validateProfileUpdate = [ (req, res, next) => next() ];
export const validatePasswordChange = [ (req, res, next) => next() ];
export const validateForgotPassword = [ (req, res, next) => next() ];
export const validateResetPassword = [ (req, res, next) => next() ];




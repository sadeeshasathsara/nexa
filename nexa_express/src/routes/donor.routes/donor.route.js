import express from 'express';
import {
  registerDonor,
  loginDonor,
  getDonorProfile,
  updateDonorProfile,
  changePassword,
  getDonorDonations,
  getDonorStatistics,
  forgotPassword,
  resetPassword,
  deleteDonorAccount
} from '../../controllers/donor.controllers/donor.controller.js';
import { protect } from '../../middlewares/donor.middlewares/auth.middleware.js';
import ensureDonorDbConnected from '../../config/donor.config/donor.database.js';
import {
  validateDonorRegistration,
  validateDonorLogin,
  validateProfileUpdate,
  validatePasswordChange,
  validateForgotPassword,
  validateResetPassword
} from '../../middlewares/donor.middlewares/validation.middleware.js';
import payHereRoutes from './payhere.route.js';

const router = express.Router();

// Ensure DB connection for donor routes only
router.use(async (req, res, next) => {
  try {
    await ensureDonorDbConnected();
    next();
  } catch (err) {
    console.error('Donor DB connection error:', err);
    res.status(500).json({ success: false, message: 'Database connection error' });
  }
});

// Public routes
router.post('/register', validateDonorRegistration, registerDonor);
router.post('/login', validateDonorLogin, loginDonor);
router.post('/forgot-password', validateForgotPassword, forgotPassword);
router.put('/reset-password/:token', validateResetPassword, resetPassword);

// PayHere payment routes (public - no authentication required for notifications)
router.use('/payhere', payHereRoutes);

// Protected routes
router.use(protect); // Apply protection to all routes below
router.get('/profile', getDonorProfile);
router.put('/profile', validateProfileUpdate, updateDonorProfile);
router.put('/change-password', validatePasswordChange, changePassword);
router.get('/donations', getDonorDonations);
router.get('/statistics', getDonorStatistics);
router.delete('/account', deleteDonorAccount);

export default router;
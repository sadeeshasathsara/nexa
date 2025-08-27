import express from 'express';
import AdminRoutes from '../admin.routes/admin.route.js'
import DonorRoutes from '../donor.routes/donor.route.js'
import InstuitutionRoutes from '../institution.routes/institution.route.js'
import StudentRoutes from '../student.routes/student.route.js'
import TutorRoutes from '../tutor.routes/tutor.route.js'
import { verifyCaptcha } from '../../middlewares/global.middlewares/captcha.middleware.js';
import { otpController, validateOtpController } from '../../controllers/global.controllers/otp.controllers/otp.controller.js';
import otpLimiter from '../../middlewares/global.middlewares/otpLimiter.middleware.js';
import { createAccountController } from '../../controllers/global.controllers/account.controllers/account.controller.js';

const router = express.Router();

router.use('/v1/admin', AdminRoutes);
router.use('/v1/donor', DonorRoutes);
router.use('/v1/institution', InstuitutionRoutes);
router.use('/v1/student', StudentRoutes);
router.use('/v1/tutor', TutorRoutes);

router.use('/v1/otp', verifyCaptcha, otpLimiter, otpController);
router.use('/v1/otp-validate', validateOtpController);

router.use('/v1/register', createAccountController);

export default router;
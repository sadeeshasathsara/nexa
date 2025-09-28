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
import { loginController } from '../../controllers/global.controllers/login.controllers/login.controller.js';
import { checkAuth, checkRoleAccess } from '../../middlewares/global.middlewares/checkAuth.middleware.js';
import { resetPasswordController } from '../../controllers/global.controllers/login.controllers/resetPassword.controller.js';
import { postAdminLogin } from '../../controllers/admin.controllers/admin.auth.controller.js';
import { requireFields } from '../../middlewares/admin.middlewares/validate.middleware.js';

const router = express.Router();

router.use('/v1/admin', AdminRoutes);
router.use('/v1/donor', checkAuth, checkRoleAccess, DonorRoutes);
router.use('/v1/institution', checkAuth, checkRoleAccess, InstuitutionRoutes);
router.use('/v1/student', checkAuth, checkRoleAccess, StudentRoutes);
router.use('/v1/tutor', checkAuth, checkRoleAccess, TutorRoutes);

router.use('/v1/otp', verifyCaptcha, otpLimiter, otpController);
router.use('/v1/otp-validate', validateOtpController);

router.use('/v1/register', createAccountController);
router.use('/v1/login', loginController);
router.use('/v1/reset-password', resetPasswordController);

router.post("/v2/admin/login", requireFields(["email", "password"]), postAdminLogin);

router.use('/v1/auth', checkAuth, (req, res) => {
    return res.status(200).json({ success: true, message: "Authenticated", data: req.user.role })
});

export default router;
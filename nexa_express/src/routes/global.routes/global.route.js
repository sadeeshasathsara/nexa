import express from 'express';
import AdminRoutes from '../admin.routes/admin.route.js'
import DonorRoutes from '../donor.routes/donor.route.js'
import InstuitutionRoutes from '../institution.routes/institution.route.js'
import StudentRoutes from '../student.routes/student.route.js'
import TutorRoutes from '../tutor.routes/tutor.route.js'

const router = express.Router();

router.use('/v1/admin', AdminRoutes);
router.use('/v1/donor', DonorRoutes);
router.use('/v1/institution', InstuitutionRoutes);
router.use('/v1/student', StudentRoutes);
router.use('/v1/tutor', TutorRoutes);

export default router;
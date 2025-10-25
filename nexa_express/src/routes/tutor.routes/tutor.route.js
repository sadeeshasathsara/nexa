import express from 'express';
import courseRoutes from './course.route.js';
import profileRoutes from './profile.route.js';
import lessonRoutes from './lesson.routes.js';
import quizRoutes from './quiz.route.js';

const router = express.Router();

// CRITICAL FIX: Defining the full path explicitly to bypass the assumed missing 
// route mounting in your main server file. This allows the client request to 
// '/v1/tutor/profile' to match if this router is mounted at the root.



// router.get('/courses', getTutorCoursesController);
router.use('/course', courseRoutes);
router.use('/profile', profileRoutes);
router.use('/lessons', lessonRoutes);
router.use('/quizzes', quizRoutes);

export default router;

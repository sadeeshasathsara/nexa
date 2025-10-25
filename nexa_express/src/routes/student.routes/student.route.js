// routes/studentRoutes.js
import express from 'express';
import {
    getStudentDashboard,
    enrollInCourse,
    getCourseView,
    getLessonContent,
    markLessonComplete,
    getQuiz,
    submitQuiz,
    getCourseMaterials
} from '../../controllers/student.controllers/student.controller.js';

const router = express.Router();

// Student dashboard
router.get('/dashboard', getStudentDashboard);

// Course enrollment
router.post('/enroll', enrollInCourse);

// Course viewing
router.get('/course/:courseId', getCourseView);
router.get('/course/:courseId/lesson/:lessonId', getLessonContent);
router.post('/lesson/complete', markLessonComplete);

// Quiz
router.get('/course/:courseId/lesson/:lessonId/quiz', getQuiz);
router.post('/quiz/submit', submitQuiz);

// Materials
router.get('/course/:courseId/materials', getCourseMaterials);

export default router;
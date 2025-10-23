import express from 'express';
import {
    createOrUpdateQuiz,
    getQuiz,
    deleteQuiz,
    publishQuiz
} from '../../controllers/tutor.controllers/quiz.controller.js';

const router = express.Router();

// Create or update quiz for a lesson
router.post('/course/:courseId/lesson/:lessonId', createOrUpdateQuiz);

// Get quiz for a lesson
router.get('/course/:courseId/lesson/:lessonId', getQuiz);

// Delete quiz from a lesson
router.delete('/course/:courseId/lesson/:lessonId', deleteQuiz);

// Publish/unpublish quiz
router.patch('/course/:courseId/lesson/:lessonId/publish', publishQuiz);

export default router;
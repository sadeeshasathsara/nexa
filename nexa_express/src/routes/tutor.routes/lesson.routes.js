import express from 'express';
import {
    createLesson,
    getCourseLessons,
    getLessonById,
    updateLesson,
    deleteLesson
} from '../../controllers/tutor.controllers/lesson.controller.js';
import { handleLessonFilesUpload } from '../../middlewares/tutor.middlewares/lessonUpload.middleware.js';

const router = express.Router();

// Create new lesson
router.post('/', handleLessonFilesUpload, createLesson);

// Get all lessons for a course
router.get('/course/:courseId', getCourseLessons);

// Get single lesson (now requires courseId)
router.get('/course/:courseId/lesson/:lessonId', getLessonById);

// Update lesson (now requires courseId)
router.put('/course/:courseId/lesson/:lessonId', handleLessonFilesUpload, updateLesson);

// Delete lesson (now requires courseId)
router.delete('/course/:courseId/lesson/:lessonId', deleteLesson);

export default router;
import express from 'express';
import {
    createCourse,
    getTutorCourses,
    getCourseById,
    updateCourse,
    deleteCourse
} from '../../controllers/tutor.controllers/course.controller.js';
import { handleCourseImageUpload } from '../../middlewares/tutor.middlewares/fileUpload.middleware.js';

const router = express.Router();

// Create new course
router.post('/', handleCourseImageUpload, createCourse);

// Get all tutor courses
router.get('/', getTutorCourses);

// Get single course
router.get('/:courseId', getCourseById);

// Update course
router.put('/:courseId', handleCourseImageUpload, updateCourse);

// Delete course
router.delete('/:courseId', deleteCourse);

export default router;
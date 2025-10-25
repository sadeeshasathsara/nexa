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

import { chatController } from '../../controllers/student.controllers/chat.controller.js';

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






// Get user's courses (student gets enrolled courses, tutor gets their courses)
router.get('/chat/courses', chatController.getStudentCourses);
router.get('/chat/tutor/courses', chatController.getTutorCourses);

// Get chat list for a specific course
router.get('/chat/courses/:courseId/chats', chatController.getCourseChats);

// Get messages between two users in a course
router.get('/chat/courses/:courseId/messages/:otherUserId', chatController.getMessages);

// Send a message
router.post('/chat/messages', chatController.sendMessage);

// Mark messages as read
router.patch('/chat/messages/read', chatController.markAsRead);

// Get total unread message count
router.get('/chat/unread-count', chatController.getUnreadCount);


export default router;
import Course from '../../models/tutor.models/course.model.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createLesson = async (req, res) => {
    try {
        console.log("=== CREATE LESSON REQUEST ===");
        console.log("Request body:", req.body);
        console.log("Request files:", req.files);

        const { courseId, title, description, orderIndex } = req.body;
        const tutorId = req.user._id;

        if (!courseId || !title) {
            return res.status(400).json({
                success: false,
                message: 'Course ID and title are required'
            });
        }

        // Verify course exists and belongs to tutor
        const course = await Course.findOne({ _id: courseId, tutorId, isActive: true });
        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }

        // Get the next order index if not provided
        const lessonOrderIndex = orderIndex || course.lessons.length;

        let videoUrl = '';
        let materialPdfUrl = '';

        // Handle file uploads
        if (req.files) {
            console.log("Processing uploaded files...");
            if (req.files.video) {
                videoUrl = `/uploads/lessons/videos/${req.files.video[0].filename}`;
                console.log("Video URL set to:", videoUrl);
            }
            if (req.files.material) {
                materialPdfUrl = `/uploads/lessons/materials/${req.files.material[0].filename}`;
                console.log("Material URL set to:", materialPdfUrl);
            }
        }

        // Create new lesson object
        const newLesson = {
            _id: new mongoose.Types.ObjectId(),
            title,
            description: description || '',
            videoUrl,
            materialPdfUrl,
            orderIndex: lessonOrderIndex,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        console.log("Adding lesson to course...");

        // Add lesson to course's lessons array
        course.lessons.push(newLesson);
        await course.save();

        console.log("Lesson added successfully to course:", newLesson._id);

        // Prepare response data
        const responseData = {
            success: true,
            message: 'Lesson created successfully',
            data: {
                lesson: {
                    id: newLesson._id,
                    title: newLesson.title,
                    description: newLesson.description,
                    videoUrl: newLesson.videoUrl ? `${process.env.SERVER_URL || 'http://localhost:5000'}${newLesson.videoUrl}` : '',
                    materialPdfUrl: newLesson.materialPdfUrl ? `${process.env.SERVER_URL || 'http://localhost:5000'}${newLesson.materialPdfUrl}` : '',
                    orderIndex: newLesson.orderIndex,
                    createdAt: newLesson.createdAt
                }
            }
        };

        console.log("Sending response:", responseData);
        res.status(201).json(responseData);

    } catch (error) {
        console.error('=== ERROR CREATING LESSON ===');
        console.error('Error:', error);
        console.error('Error stack:', error.stack);

        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

export const getCourseLessons = async (req, res) => {
    try {
        const { courseId } = req.params;
        const tutorId = req.user._id;

        // Verify course exists and belongs to tutor
        const course = await Course.findOne({ _id: courseId, tutorId, isActive: true });
        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }

        // Get lessons from the embedded array
        const lessons = course.lessons.map(lesson => ({
            id: lesson._id,
            title: lesson.title,
            description: lesson.description,
            videoUrl: lesson.videoUrl ? `${process.env.SERVER_URL || 'http://localhost:5000'}${lesson.videoUrl}` : '',
            materialPdfUrl: lesson.materialPdfUrl ? `${process.env.SERVER_URL || 'http://localhost:5000'}${lesson.materialPdfUrl}` : '',
            orderIndex: lesson.orderIndex,
            createdAt: lesson.createdAt
        }));

        // Sort by orderIndex
        lessons.sort((a, b) => a.orderIndex - b.orderIndex);

        res.json({
            success: true,
            data: {
                lessons: lessons
            }
        });
    } catch (error) {
        console.error('Error fetching lessons:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

export const getLessonById = async (req, res) => {
    try {
        const { courseId, lessonId } = req.params;
        const tutorId = req.user._id;

        const course = await Course.findOne({
            _id: courseId,
            tutorId,
            isActive: true
        });

        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }

        // Find the lesson in the embedded array
        const lesson = course.lessons.id(lessonId);

        if (!lesson) {
            return res.status(404).json({
                success: false,
                message: 'Lesson not found'
            });
        }

        res.json({
            success: true,
            data: {
                lesson: {
                    id: lesson._id,
                    title: lesson.title,
                    description: lesson.description,
                    videoUrl: lesson.videoUrl ? `${process.env.SERVER_URL || 'http://localhost:5000'}${lesson.videoUrl}` : '',
                    materialPdfUrl: lesson.materialPdfUrl ? `${process.env.SERVER_URL || 'http://localhost:5000'}${lesson.materialPdfUrl}` : '',
                    orderIndex: lesson.orderIndex,
                    createdAt: lesson.createdAt
                }
            }
        });
    } catch (error) {
        console.error('Error fetching lesson:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

export const updateLesson = async (req, res) => {
    try {
        const { courseId, lessonId } = req.params;
        const tutorId = req.user._id;
        const { title, description, orderIndex } = req.body;

        const course = await Course.findOne({
            _id: courseId,
            tutorId,
            isActive: true
        });

        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }

        // Find the lesson in the embedded array
        const lesson = course.lessons.id(lessonId);

        if (!lesson) {
            return res.status(404).json({
                success: false,
                message: 'Lesson not found'
            });
        }

        // Update fields
        if (title) lesson.title = title;
        if (description !== undefined) lesson.description = description;
        if (orderIndex !== undefined) lesson.orderIndex = orderIndex;
        lesson.updatedAt = new Date();

        // Handle file uploads
        if (req.files) {
            if (req.files.video) {
                // Delete old video if exists
                if (lesson.videoUrl) {
                    const oldVideoPath = path.join(__dirname, '../../../../', lesson.videoUrl);
                    if (fs.existsSync(oldVideoPath)) {
                        fs.unlinkSync(oldVideoPath);
                    }
                }
                lesson.videoUrl = `/uploads/lessons/videos/${req.files.video[0].filename}`;
            }

            if (req.files.material) {
                // Delete old material if exists
                if (lesson.materialPdfUrl) {
                    const oldMaterialPath = path.join(__dirname, '../../../../', lesson.materialPdfUrl);
                    if (fs.existsSync(oldMaterialPath)) {
                        fs.unlinkSync(oldMaterialPath);
                    }
                }
                lesson.materialPdfUrl = `/uploads/lessons/materials/${req.files.material[0].filename}`;
            }
        }

        await course.save();

        res.json({
            success: true,
            message: 'Lesson updated successfully',
            data: {
                lesson: {
                    id: lesson._id,
                    title: lesson.title,
                    description: lesson.description,
                    videoUrl: lesson.videoUrl ? `${process.env.SERVER_URL || 'http://localhost:5000'}${lesson.videoUrl}` : '',
                    materialPdfUrl: lesson.materialPdfUrl ? `${process.env.SERVER_URL || 'http://localhost:5000'}${lesson.materialPdfUrl}` : '',
                    orderIndex: lesson.orderIndex,
                    createdAt: lesson.createdAt
                }
            }
        });
    } catch (error) {
        console.error('Error updating lesson:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

export const deleteLesson = async (req, res) => {
    try {
        const { courseId, lessonId } = req.params;
        const tutorId = req.user._id;

        const course = await Course.findOne({
            _id: courseId,
            tutorId,
            isActive: true
        });

        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }

        // Find the lesson in the embedded array
        const lesson = course.lessons.id(lessonId);

        if (!lesson) {
            return res.status(404).json({
                success: false,
                message: 'Lesson not found'
            });
        }

        // Delete files if they exist
        if (lesson.videoUrl) {
            const videoPath = path.join(__dirname, '../../../../', lesson.videoUrl);
            if (fs.existsSync(videoPath)) {
                fs.unlinkSync(videoPath);
            }
        }

        if (lesson.materialPdfUrl) {
            const materialPath = path.join(__dirname, '../../../../', lesson.materialPdfUrl);
            if (fs.existsSync(materialPath)) {
                fs.unlinkSync(materialPath);
            }
        }

        // Remove lesson from array
        course.lessons.pull(lessonId);
        await course.save();

        res.json({
            success: true,
            message: 'Lesson deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting lesson:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};
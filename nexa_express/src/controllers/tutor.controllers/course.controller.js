import Course from '../../models/tutor.models/course.model.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createCourse = async (req, res) => {
    try {
        const { title, description, category = '' } = req.body;
        const tutorId = req.user._id;

        if (!title || !description) {
            return res.status(400).json({
                success: false,
                message: 'Title and description are required'
            });
        }

        let thumbnailUrl = '';
        if (req.file) {
            thumbnailUrl = `/uploads/courses/${req.file.filename}`;
        }

        const newCourse = new Course({
            tutorId,
            title,
            description,
            thumbnailUrl,
            category,
            lessons: [],
            enrolledStudents: []
        });

        await newCourse.save();

        res.status(201).json({
            success: true,
            message: 'Course created successfully',
            data: {
                course: {
                    id: newCourse._id,
                    title: newCourse.title,
                    description: newCourse.description,
                    image: newCourse.thumbnailUrl,
                    lessons: newCourse.lessonsCount,
                    enrolledStudents: newCourse.enrolledStudentsCount,
                    status: newCourse.status,
                    category: newCourse.category,
                    createdAt: newCourse.createdAt
                }
            }
        });
    } catch (error) {
        console.error('Error creating course:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

export const getTutorCourses = async (req, res) => {
    try {
        const tutorId = req.user._id;

        const courses = await Course.find({ tutorId, isActive: true })
            .sort({ createdAt: -1 })
            .select('title description thumbnailUrl status category lessons enrolledStudents createdAt');

        const formattedCourses = courses.map(course => ({
            id: course._id,
            title: course.title,
            description: course.description,
            image: course.thumbnailUrl || '/default-course-image.jpg',
            lessons: course.lessons.length,
            enrolledStudents: course.enrolledStudents.length,
            status: course.status,
            category: course.category,
            createdAt: course.createdAt
        }));

        res.json({
            success: true,
            data: {
                courses: formattedCourses
            }
        });
    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

export const getCourseById = async (req, res) => {
    try {
        const { courseId } = req.params;
        const tutorId = req.user._id;

        const course = await Course.findOne({ _id: courseId, tutorId, isActive: true });

        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }

        res.json({
            success: true,
            data: {
                course: {
                    id: course._id,
                    title: course.title,
                    description: course.description,
                    image: course.thumbnailUrl,
                    lessons: course.lessons.map(lesson => ({
                        id: lesson._id,
                        title: lesson.title,
                        description: lesson.description,
                        videoUrl: lesson.videoUrl,
                        materialPdfUrl: lesson.materialPdfUrl,
                        orderIndex: lesson.orderIndex,
                        duration: lesson.duration,
                        createdAt: lesson.createdAt
                    })),
                    enrolledStudents: course.enrolledStudents.length,
                    status: course.status,
                    category: course.category,
                    createdAt: course.createdAt
                }
            }
        });
    } catch (error) {
        console.error('Error fetching course:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

export const updateCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        const tutorId = req.user._id;
        const { title, description, category, status } = req.body;

        const course = await Course.findOne({ _id: courseId, tutorId, isActive: true });

        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }

        // Update fields
        if (title) course.title = title;
        if (description) course.description = description;
        if (category) course.category = category;
        if (status) course.status = status;

        // Handle image upload
        if (req.file) {
            // Delete old image if exists
            if (course.thumbnailUrl) {
                const oldImagePath = path.join(__dirname, '../../../', course.thumbnailUrl);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }
            course.thumbnailUrl = `/uploads/courses/${req.file.filename}`;
        }

        await course.save();

        res.json({
            success: true,
            message: 'Course updated successfully',
            data: {
                course: {
                    id: course._id,
                    title: course.title,
                    description: course.description,
                    image: course.thumbnailUrl,
                    lessons: course.lessonsCount,
                    enrolledStudents: course.enrolledStudentsCount,
                    status: course.status,
                    category: course.category,
                    createdAt: course.createdAt
                }
            }
        });
    } catch (error) {
        console.error('Error updating course:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

export const deleteCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        const tutorId = req.user._id;

        const course = await Course.findOne({ _id: courseId, tutorId, isActive: true });

        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }

        // Soft delete by setting isActive to false
        course.isActive = false;
        await course.save();

        // Optionally delete the image file
        if (course.thumbnailUrl) {
            const imagePath = path.join(__dirname, '../../../', course.thumbnailUrl);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        res.json({
            success: true,
            message: 'Course deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting course:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};
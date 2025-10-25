import Course from '../../models/tutor.models/course.model.js';

export const createOrUpdateQuiz = async (req, res) => {
    try {
        console.log("=== CREATE/UPDATE QUIZ REQUEST ===");
        console.log("Request params:", req.params);
        console.log("Request body:", req.body);

        const { courseId, lessonId } = req.params;
        const tutorId = req.user._id;
        const { questions, title = 'Quiz', description = '' } = req.body;

        // Verify course exists and belongs to tutor
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

        // Calculate total points
        const totalPoints = questions?.reduce((sum, question) => sum + (question.points || 1), 0) || 0;

        // Create or update quiz
        const quizData = {
            title,
            description,
            questions: questions || [],
            totalPoints,
            updatedAt: new Date()
        };

        if (!lesson.quiz) {
            quizData.createdAt = new Date();
        }

        lesson.quiz = quizData;
        lesson.updatedAt = new Date();

        await course.save();

        console.log("Quiz saved successfully for lesson:", lessonId);

        res.json({
            success: true,
            message: 'Quiz saved successfully',
            data: {
                quiz: lesson.quiz
            }
        });

    } catch (error) {
        console.error('=== ERROR SAVING QUIZ ===');
        console.error('Error:', error);
        console.error('Error stack:', error.stack);

        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

export const getQuiz = async (req, res) => {
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
                quiz: lesson.quiz || null
            }
        });
    } catch (error) {
        console.error('Error fetching quiz:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

export const deleteQuiz = async (req, res) => {
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

        // Remove quiz from lesson
        lesson.quiz = undefined;
        lesson.updatedAt = new Date();

        await course.save();

        res.json({
            success: true,
            message: 'Quiz deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting quiz:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

export const publishQuiz = async (req, res) => {
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

        if (!lesson.quiz) {
            return res.status(400).json({
                success: false,
                message: 'No quiz found for this lesson'
            });
        }

        // Toggle publish status
        lesson.quiz.isPublished = !lesson.quiz.isPublished;
        lesson.quiz.updatedAt = new Date();
        lesson.updatedAt = new Date();

        await course.save();

        res.json({
            success: true,
            message: lesson.quiz.isPublished ? 'Quiz published successfully' : 'Quiz unpublished successfully',
            data: {
                isPublished: lesson.quiz.isPublished
            }
        });
    } catch (error) {
        console.error('Error publishing quiz:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};
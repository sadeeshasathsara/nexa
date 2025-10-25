// controllers/student.controllers/student.controller.js
import Course from '../../models/tutor.models/course.model.js';
import StudentProgress from '../../models/student.models/studentProgress.model.js';
import QuizAttempt from '../../models/student.models/quizAttempt.model.js';

// Helper function to get tutor name
const getTutorName = (tutorId) => {
    const tutorNames = {
        '68f5a373d05d38eaf4f93980': 'Eric Dev',
    };

    return tutorNames[tutorId?.toString()] || 'Course Instructor';
};

// Get student dashboard
export const getStudentDashboard = async (req, res) => {
    try {
        console.log('🔍 Getting student dashboard for user:', req.user?._id);

        if (!req.user || !req.user._id) {
            return res.status(401).json({
                success: false,
                message: 'User not authenticated'
            });
        }

        const studentId = req.user._id;

        // Get enrolled courses with progress
        let enrolledCourses = [];
        try {
            enrolledCourses = await StudentProgress.find({ studentId })
                .populate('courseId')
                .sort({ lastAccessed: -1 });
        } catch (error) {
            console.log('No enrolled courses found:', error.message);
        }

        console.log('📚 Enrolled courses found:', enrolledCourses.length);

        // Get available courses (not enrolled)
        const enrolledCourseIds = enrolledCourses.map(ep => ep.courseId?._id).filter(Boolean);

        const availableCourses = await Course.find({
            _id: { $nin: enrolledCourseIds },
            status: 'published',
            isActive: true
        });

        console.log('🆕 Available courses found:', availableCourses.length);

        // Format enrolled courses for frontend
        const formattedEnrolledCourses = enrolledCourses.map(ep => {
            if (!ep.courseId) return null;

            const instructorName = getTutorName(ep.courseId.tutorId);

            return {
                id: ep.courseId._id?.toString() || '',
                title: ep.courseId.title || 'Untitled Course',
                description: ep.courseId.description || 'No description available',
                image: ep.courseId.thumbnailUrl
                    ? `http://localhost:5000${ep.courseId.thumbnailUrl}`
                    : 'https://via.placeholder.com/300x200/3498db/ffffff?text=Course+Image',
                totalLessons: ep.courseId.lessons?.length || 0,
                completedLessons: ep.completedLessons?.length || 0,
                instructor: instructorName,
                progress: ep.progress || 0,
                lastAccessed: ep.lastAccessed
            };
        }).filter(Boolean);

        // Format available courses for frontend
        const formattedAvailableCourses = availableCourses.map(course => {
            const totalDuration = course.lessons?.reduce((acc, lesson) => acc + (lesson.duration || 0), 0) || 0;
            const hours = Math.floor(totalDuration / 60);
            const minutes = totalDuration % 60;
            const durationDisplay = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;

            const imageUrl = course.thumbnailUrl
                ? `http://localhost:5000${course.thumbnailUrl}`
                : 'https://via.placeholder.com/300x200/3498db/ffffff?text=Course+Image';

            const coordinatorName = getTutorName(course.tutorId);

            return {
                id: course._id?.toString() || '',
                title: course.title || 'Untitled Course',
                description: course.description || 'No description available',
                image: imageUrl,
                duration: durationDisplay,
                coordinator: coordinatorName,
                rating: 4.5,
                reviews: Math.floor(Math.random() * 100) + 50,
                totalLessons: course.lessons?.length || 0
            };
        });

        console.log('✅ Sending response with:', {
            enrolled: formattedEnrolledCourses.length,
            available: formattedAvailableCourses.length
        });

        res.json({
            success: true,
            enrolledCourses: formattedEnrolledCourses,
            availableCourses: formattedAvailableCourses
        });

    } catch (error) {
        console.error('❌ Get student dashboard error:', error);

        res.status(500).json({
            success: false,
            message: 'Failed to load dashboard',
            enrolledCourses: [],
            availableCourses: []
        });
    }
};

// Enroll in course
export const enrollInCourse = async (req, res) => {
    try {
        const studentId = req.user._id;
        const { courseId } = req.body;

        console.log('🎯 Enrolling student:', studentId, 'in course:', courseId);

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }

        const existingProgress = await StudentProgress.findOne({
            studentId,
            courseId
        });

        if (existingProgress) {
            return res.status(400).json({
                success: false,
                message: 'Already enrolled in this course'
            });
        }

        const studentProgress = new StudentProgress({
            studentId,
            courseId,
            progress: 0,
            completedLessons: [],
            currentLesson: course.lessons[0]?._id || null
        });

        await studentProgress.save();

        console.log('✅ Student enrolled successfully');

        res.json({
            success: true,
            message: 'Successfully enrolled in course',
            progress: studentProgress
        });
    } catch (error) {
        console.error('Enroll course error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to enroll in course'
        });
    }
};

// Get course view
export const getCourseView = async (req, res) => {
    try {
        const studentId = req.user._id;
        const { courseId } = req.params;

        console.log('📖 Getting course view for:', { studentId, courseId });

        const course = await Course.findById(courseId).lean();
        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }

        const studentProgress = await StudentProgress.findOne({
            studentId,
            courseId
        }).lean();

        if (!studentProgress) {
            return res.status(403).json({
                success: false,
                message: 'Not enrolled in this course'
            });
        }

        studentProgress.lastAccessed = new Date();
        await StudentProgress.updateOne(
            { _id: studentProgress._id },
            { $set: { lastAccessed: new Date() } }
        );

        const formattedLessons = (course.lessons || []).map(lesson => {
            const completedLesson = (studentProgress.completedLessons || []).find(
                cl => cl.lessonId.toString() === lesson._id.toString()
            );

            return {
                id: lesson._id,
                title: lesson.title,
                duration: `${lesson.duration || 0}:00`,
                isCompleted: !!completedLesson,
                videoUrl: lesson.videoUrl ? `http://localhost:5000${lesson.videoUrl}` : '',
                hasQuiz: !!lesson.quiz && lesson.quiz.questions.length > 0,
                hasMaterial: !!lesson.materialPdfUrl,
                orderIndex: lesson.orderIndex || 0
            };
        }).sort((a, b) => a.orderIndex - b.orderIndex);

        const courseData = {
            id: course._id,
            title: course.title,
            description: course.description,
            instructor: getTutorName(course.tutorId),
            totalLessons: course.lessons?.length || 0,
            completedLessons: studentProgress.completedLessons?.length || 0,
            progress: studentProgress.progress || 0,
            lessons: formattedLessons
        };

        res.json({
            success: true,
            course: courseData
        });
    } catch (error) {
        console.error('Get course view error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to load course'
        });
    }
};

// Get lesson content
export const getLessonContent = async (req, res) => {
    try {
        const studentId = req.user._id;
        const { courseId, lessonId } = req.params;

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }

        const lesson = course.lessons.id(lessonId);
        if (!lesson) {
            return res.status(404).json({
                success: false,
                message: 'Lesson not found'
            });
        }

        const studentProgress = await StudentProgress.findOne({
            studentId,
            courseId
        });

        if (!studentProgress) {
            return res.status(403).json({
                success: false,
                message: 'Not enrolled in this course'
            });
        }

        studentProgress.currentLesson = lessonId;
        await studentProgress.save();

        const lessonData = {
            id: lesson._id,
            title: lesson.title,
            duration: `${lesson.duration || 0}:00`,
            videoUrl: lesson.videoUrl ? `http://localhost:5000${lesson.videoUrl}` : '',
            hasQuiz: !!lesson.quiz && lesson.quiz.questions.length > 0,
            hasMaterial: !!lesson.materialPdfUrl,
            materialPdfUrl: lesson.materialPdfUrl ? `http://localhost:5000${lesson.materialPdfUrl}` : '',
            materials: lesson.materialPdfUrl ? [
                {
                    id: 1,
                    name: 'Lesson Materials.pdf',
                    type: 'pdf',
                    size: '2.5 MB',
                    url: `http://localhost:5000${lesson.materialPdfUrl}`
                }
            ] : []
        };

        res.json({
            success: true,
            lesson: lessonData
        });
    } catch (error) {
        console.error('Get lesson content error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to load lesson'
        });
    }
};

// Mark lesson as complete
export const markLessonComplete = async (req, res) => {
    try {
        const studentId = req.user._id;
        const { courseId, lessonId } = req.body;

        const studentProgress = await StudentProgress.findOne({
            studentId,
            courseId
        });

        if (!studentProgress) {
            return res.status(404).json({
                success: false,
                message: 'Progress not found'
            });
        }

        const alreadyCompleted = studentProgress.completedLessons.some(
            cl => cl.lessonId.toString() === lessonId
        );

        if (!alreadyCompleted) {
            studentProgress.completedLessons.push({
                lessonId,
                completedAt: new Date()
            });

            const course = await Course.findById(courseId);
            const totalLessons = course.lessons.length;
            studentProgress.progress = Math.round(
                (studentProgress.completedLessons.length / totalLessons) * 100
            );

            await studentProgress.save();
        }

        res.json({
            success: true,
            message: 'Lesson marked as complete',
            progress: studentProgress
        });
    } catch (error) {
        console.error('Mark lesson complete error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to mark lesson as complete'
        });
    }
};

// Get quiz
export const getQuiz = async (req, res) => {
    try {
        const studentId = req.user._id;
        const { courseId, lessonId } = req.params;

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }

        const lesson = course.lessons.id(lessonId);
        if (!lesson || !lesson.quiz) {
            return res.status(404).json({
                success: false,
                message: 'Quiz not found'
            });
        }

        const studentProgress = await StudentProgress.findOne({
            studentId,
            courseId
        });

        if (!studentProgress) {
            return res.status(403).json({
                success: false,
                message: 'Not enrolled in this course'
            });
        }

        const quizData = {
            title: lesson.quiz.title || 'Lesson Quiz',
            description: lesson.quiz.description || 'Test your understanding of the lesson',
            timeLimit: lesson.quiz.timeLimit || 600,
            passingScore: lesson.quiz.passingScore || 70,
            questions: lesson.quiz.questions.map((q, index) => ({
                id: q._id,
                question: q.questionText,
                options: q.options.map(opt => opt.text),
                correctAnswer: q.options.findIndex(opt => opt.isCorrect)
            }))
        };

        res.json({
            success: true,
            quiz: quizData
        });
    } catch (error) {
        console.error('Get quiz error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to load quiz'
        });
    }
};

// Submit quiz
export const submitQuiz = async (req, res) => {
    try {
        const studentId = req.user._id;
        const { courseId, lessonId, answers, timeSpent } = req.body;

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }

        const lesson = course.lessons.id(lessonId);
        if (!lesson || !lesson.quiz) {
            return res.status(404).json({
                success: false,
                message: 'Quiz not found'
            });
        }

        let totalScore = 0;
        let maxScore = lesson.quiz.questions.length;
        const detailedAnswers = [];

        lesson.quiz.questions.forEach(question => {
            const userAnswer = answers[question._id];
            const isCorrect = userAnswer === question.options.findIndex(opt => opt.isCorrect);
            const points = isCorrect ? question.points || 1 : 0;

            totalScore += points;

            detailedAnswers.push({
                questionId: question._id,
                selectedOption: userAnswer,
                isCorrect,
                points
            });
        });

        const percentage = Math.round((totalScore / maxScore) * 100);
        const passed = percentage >= (lesson.quiz.passingScore || 70);

        const quizAttempt = new QuizAttempt({
            studentId,
            courseId,
            lessonId,
            quizId: lesson.quiz._id,
            answers: detailedAnswers,
            totalScore,
            maxScore,
            percentage,
            passed,
            timeSpent
        });

        await quizAttempt.save();

        if (passed) {
            const studentProgress = await StudentProgress.findOne({
                studentId,
                courseId
            });

            if (studentProgress) {
                const alreadyCompleted = studentProgress.completedLessons.some(
                    cl => cl.lessonId.toString() === lessonId
                );

                if (!alreadyCompleted) {
                    studentProgress.completedLessons.push({
                        lessonId,
                        completedAt: new Date(),
                        quizScore: percentage
                    });

                    const totalLessons = course.lessons.length;
                    studentProgress.progress = Math.round(
                        (studentProgress.completedLessons.length / totalLessons) * 100
                    );

                    await studentProgress.save();
                }
            }
        }

        res.json({
            success: true,
            score: {
                correct: totalScore,
                total: maxScore,
                percentage,
                passed
            },
            answers: detailedAnswers
        });
    } catch (error) {
        console.error('Submit quiz error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to submit quiz'
        });
    }
};

// Get course materials
export const getCourseMaterials = async (req, res) => {
    try {
        const studentId = req.user._id;
        const { courseId } = req.params;

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }

        const studentProgress = await StudentProgress.findOne({
            studentId,
            courseId
        });

        if (!studentProgress) {
            return res.status(403).json({
                success: false,
                message: 'Not enrolled in this course'
            });
        }

        const materials = course.lessons
            .filter(lesson => lesson.materialPdfUrl)
            .map((lesson, index) => ({
                id: lesson._id,
                name: `${lesson.title} Materials.pdf`,
                type: 'pdf',
                size: '2.5 MB',
                url: `http://localhost:5000${lesson.materialPdfUrl}`,
                lessonTitle: lesson.title
            }));

        res.json({
            success: true,
            materials
        });
    } catch (error) {
        console.error('Get course materials error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to load course materials'
        });
    }
};

export default {
    getStudentDashboard,
    enrollInCourse,
    getCourseView,
    getLessonContent,
    markLessonComplete,
    getQuiz,
    submitQuiz,
    getCourseMaterials
};
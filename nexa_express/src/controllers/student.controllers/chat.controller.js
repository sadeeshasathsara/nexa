// controllers/chatController.js - FINAL FIXED VERSION
import Message from '../../models/global.models/massage.js';
import Course from '../../models/tutor.models/course.model.js';
import StudentProgress from '../../models/student.models/studentProgress.model.js';

export const chatController = {
    // Get all enrolled courses with chat info for a student
    async getStudentCourses(req, res) {
        try {
            console.log('=== getStudentCourses START ===');
            const studentId = req.user._id;
            console.log('Student ID:', studentId);

            // Step 1: Find student progress records
            console.log('Step 1: Finding student progress...');
            const studentProgress = await StudentProgress.find({
                studentId: studentId
            });
            console.log('Raw student progress found:', studentProgress.length);

            if (studentProgress.length === 0) {
                console.log('No student progress records found');
                return res.json({
                    success: true,
                    courses: []
                });
            }

            // Step 2: Extract course IDs
            const courseIds = studentProgress.map(sp => sp.courseId);
            console.log('Course IDs to fetch:', courseIds);

            // Step 3: Fetch courses with tutor info
            console.log('Step 2: Fetching courses...');
            const courses = await Course.find({
                _id: { $in: courseIds }
            }).populate('tutorId', 'name email avatar');

            console.log('Courses found:', courses.length);

            // Step 4: Get unread counts
            console.log('Step 3: Getting unread counts...');
            const coursesWithUnread = await Promise.all(
                courses.map(async (course) => {
                    const unreadCount = await Message.countDocuments({
                        courseId: course._id,
                        receiverId: studentId,
                        isRead: false
                    });

                    return {
                        id: course._id,
                        name: course.title,
                        tutor: course.tutorId?.name || 'Tutor',
                        tutorId: course.tutorId?._id,
                        category: course.category || 'General',
                        thumbnailUrl: course.thumbnailUrl || '',
                        unreadCount
                    };
                })
            );

            console.log('Final courses with unread:', coursesWithUnread.length);
            console.log('=== getStudentCourses END - SUCCESS ===');

            res.json({
                success: true,
                courses: coursesWithUnread
            });

        } catch (error) {
            console.error('=== ERROR in getStudentCourses ===');
            console.error('Error message:', error.message);
            console.error('Error stack:', error.stack);

            res.status(500).json({
                success: false,
                message: 'Failed to fetch courses',
                error: error.message
            });
        }
    },

    // Get all courses taught by tutor with chat info
    async getTutorCourses(req, res) {
        try {
            const tutorId = req.user._id;

            const courses = await Course.find({
                tutorId
            }).select('title category thumbnailUrl');

            // Get total unread messages for each course
            const coursesWithUnread = await Promise.all(
                courses.map(async (course) => {
                    const unreadCount = await Message.countDocuments({
                        courseId: course._id,
                        receiverId: tutorId,
                        isRead: false
                    });

                    // Get enrolled students count from StudentProgress
                    const enrolledCount = await StudentProgress.countDocuments({
                        courseId: course._id
                    });

                    return {
                        id: course._id,
                        name: course.title,
                        category: course.category || 'General',
                        thumbnailUrl: course.thumbnailUrl || '',
                        enrolledStudentsCount: enrolledCount,
                        unreadCount
                    };
                })
            );

            res.json({
                success: true,
                courses: coursesWithUnread
            });
        } catch (error) {
            console.error('Error fetching tutor courses:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to fetch courses'
            });
        }
    },

    // Get chat list for a specific course
    async getCourseChats(req, res) {
        try {
            const { courseId } = req.params;
            const userId = req.user._id;
            const userRole = req.user.role;

            console.log('Fetching chats for course:', courseId, 'User role:', userRole);

            // Verify access to course
            const course = await Course.findById(courseId).populate('tutorId', 'name email avatar');

            if (!course) {
                return res.status(404).json({
                    success: false,
                    message: 'Course not found'
                });
            }

            // Check if user has access to this course
            let hasAccess = false;

            if (userRole === 'tutor') {
                hasAccess = course.tutorId._id.toString() === userId.toString();
            } else {
                const studentProgress = await StudentProgress.findOne({
                    studentId: userId,
                    courseId: courseId
                });
                hasAccess = !!studentProgress;
            }

            if (!hasAccess) {
                return res.status(403).json({
                    success: false,
                    message: 'You do not have access to this course'
                });
            }

            let chats = [];

            if (userRole === 'student') {
                // Student sees only the tutor
                const tutor = course.tutorId;

                // Get last message
                const lastMessage = await Message.findOne({
                    courseId,
                    $or: [
                        { senderId: userId, receiverId: tutor._id },
                        { senderId: tutor._id, receiverId: userId }
                    ]
                }).sort({ createdAt: -1 });

                // Get unread count
                const unreadCount = await Message.countDocuments({
                    courseId,
                    senderId: tutor._id,
                    receiverId: userId,
                    isRead: false
                });

                chats = [{
                    id: tutor._id,
                    name: tutor.name,
                    avatar: tutor.avatar || tutor.name.charAt(0).toUpperCase(),
                    role: 'tutor',
                    lastMessage: lastMessage?.text || '',
                    time: lastMessage?.createdAt || null,
                    unreadCount,
                    online: false
                }];
            } else {
                // Tutor sees all enrolled students (from StudentProgress)
                const studentProgresses = await StudentProgress.find({
                    courseId: courseId
                }).select('studentId');

                console.log('Found student progresses:', studentProgresses.length);

                chats = await Promise.all(
                    studentProgresses.map(async (progress) => {
                        const studentId = progress.studentId;

                        // Get last message
                        const lastMessage = await Message.findOne({
                            courseId,
                            $or: [
                                { senderId: userId, receiverId: studentId },
                                { senderId: studentId, receiverId: userId }
                            ]
                        }).sort({ createdAt: -1 });

                        // Get unread count
                        const unreadCount = await Message.countDocuments({
                            courseId,
                            senderId: studentId,
                            receiverId: userId,
                            isRead: false
                        });

                        return {
                            id: studentId,
                            name: `Student ${studentId.toString().substring(0, 8)}`,
                            avatar: 'S',
                            role: 'student',
                            lastMessage: lastMessage?.text || '',
                            time: lastMessage?.createdAt || null,
                            unreadCount,
                            online: false
                        };
                    })
                );

                // Sort by latest message
                chats.sort((a, b) => {
                    if (!a.time) return 1;
                    if (!b.time) return -1;
                    return new Date(b.time) - new Date(a.time);
                });
            }

            console.log('Returning chats:', chats.length);
            res.json({
                success: true,
                chats
            });
        } catch (error) {
            console.error('Error fetching course chats:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to fetch chats'
            });
        }
    },

    // Get messages between user and another person in a course
    async getMessages(req, res) {
        try {
            const { courseId, otherUserId } = req.params;
            const userId = req.user._id;

            console.log('Fetching messages for course:', courseId);

            // Verify access
            const course = await Course.findById(courseId);
            if (!course) {
                return res.status(404).json({
                    success: false,
                    message: 'Course not found'
                });
            }

            let hasAccess = false;

            if (req.user.role === 'tutor') {
                hasAccess = course.tutorId.toString() === userId.toString();
            } else {
                const studentProgress = await StudentProgress.findOne({
                    studentId: userId,
                    courseId: courseId
                });
                hasAccess = !!studentProgress;
            }

            if (!hasAccess) {
                return res.status(403).json({
                    success: false,
                    message: 'You do not have access to this course'
                });
            }

            // Fetch messages
            const messages = await Message.find({
                courseId,
                $or: [
                    { senderId: userId, receiverId: otherUserId },
                    { senderId: otherUserId, receiverId: userId }
                ]
            }).sort({ createdAt: 1 });

            console.log('Found messages:', messages.length);

            // Mark messages as read
            await Message.updateMany(
                {
                    courseId,
                    senderId: otherUserId,
                    receiverId: userId,
                    isRead: false
                },
                {
                    isRead: true,
                    readAt: new Date()
                }
            );

            // Format messages
            const formattedMessages = messages.map(msg => ({
                id: msg._id,
                sender: msg.senderId.toString() === userId.toString() ? req.user.role : (req.user.role === 'student' ? 'tutor' : 'student'),
                text: msg.text,
                time: msg.createdAt,
                isRead: msg.isRead,
                attachments: msg.attachments || []
            }));

            res.json({
                success: true,
                messages: formattedMessages
            });
        } catch (error) {
            console.error('Error fetching messages:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to fetch messages'
            });
        }
    },

    // Send a message
    async sendMessage(req, res) {
        try {
            const { courseId, receiverId, text, attachments } = req.body;
            const senderId = req.user._id;
            const senderRole = req.user.role;

            console.log('Sending message from:', senderId, 'to:', receiverId);

            if (!text || !text.trim()) {
                return res.status(400).json({
                    success: false,
                    message: 'Message text is required'
                });
            }

            // Verify access
            const course = await Course.findById(courseId);
            if (!course) {
                return res.status(404).json({
                    success: false,
                    message: 'Course not found'
                });
            }

            let hasAccess = false;

            if (senderRole === 'tutor') {
                hasAccess = course.tutorId.toString() === senderId.toString();
            } else {
                const studentProgress = await StudentProgress.findOne({
                    studentId: senderId,
                    courseId: courseId
                });
                hasAccess = !!studentProgress;
            }

            if (!hasAccess) {
                return res.status(403).json({
                    success: false,
                    message: 'You do not have access to this course'
                });
            }

            // Create message
            const message = await Message.create({
                courseId,
                senderId,
                senderRole,
                receiverId,
                text: text.trim(),
                attachments: attachments || []
            });

            console.log('Message created successfully:', message._id);

            res.status(201).json({
                success: true,
                message: {
                    id: message._id,
                    sender: senderRole,
                    text: message.text,
                    time: message.createdAt,
                    isRead: message.isRead,
                    attachments: message.attachments
                }
            });
        } catch (error) {
            console.error('Error sending message:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to send message'
            });
        }
    },

    // Mark messages as read
    async markAsRead(req, res) {
        try {
            const { courseId, senderId } = req.body;
            const receiverId = req.user._id;

            await Message.updateMany(
                {
                    courseId,
                    senderId,
                    receiverId,
                    isRead: false
                },
                {
                    isRead: true,
                    readAt: new Date()
                }
            );

            res.json({
                success: true,
                message: 'Messages marked as read'
            });
        } catch (error) {
            console.error('Error marking messages as read:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to mark messages as read'
            });
        }
    },

    // Get unread message count
    async getUnreadCount(req, res) {
        try {
            const userId = req.user._id;

            const unreadCount = await Message.countDocuments({
                receiverId: userId,
                isRead: false
            });

            res.json({
                success: true,
                unreadCount
            });
        } catch (error) {
            console.error('Error fetching unread count:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to fetch unread count'
            });
        }
    }
};
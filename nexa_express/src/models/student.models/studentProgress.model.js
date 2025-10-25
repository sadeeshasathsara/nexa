// models/StudentProgress.js
import mongoose from 'mongoose';

const studentProgressSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    enrolledAt: {
        type: Date,
        default: Date.now
    },
    progress: {
        type: Number,
        default: 0
    },
    completedLessons: [{
        lessonId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        completedAt: {
            type: Date,
            default: Date.now
        },
        quizScore: {
            type: Number,
            default: 0
        }
    }],
    currentLesson: {
        type: mongoose.Schema.Types.ObjectId
    },
    totalTimeSpent: {
        type: Number,
        default: 0
    },
    lastAccessed: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Compound index for efficient queries
studentProgressSchema.index({ studentId: 1, courseId: 1 }, { unique: true });
studentProgressSchema.index({ studentId: 1, lastAccessed: -1 });

export default mongoose.model('StudentProgress', studentProgressSchema);
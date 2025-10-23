// models/QuizAttempt.js
import mongoose from 'mongoose';

const quizAttemptSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    lessonId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    quizId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    answers: [{
        questionId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        selectedOption: Number,
        isCorrect: Boolean,
        points: Number
    }],
    totalScore: {
        type: Number,
        default: 0
    },
    maxScore: {
        type: Number,
        required: true
    },
    percentage: {
        type: Number,
        required: true
    },
    passed: {
        type: Boolean,
        required: true
    },
    timeSpent: {
        type: Number,
        default: 0
    },
    completedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

quizAttemptSchema.index({ studentId: 1, lessonId: 1 });
quizAttemptSchema.index({ studentId: 1, completedAt: -1 });

export default mongoose.model('QuizAttempt', quizAttemptSchema);
import mongoose from 'mongoose';

const quizQuestionSchema = new mongoose.Schema({
    questionText: {
        type: String,
        required: true
    },
    questionType: {
        type: String,
        enum: ['multiple_choice', 'true_false', 'short_answer'],
        default: 'multiple_choice'
    },
    options: [{
        text: String,
        isCorrect: Boolean
    }],
    correctAnswer: String,
    points: {
        type: Number,
        default: 1
    },
    orderIndex: Number
});

const quizSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    questions: [quizQuestionSchema],
    totalPoints: {
        type: Number,
        default: 0
    },
    timeLimit: Number, // in minutes
    passingScore: Number,
    isPublished: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const lessonSchema = new mongoose.Schema({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        default: ''
    },
    videoUrl: {
        type: String,
        default: ''
    },
    videoDuration: {
        type: Number, // in seconds
        default: 0
    },
    materialPdfUrl: {
        type: String,
        default: ''
    },
    orderIndex: {
        type: Number,
        required: true
    },
    quiz: quizSchema,
    isPublished: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Index for efficient queries
lessonSchema.index({ courseId: 1, orderIndex: 1 });
lessonSchema.index({ courseId: 1, isActive: 1 });

const Lesson = mongoose.model('Lesson', lessonSchema);

export default Lesson;
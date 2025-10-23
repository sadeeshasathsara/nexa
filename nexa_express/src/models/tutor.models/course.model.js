import mongoose from 'mongoose';

const quizQuestionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true,
    trim: true
  },
  questionType: {
    type: String,
    enum: ['multiple_choice', 'true_false', 'short_answer'],
    default: 'multiple_choice'
  },
  options: [{
    text: {
      type: String,
      required: true
    },
    isCorrect: {
      type: Boolean,
      default: false
    }
  }],
  correctAnswer: {
    type: String,
    default: ''
  },
  points: {
    type: Number,
    default: 1
  },
  orderIndex: {
    type: Number,
    default: 0
  }
}, {
  _id: true
});

const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    default: 'Quiz'
  },
  description: {
    type: String,
    default: ''
  },
  questions: [quizQuestionSchema],
  totalPoints: {
    type: Number,
    default: 0
  },
  timeLimit: {
    type: Number, // in minutes
    default: 0
  },
  passingScore: {
    type: Number,
    default: 0
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const lessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  videoUrl: {
    type: String,
    default: ''
  },
  materialPdfUrl: {
    type: String,
    default: ''
  },
  orderIndex: {
    type: Number,
    required: true
  },
  duration: {
    type: Number, // in minutes
    default: 0
  },
  quiz: quizSchema, // Add quiz to lesson
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const courseSchema = new mongoose.Schema({
  tutorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  thumbnailUrl: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'published'
  },
  category: {
    type: String,
    default: ''
  },
  lessons: [lessonSchema],
  enrolledStudents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for efficient queries
courseSchema.index({ tutorId: 1, createdAt: -1 });
courseSchema.index({ status: 1 });

// Virtual for lessons count
courseSchema.virtual('lessonsCount').get(function () {
  return this.lessons.length;
});

// Virtual for enrolled students count
courseSchema.virtual('enrolledStudentsCount').get(function () {
  return this.enrolledStudents.length;
});

// Ensure virtual fields are serialized
courseSchema.set('toJSON', { virtuals: true });

export default mongoose.model('Course', courseSchema);
import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    thumbnail: String,
    tags: [String],

    rating: { type: Number, default: 0 },
    totalRatings: { type: Number, default: 0 },
    totalLearners: { type: Number, default: 0 },

    duration: Number,             // in minutes
    previewDuration: Number,      // in minutes
    lastUpdated: Date,
    language: String,

    introVideo: { type: Boolean, default: false },
    videoThumbnail: String,

    instructors: [
        {
            name: String,
            title: String,
            avatar: String,
        },
    ],

    // Learning Outcomes
    learningOutcomes: [String],

    // Course Includes (only text, no icons stored)
    courseIncludes: [
        {
            text: String,
        },
    ],
    relatedTopics: [String],

    // Description + Requirements + Stats
    details: {
        overview: String,
        whatYouWillLearn: [String],
        targetAudience: [String],
    },

    requirements: {
        required: [String],
        recommended: [String],
        notRequired: [String],
    },

    stats: {
        duration: String,   // e.g. "25 hours"
        lessons: Number,
        level: String,
        rating: Number,
        students: String,   // keep string format e.g. "8,230"
    },

    // Course Content
    sections: [
        {
            title: String,
            duration: Number, // total minutes
            lectures: [
                {
                    title: String,
                    type: { type: String }, // video, pdf, download, image
                    duration: Number,
                    preview: { type: Boolean, default: false },
                },
            ],
        },
    ],

    // Reviews (referenced)
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review",
        },
    ],

    ratingDistribution: {
        5: { type: Number, default: 0 },
        4: { type: Number, default: 0 },
        3: { type: Number, default: 0 },
        2: { type: Number, default: 0 },
        1: { type: Number, default: 0 },
    },

    averageRating: { type: Number, default: 0 },
});

export default mongoose.model("Course", CourseSchema);

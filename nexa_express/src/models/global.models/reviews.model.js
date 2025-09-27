import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
    {
        courseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
            required: true,
        },
        studentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "StudentProfile",
            required: true,
        },
        rating: { type: Number, required: true },
        date: { type: Date, default: Date.now },
        title: String,
        content: String,
        helpful: { type: Number, default: 0 },
        tags: [String],
    },
    { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);

export default Review;

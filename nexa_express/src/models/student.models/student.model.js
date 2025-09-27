import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema(
    {
        accountId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Account", // base account (role = student)
            required: true,
            unique: true,
        },
        gradeLevel: { type: String },
        subjectsOfInterest: [{ type: String }],
        learningGoals: { type: String },
        preferredLanguages: [
            { type: String, enum: ["Sinhala", "Tamil", "English"] }
        ],
        accountCompleted: { type: Boolean, default: false },
    },
    { timestamps: true }
);

const Student = mongoose.model("Student", StudentSchema);

export default Student;

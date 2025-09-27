import mongoose from "mongoose";

const tutorDetailsSchema = new mongoose.Schema(
    {
        accountId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Account",
            required: true,
        },

        // Basic Info
        dateOfBirth: Date,
        phoneNumber: String,
        educationLevel: [String], // frontend sends array
        isGovernmentTeacher: Boolean,
        schoolName: String,
        languages: [
            {
                language: String,
                level: String,
            },
        ],

        // Legal & Safety
        hasConviction: Boolean,
        hasAcademicSanctions: Boolean,
        agreesToBackgroundCheck: Boolean,
        certifiesInformationTrue: Boolean,
        understandsPlatformOnly: Boolean,
        understandsUnpaidPosition: Boolean,

        // Experience
        subjects: [String],
        preferredGradeLevels: [String],
        hasTutoredBefore: Boolean,
        tutoringExperience: String,
        availability: [
            {
                day: String,
                startTime: String,
                endTime: String,
            },
        ],

        // Motivation
        motivationStatement: String,

        // Resume/Portfolio
        resumePortfolioLink: String,
    },
    { timestamps: true }
);

const TutorDetails = mongoose.model("TutorDetails", tutorDetailsSchema);

export default TutorDetails;

/* const tutorDetailsSchema = new mongoose.Schema(
    {
        accountId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Account",
            required: true,
        },
        dateOfBirth: Date,
        phoneNumber: String,
        educationLevel: {
            type: String,
            enum: ["High School", "College", "University", "Masters", "PhD", "Other"],
        },
        isGovTeacher: Boolean,
        schoolName: String,
        languages: [String],

        // Legal & Safety
        criminalConvictions: Boolean,
        academicSanctions: Boolean,
        backgroundCheckConsent: Boolean,
        infoCertification: Boolean,
        tutoringAgreement: Boolean,
        volunteerAcknowledgement: Boolean,

        // Experience
        subjects: [String],
        preferredGradeLevels: [String],
        tutoredBefore: Boolean,
        tutoringExperience: String,
        availability: [String],

        // Motivation
        motivationStatement: String,

        // Resume/Portfolio
        portfolioLink: String,
    },
    { timestamps: true }
);

const TutorDetails = mongoose.model("TutorDetails", tutorDetailsSchema);
export default TutorDetails;
 */
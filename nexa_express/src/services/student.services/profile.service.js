import Student from "../../models/student.models/student.model.js";

export const createProfile = async (accountId) => {
    try {
        const existing = await Student.findOne({ accountId });
        if (existing) return existing;

        const newProfile = new Student({ accountId });
        await newProfile.save();
        return newProfile;
    } catch (error) {
        throw new Error(error.message);
    }
};

/**
 * Complete a student account by updating their profile
 *
 * @param {string} accountId - The ID of the student account
 * @param {object} profileData - Fields to update in the student profile
 * @param {string} profileData.gradeLevel - Grade level of the student
 * @param {string[]} profileData.subjectsOfInterest - Subjects the student is interested in
 * @param {string} profileData.learningGoals - Learning goals
 * @param {string[]} profileData.preferredLanguages - Preferred languages (Sinhala, Tamil, English)
 * @returns {object} - Updated student profile
 */
export const completeStudentProfile = async (accountId, profileData) => {
    try {
        // Find the student profile by accountId
        let studentProfile = await Student.findOne({ accountId });

        if (!studentProfile) {
            throw new Error("Student profile not found for this account");
        }

        // Update profile fields
        const { gradeLevel, subjectsOfInterest, learningGoals, preferredLanguages } = profileData;

        if (gradeLevel !== undefined) studentProfile.gradeLevel = gradeLevel;
        if (subjectsOfInterest !== undefined) studentProfile.subjectsOfInterest = subjectsOfInterest;
        if (learningGoals !== undefined) studentProfile.learningGoals = learningGoals;
        if (preferredLanguages !== undefined) studentProfile.preferredLanguages = preferredLanguages;

        // Mark account as completed
        studentProfile.accountCompleted = true;

        await studentProfile.save();
        return studentProfile;
    } catch (error) {
        throw new Error(error.message);
    }
};

/**
 * Query student profiles based on arbitrary filters
 *
 * @param {object} filters - Object containing fields to filter by
 * @returns {Array<object>} - List of matching student profiles
 */
export const queryStudentProfiles = async (filters) => {
    try {
        // Build a MongoDB query object dynamically
        const query = {};

        if (filters.gradeLevel) query.gradeLevel = filters.gradeLevel;
        if (filters.subjectsOfInterest) query.subjectsOfInterest = { $in: filters.subjectsOfInterest };
        if (filters.learningGoals) query.learningGoals = { $regex: filters.learningGoals, $options: "i" };
        if (filters.preferredLanguages) query.preferredLanguages = { $in: filters.preferredLanguages };
        if (filters.accountCompleted !== undefined) query.accountCompleted = filters.accountCompleted;
        if (filters.accountId) query.accountId = filters.accountId;

        // Execute query
        const studentProfiles = await Student.find(query);
        return studentProfiles;
    } catch (error) {
        throw new Error(error.message);
    }
};
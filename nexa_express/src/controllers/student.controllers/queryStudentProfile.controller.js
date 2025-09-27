import { queryStudentProfiles } from "../../services/student.services/profile.service";

/**
 * Get student profiles with flexible querying
 *
 * @route GET /students
 * @group Students - Operations related to student profiles
 * @access Private
 * @param {object} req.query - Optional filters: gradeLevel, subjectsOfInterest, learningGoals, preferredLanguages, accountCompleted
 * @param {object} req.user - Authenticated account info from checkAuth middleware (optional)
 * @returns {Array<object>} 200 - List of matching student profiles
 * @returns {Error} 404 - No profiles found
 */
export const queryStudentProfilesController = async (req, res) => {
    try {
        const filters = req.query || {};

        const studentProfiles = await queryStudentProfiles(filters);

        if (!studentProfiles || studentProfiles.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No student profiles found matching the criteria"
            });
        }

        res.status(200).json({
            success: true,
            data: studentProfiles,
            message: "Student profiles retrieved successfully"
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
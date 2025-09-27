
import { completeStudentProfile } from "../../../services/global.services/student.service.js";

/**
 * Complete authenticated student's profile
 *
 * @route PUT /students/complete
 * @group Students - Operations related to student profiles
 * @access Private
 * @param {object} req.user - Authenticated account info from checkAuth middleware
 * @param {object} req.body - Profile fields to update
 * @param {string} [req.body.gradeLevel] - Student's grade level
 * @param {string[]} [req.body.subjectsOfInterest] - Subjects of interest
 * @param {string} [req.body.learningGoals] - Learning goals
 * @param {string[]} [req.body.preferredLanguages] - Preferred languages (Sinhala, Tamil, English)
 * @returns {object} 200 - Updated student profile
 * @returns {Error} 400 - Validation or server error
 */
export const completeStudentProfileController = async (req, res) => {
    try {
        const accountId = req.user._id; // Use accountId from authenticated user
        const profileData = req.body;

        // Ensure at least one field is provided
        if (!profileData || Object.keys(profileData).length === 0) {
            return res.status(400).json({
                success: false,
                message: "No profile data provided to complete the account"
            });
        }

        const updatedProfile = await completeStudentProfile(accountId, profileData);

        res.status(200).json({
            success: true,
            data: updatedProfile,
            message: "Student profile completed successfully"
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

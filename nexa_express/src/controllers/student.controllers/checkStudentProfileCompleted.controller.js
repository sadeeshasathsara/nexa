import { queryStudentProfiles } from "../../services/student.services/profile.service.js";

/**
 * Check if the authenticated student's profile is completed
 *
 * @route GET /students/profile/completed
 * @group Students - Operations related to student profiles
 * @access Private
 * @param {object} req.user - Authenticated account info from checkAuth middleware
 * @returns {object} 200 - { completed: true/false }
 * @returns {Error} 404 - Student profile not found
 */
export const checkStudentProfileCompletedController = async (req, res) => {
    try {
        const accountId = req.user._id;

        // Query the     student profile for this account
        const profiles = await queryStudentProfiles({ accountId });

        if (!profiles || profiles.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Student profile not found"
            });
        }

        // Since accountId is unique, we expect only one profile
        const profile = profiles[0];

        res.status(200).json({
            success: true,
            completed: profile.accountCompleted,
            message: profile.accountCompleted
                ? "Student profile is completed"
                : "Student profile is not completed"
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

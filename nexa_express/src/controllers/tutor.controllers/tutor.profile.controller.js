// controllers/tutor.controllers/tutorProfile.controller.js
import { getTutorProfileService, updateTutorProfileService } from '../../services/tutor.services/tutor.profile.service.js';

export const getTutorProfileController = async (req, res) => {
    try {
        console.log('Fetching profile for user:', req.user);
        const result = await getTutorProfileService(req.user);

        if (!result.success) {
            return res.status(404).json({
                success: false,
                message: result.message
            });
        }

        res.status(200).json({
            success: true,
            data: result.data
        });
    } catch (error) {
        console.error('Error in getTutorProfileController:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

export const updateTutorProfileController = async (req, res) => {
    try {
        const result = await updateTutorProfileService(req.user, req.body);

        if (!result.success) {
            return res.status(400).json({
                success: false,
                message: result.message
            });
        }

        res.status(200).json({
            success: true,
            data: result.data,
            message: 'Profile updated successfully'
        });
    } catch (error) {
        console.error('Error in updateTutorProfileController:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};
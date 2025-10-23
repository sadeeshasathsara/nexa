import express from 'express';
import {
    getTutorProfileController,
    updateTutorProfileController
} from '../../controllers/tutor.controllers/tutor.profile.controller.js';

const router = express.Router();


// Tutor profile routes
router.get('/', getTutorProfileController);
router.put('/', updateTutorProfileController);

export default router;
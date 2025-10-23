// services/tutor.services/tutorProfile.service.js
import TutorDetails from '../../models/tutor.models/tutor.details.model.js';
import Account from '../../models/global.models/account.model.js';

export const getTutorProfileService = async (user) => {
    try {
        if (user.role !== 'tutor') {
            return {
                success: false,
                message: 'Access denied. Tutor role required.'
            };
        }

        const tutorDetails = await TutorDetails.findOne({
            accountId: user._id
        }).populate('accountId', 'firstName lastName email');

        if (!tutorDetails) {
            return {
                success: false,
                message: 'Tutor profile not found'
            };
        }

        const profileData = transformToFrontendFormat(tutorDetails);

        return {
            success: true,
            data: profileData
        };
    } catch (error) {
        console.error('Error in getTutorProfileService:', error);
        throw new Error('Failed to fetch tutor profile');
    }
};

export const updateTutorProfileService = async (user, updateData) => {
    try {
        if (user.role !== 'tutor') {
            return {
                success: false,
                message: 'Access denied. Tutor role required.'
            };
        }

        // Transform frontend data to database format
        const dbUpdateData = transformToDatabaseFormat(updateData);

        const updatedTutor = await TutorDetails.findOneAndUpdate(
            { accountId: user._id }, // FIXED: Changed from user.userId to user.id
            { $set: dbUpdateData },
            { new: true, runValidators: true }
        ).populate('accountId', 'firstName lastName email');

        if (!updatedTutor) {
            return {
                success: false,
                message: 'Tutor profile not found'
            };
        }

        const profileData = transformToFrontendFormat(updatedTutor);

        return {
            success: true,
            data: profileData,
            message: 'Profile updated successfully'
        };
    } catch (error) {
        console.error('Error in updateTutorProfileService:', error);
        throw new Error('Failed to update tutor profile');
    }
};

// Helper functions
const transformToFrontendFormat = (tutorDetails) => {
    const age = calculateAge(tutorDetails.dateOfBirth);

    return {
        phoneNumber: tutorDetails.phoneNumber || '',
        age: age || 0,
        schoolName: tutorDetails.schoolName || '',
        about: tutorDetails.motivationStatement || '',
        education: {
            degree: tutorDetails.educationLevel?.[0] || 'Not specified',
            level: tutorDetails.educationLevel?.[0] || 'Not specified',
            certification: tutorDetails.isGovernmentTeacher ? 'Government Certified Teacher' : 'Certified Tutor',
            workplace: tutorDetails.schoolName ? `Currently teaching at ${tutorDetails.schoolName}` : 'Not specified'
        },
        experience: {
            status: tutorDetails.hasTutoredBefore ? 'Experienced Tutor' : 'New to Online Tutoring',
            description: tutorDetails.tutoringExperience || 'Dedicated to helping students achieve their academic goals'
        },
        subjects: tutorDetails.subjects || [],
        languages: tutorDetails.languages || [],
        availability: tutorDetails.availability || [],
        resumePortfolioLink: tutorDetails.resumePortfolioLink || '',
        firstName: tutorDetails.accountId?.firstName || '',
        lastName: tutorDetails.accountId?.lastName || '',
        email: tutorDetails.accountId?.email || ''
    };
};

const transformToDatabaseFormat = (frontendData) => {
    const dbData = {};

    // Only include fields that are present in the update
    if (frontendData.phoneNumber !== undefined) {
        dbData.phoneNumber = frontendData.phoneNumber;
    }

    if (frontendData.age !== undefined) {
        dbData.dateOfBirth = calculateDateOfBirth(frontendData.age);
    }

    if (frontendData.schoolName !== undefined) {
        dbData.schoolName = frontendData.schoolName;
    }

    if (frontendData.about !== undefined) {
        dbData.motivationStatement = frontendData.about;
    }

    // Handle education data - use level from frontend education object
    if (frontendData.education?.level !== undefined) {
        dbData.educationLevel = [frontendData.education.level];
    }

    // Handle experience data
    if (frontendData.experience?.description !== undefined) {
        dbData.tutoringExperience = frontendData.experience.description;
    }

    if (frontendData.experience?.status !== undefined) {
        dbData.hasTutoredBefore = frontendData.experience.status === 'Experienced Tutor';
    }

    if (frontendData.subjects !== undefined) {
        dbData.subjects = frontendData.subjects;
    }

    if (frontendData.languages !== undefined) {
        dbData.languages = frontendData.languages;
    }

    if (frontendData.availability !== undefined) {
        dbData.availability = frontendData.availability;
    }

    if (frontendData.resumePortfolioLink !== undefined) {
        dbData.resumePortfolioLink = frontendData.resumePortfolioLink;
    }

    return dbData;
};

const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) return 0;
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
};

const calculateDateOfBirth = (age) => {
    const today = new Date();
    const birthYear = today.getFullYear() - age;
    return new Date(birthYear, today.getMonth(), today.getDate());
};
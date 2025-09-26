import TutorDetails from "../../models/tutor.models/tutor.details.model.js";

export const createTutorDetails = async (accountId, tutorData) => {
    try {
        const tutorDetails = new TutorDetails({
            accountId,
            ...tutorData,
        });

        return await tutorDetails.save();
    } catch (error) {
        throw new Error("Failed to create tutor details: " + error.message);
    }
};

//Still didn't used and tested
export const getTutorDetailsByAccountId = async (accountId) => {
    return await TutorDetails.findOne({ accountId });
};

//Still didn't used and tested
export const updateTutorDetails = async (accountId, updateData) => {
    return await TutorDetails.findOneAndUpdate(
        { accountId },
        { $set: updateData },
        { new: true }
    );
};

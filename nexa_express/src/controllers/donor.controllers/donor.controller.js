import Donor from '../../models/donor.models/donor.model.js';
import jwt from 'jsonwebtoken';

const signToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET || 'dev-secret', { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });

export const registerDonor = async (req, res) => {
    try {
        const existing = await Donor.findOne({ email: req.body.email });
        if (existing) {
            return res.status(400).json({ success: false, message: 'Email already registered' });
        }

        const donor = await Donor.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phone: req.body.phone,
            password: req.body.password,
            dateOfBirth: req.body.dateOfBirth,
            gender: req.body.gender,
            address: req.body.address,
            preferredCauses: req.body.preferredCauses || [],
            donationFrequency: req.body.donationFrequency || 'one-time',
            preferredCurrency: req.body.preferredCurrency || 'USD',
        });

        const token = signToken(donor._id);
        const safe = donor.toObject();
        delete safe.password;
        return res.status(201).json({ success: true, message: 'Registered', data: { donor: safe, token } });
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Registration failed', error: err.message });
    }
};

export const loginDonor = async (req, res) => {
    res.status(200).json({ success: true, message: 'loginDonor placeholder', token: 'dev-token' });
};

export const getDonorProfile = async (req, res) => {
    res.status(200).json({ success: true, data: { id: 'dev', name: 'Donor Dev' } });
};

export const updateDonorProfile = async (req, res) => {
    res.status(200).json({ success: true, message: 'updateDonorProfile placeholder' });
};

export const changePassword = async (req, res) => {
    res.status(200).json({ success: true, message: 'changePassword placeholder' });
};

export const getDonorDonations = async (req, res) => {
    res.status(200).json({ success: true, data: [], total: 0 });
};

export const getDonorStatistics = async (req, res) => {
    res.status(200).json({ success: true, data: { totalDonations: 0, totalAmount: 0 } });
};

export const forgotPassword = async (req, res) => {
    res.status(200).json({ success: true, message: 'forgotPassword placeholder' });
};

export const resetPassword = async (req, res) => {
    res.status(200).json({ success: true, message: 'resetPassword placeholder' });
};

export const deleteDonorAccount = async (req, res) => {
    res.status(200).json({ success: true, message: 'deleteDonorAccount placeholder' });
};




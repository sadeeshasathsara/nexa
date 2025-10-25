// models/Message.js - FIXED VERSION
import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true,
        index: true
    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    senderRole: {
        type: String,
        enum: ['student', 'tutor'],
        required: true
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    text: {
        type: String,
        required: true,
        trim: true
    },
    attachments: [{
        url: String,
        type: String, // 'image', 'document', 'video'
        name: String
    }],
    isRead: {
        type: Boolean,
        default: false
    },
    readAt: {
        type: Date
    }
}, {
    timestamps: true
});

// Compound index for efficient queries
messageSchema.index({ courseId: 1, createdAt: -1 });
messageSchema.index({ senderId: 1, receiverId: 1 });
messageSchema.index({ isRead: 1, receiverId: 1 });

export default mongoose.model('Message', messageSchema);
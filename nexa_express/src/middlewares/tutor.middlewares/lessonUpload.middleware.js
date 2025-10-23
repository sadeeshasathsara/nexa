import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure upload directories exist
const uploadDirs = [
    path.join(__dirname, '../../../uploads/lessons/videos'),
    path.join(__dirname, '../../../uploads/lessons/materials')
];

uploadDirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

// Video storage configuration
const videoStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../../uploads/lessons/videos'));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'video-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// PDF storage configuration
const pdfStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../../uploads/lessons/materials'));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'material-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// File filters
const videoFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('video/')) {
        cb(null, true);
    } else {
        cb(new Error('Only video files are allowed!'), false);
    }
};

const pdfFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb(new Error('Only PDF files are allowed!'), false);
    }
};

const videoUpload = multer({
    storage: videoStorage,
    fileFilter: videoFilter,
    limits: {
        fileSize: 500 * 1024 * 1024 // 500MB limit for videos
    }
});

const pdfUpload = multer({
    storage: pdfStorage,
    fileFilter: pdfFilter,
    limits: {
        fileSize: 50 * 1024 * 1024 // 50MB limit for PDFs
    }
});

// Middleware for handling video upload
export const handleVideoUpload = (req, res, next) => {
    videoUpload.single('video')(req, res, function (err) {
        if (err) {
            return res.status(400).json({
                success: false,
                message: err.message
            });
        }
        next();
    });
};

// Middleware for handling PDF upload
export const handleMaterialUpload = (req, res, next) => {
    pdfUpload.single('material')(req, res, function (err) {
        if (err) {
            return res.status(400).json({
                success: false,
                message: err.message
            });
        }
        next();
    });
};

// Middleware for handling both video and PDF uploads
export const handleLessonFilesUpload = (req, res, next) => {
    const upload = multer({
        storage: multer.diskStorage({
            destination: function (req, file, cb) {
                if (file.fieldname === 'video') {
                    cb(null, path.join(__dirname, '../../../uploads/lessons/videos'));
                } else if (file.fieldname === 'material') {
                    cb(null, path.join(__dirname, '../../../uploads/lessons/materials'));
                }
            },
            filename: function (req, file, cb) {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                if (file.fieldname === 'video') {
                    cb(null, 'video-' + uniqueSuffix + path.extname(file.originalname));
                } else if (file.fieldname === 'material') {
                    cb(null, 'material-' + uniqueSuffix + path.extname(file.originalname));
                }
            }
        }),
        fileFilter: function (req, file, cb) {
            if (file.fieldname === 'video' && file.mimetype.startsWith('video/')) {
                cb(null, true);
            } else if (file.fieldname === 'material' && file.mimetype === 'application/pdf') {
                cb(null, true);
            } else {
                cb(new Error('Invalid file type!'), false);
            }
        },
        limits: {
            fileSize: 500 * 1024 * 1024 // 500MB for videos
        }
    });

    upload.fields([
        { name: 'video', maxCount: 1 },
        { name: 'material', maxCount: 1 }
    ])(req, res, function (err) {
        if (err) {
            return res.status(400).json({
                success: false,
                message: err.message
            });
        }
        next();
    });
};
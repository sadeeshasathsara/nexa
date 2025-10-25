import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from "cookie-parser";
import connectDB from './src/config/database.config.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import APIRouterV1 from './src/routes/global.routes/global.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

// Ensure upload directories exist
const uploadDirs = [
    path.join(__dirname, 'uploads/courses')
];

uploadDirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));


// Debug middleware for static files - add this before your static serving
app.use('/uploads', (req, res, next) => {
    const filePath = path.join(__dirname, 'uploads', req.path);
    console.log('Static file request:', req.url);
    console.log('Looking for file at:', filePath);
    console.log('File exists:', fs.existsSync(filePath));
    next();
});


// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Serve static files for lessons
app.use('/uploads/lessons', express.static(path.join(__dirname, 'uploads', 'lessons')));

//Main Route Check
app.get('/', (req, res) => {
    res.json({ message: 'Server is running' });
});

//API Route
app.use('/api', APIRouterV1);

await connectDB();

app.listen(PORT, () => {
    console.log(`> Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from "cookie-parser";
import connectDB from './src/config/database.config.js';

import APIRouterV1 from './src/routes/global.routes/global.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

//Main Route Check
app.get('/', (req, res) => {
    res.json({ message: 'Server is running' });
});

//API Route
app.use('/api', APIRouterV1);

await connectDB();
await connectDB();
app.listen(PORT, () => {
    console.log(`> Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
    console.log(`> Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
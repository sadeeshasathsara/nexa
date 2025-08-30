import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
<<<<<<< Updated upstream
import APIRouterV1 from './src/routes/global_routes/global.route.js';
=======
import APIRouterV1 from './src/routes/global.routes/global.route.js';
>>>>>>> Stashed changes

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Main Route Check
app.get('/', (req, res) => {
    res.json({ message: 'Server is running' });
});

//API Route
app.use('/api', APIRouterV1);

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
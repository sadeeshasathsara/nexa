import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

let connectPromise = null;

export const ensureDonorDbConnected = async () => {
    if (mongoose.connection && mongoose.connection.readyState === 1) {
        return mongoose.connection;
    }

    if (!connectPromise) {
        const uri = process.env.MONGODB_URI_DONOR || process.env.MONGODB_URI || 'mongodb://localhost:27017/nexa';
        connectPromise = mongoose.connect(uri).then(conn => {
            return conn.connection;
        }).catch(err => {
            connectPromise = null;
            throw err;
        });
    }

    return connectPromise;
};

export default ensureDonorDbConnected;



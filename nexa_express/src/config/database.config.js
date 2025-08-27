import mongoose from "mongoose";

/**
 * Connect to MongoDB database using Mongoose.
 * 
 * This function reads the MongoDB connection string from the environment 
 * variable `MONGO_URI`, and attempts to establish a connection.
 * 
 * If the connection is successful:
 *   - A success message will be logged to the console.
 * 
 * If the connection fails:
 *   - The error will be logged to the console.
 *   - The Node.js process will exit with code 1 (failure).
 * 
 * Usage:
 *   - Import and call this function in your main server file (e.g., server.js or app.js)
 *   - Make sure you have `MONGO_URI` defined in your `.env` file
 * 
 * Example:
 *   MONGO_URI=mongodb://127.0.0.1:27017/mydatabase
 */
const connectDB = async () => {
    try {
        // Attempt to connect to MongoDB using the connection string in .env
        const conn = await mongoose.connect(process.env.MONGO_URI);

        // Log success message if connected
        console.log(`> MongoDB Connected`);
    } catch (error) {
        // Log error message and exit process if connection fails
        console.error(`Error: ${error.message}`);
        process.exit(1); // Exit with failure
    }
};

export default connectDB;

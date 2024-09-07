const mongoose = require('mongoose'); // Import mongoose for MongoDB interaction
require('dotenv').config(); // Import dotenv for environment variables

// Function to connect to MongoDB
const connectDB = async () => {
    try {
        // Attempt to connect to MongoDB using connection string from environment variables
        await mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@articles-api.z6ttk2y.mongodb.net/?retryWrites=true&w=majority&appName=articles-api`, {
        });
        console.log('MongoDB Connected!'); // Log success message if connection is successful
    } catch (err) {
        console.error(err.message); // Log error message if connection fails
        process.exit(1); // Exit process with failure code
    }
};

module.exports = connectDB; 
import mongoose from 'mongoose';

// Function to connect to MongoDB
const connectToDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@articles-api.z6ttk2y.mongodb.net/?retryWrites=true&w=majority&appName=articles-api`, {
        });
        console.log("MongoDB Connected!");
    } catch (err) {
        console.error(err.message);
        process.exit(1); // Exit process with failure code
    }
};

export default connectToDB;
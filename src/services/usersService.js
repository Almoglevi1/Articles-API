import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';

export const signupService = async (userData) => {
    const { email, password } = userData;

    // Regular expression for validating email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check if the email format is valid
    if (!emailRegex.test(email)) {
        throw new Error('Invalid email format');
    }

    try {
        // Check if the email already exists
        const existingUser = await User.find({ email });
        if (existingUser.length >= 1) {
            throw new Error('This email already exists');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const user = new User({
            _id: new mongoose.Types.ObjectId(),
            email,
            password: hashedPassword
        });

        // Save the user to the database
        await user.save();
    } catch (error) {
        throw new Error(error.message);
    }
};

export const loginService = async (userData) => {
    const { email, password } = userData;

    try {
        // Check if the email exists
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('Auth failed');
        }

        // Compare the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Auth failed');
        }

        // Generate a JWT token
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        return token;
    } catch (error) {
        throw new Error(error.message);
    }
};
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = {
    // Signup function to register a new user
    signup: async (req, res) => {
        const { email, password } = req.body;

        // Regular expression for validating email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Check if the email format is valid
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                message: 'Invalid email format'
            });
        }

        try {
            // Check if the email already exists
            const users = await User.find({ email });
            if (users.length >= 1) {
                return res.status(409).json({
                    message: 'This email already exists'
                });
            }

            // Hash the password
            const hash = await bcrypt.hash(password, 10);

            // Create a new user
            const user = new User({
                _id: new mongoose.Types.ObjectId(),
                email,
                password: hash
            });

            // Save the user to the database
            await user.save();
            res.status(200).json({
                message: 'User created'
            });
        } catch (error) {
            // Handle server errors
            res.status(500).json({
                error
            });
        }
    },

    // Login function to authenticate a user
    login: async (req, res) => {
        const { email, password } = req.body;

        try {
            // Check if the email exists
            const users = await User.find({ email });
            if (users.length === 0) {
                return res.status(401).json({
                    message: 'Auth failed'
                });
            }

            const [user] = users;

            // Compare the password
            const result = await bcrypt.compare(password, user.password);
            if (result) {
                // Generate a JWT token
                const token = jwt.sign(
                    { id: user._id, email: user.email },
                    process.env.JWT_KEY,
                    { expiresIn: "1H" }
                );

                return res.status(200).json({
                    message: 'Auth successful',
                    token
                });
            }

            // Handle authentication failure
            res.status(401).json({
                message: 'Auth failed'
            });
        } catch (error) {
            // Handle server errors
            res.status(500).json({
                error
            });
        }
    }
}
import { signupService, loginService } from '../services/usersService';

// Signup function to register a new user
export const signup = async (req, res) => {
    try {
        await signupService(req.body);
        res.status(201).json({ message: 'User created' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Login function to authenticate a user
export const login = async (req, res) => {
    try {
        const token = await loginService(req.body);
        res.status(200).json({ token });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};
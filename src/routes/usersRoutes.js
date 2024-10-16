import express from 'express';
import { signup, login } from '../controllers/usersController';

const router = express.Router();

// Route to handle user signup
router.post('/signup', signup);

// Route to handle user login
router.post('/login', login);

export default router;
const express = require('express');
const router = express.Router();

// Import controller functions for handling user-related requests
const {
    signup,
    login
} = require('../controllers/usersControllers')

// Route to handle user signup
router.post('/signup', signup);

// Route to handle user login
router.post('/login', login);

module.exports = router;
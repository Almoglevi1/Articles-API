const jwt = require('jsonwebtoken'); // Import jsonwebtoken for token verification
require('dotenv').config(); // Import dotenv for environment variables


// Middleware function to check authentication
const checkAuth = (req, res, next) => {
    try {
        // Extract the token from the Authorization header
        const token = req.headers.authorization.split(' ')[1];
        // Verify the token using the secret key from environment variables
        jwt.verify(token, process.env.JWT_KEY);
        // If verification is successful, proceed to the next middleware or route handler
        next();
    } catch (eror) {
        // If verification fails, respond with a 401 Unauthorized status and an error message
        res.status(401).json({
            message: 'Auth failed'
        })
    }
}

module.exports = checkAuth;
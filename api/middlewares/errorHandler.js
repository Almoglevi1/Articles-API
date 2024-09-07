// Middleware for handling 404 errors
const notFoundHandler = (req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
};

// Middleware for handling general errors 
const errorHandler = (error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
};

module.exports = {
    notFoundHandler,
    errorHandler
};
// Middleware for handling 404 errors
export const notFoundHandler = (req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
};

// Middleware for handling general errors 
export const errorHandler = (error, req, res, next) => {
    res.status(error.status || 500).json({ message: error.message });
};
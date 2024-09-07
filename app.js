const express = require('express');
const app = express();
const morgan = require('morgan');
const checkAuth = require('./api/middlewares/checkAuth');
const connectDB = require('./config/db');
const cors = require('cors');
const { notFoundHandler, errorHandler } = require('./api/middlewares/errorHandler');

// Connect to MongoDB
connectDB();

// Define variables for the routes
const articlesRoutes = require('./api/routes/articlesRoutes'); 
const categoriesRoutes = require('./api/routes/categoriesRoutes');
const usersRoutes = require('./api/routes/usersRoutes');

// Logger
app.use(morgan("dev"));

// Static files
app.use('/uploads', express.static('uploads'));

// Body parser
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

// CORS handling
app.use(cors());

// Routes
app.use('/articles', articlesRoutes);
app.use('/categories', checkAuth, categoriesRoutes);
app.use('/users', usersRoutes);

// Error handling
// Use the 404 handler for unmatched routes
app.use(notFoundHandler);

// Use the general error handler
app.use(errorHandler);

module.exports = app;
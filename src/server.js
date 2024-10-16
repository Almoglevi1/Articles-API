import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import connectToDB from './config/connectToDB';
import cors from 'cors';
import { notFoundHandler, errorHandler } from './middlewares/errorHandler';
import articlesRoutes from './routes/articlesRoutes';
import categoriesRoutes from './routes/categoriesRoutes';
import usersRoutes from './routes/usersRoutes';

dotenv.config(); // Load environment variables

const app = express();
const PORT = 3000;

// Connect to MongoDB
connectToDB();

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
app.use('/categories', categoriesRoutes);
app.use('/users', usersRoutes);

// Error handling
// Use the 404 handler for unmatched routes
app.use(notFoundHandler);

// Use the general error handler
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
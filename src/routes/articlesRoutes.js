import express from 'express';
import upload from '../middlewares/upload';
import checkAuth from '../middlewares/checkAuth';
import { getAllArticles, createArticle, getArticle, updateArticle, deleteArticle } from '../controllers/articlesController';

const router = express.Router();

// Route to get all articles
router.get('/', getAllArticles);

// Route to get a specific article by its ID
router.get('/:articleId', getArticle);

// Route to create a new article, with authentication and file upload middleware
router.post('/', checkAuth, upload.single('image'), createArticle);

// Route to update an existing article by its ID, with authentication middleware
router.patch('/:articleId', checkAuth, updateArticle);

// Route to delete an article by its ID, with authentication middleware
router.delete('/:articleId', checkAuth, deleteArticle);

export default router;
const express = require('express');
const router = express.Router();

const upload = require('../middlewares/upload');
const checkAuth = require('../middlewares/checkAuth');

// Import controller functions for handling article-related requests
const {
    getAllArticles,
    createArticle,
    getArticle,
    updateArticle,
    deleteArticle
} = require('../controllers/articlesControllers')

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

module.exports = router;
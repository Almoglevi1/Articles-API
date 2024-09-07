const mongoose = require('mongoose');
const Article = require('../models/article');
const Category = require('../models/category');

module.exports = {
     getAllArticles: async (req, res) => {
        try {
            // Find all articles and populate the categoryId field with the title
            const articles = await Article.find().populate('categoryId', 'title');

            // Check if no articles are found
            if (articles.length === 0) {
                return res.status(404).json({
                    message: 'No articles found'
                });
            }

            // If articles are found, return them with a 200 OK status
            res.status(200).json({
                articles
            });
        } catch (error) {
            // Handle any errors that occur during the fetch operation
            res.status(500).json({
                error
            });
        }
    },
    createArticle: async (req, res) => {
        const { title, description, content, categoryId } = req.body;
        const { path: image } = req.file;

        // Validate the title
        if (!title || typeof title !== 'string' || title.trim() === '') {
            return res.status(400).json({
                message: 'Invalid title, it should be a non-empty string'
            });
        }

        // Validate the description
        if (!description || typeof description !== 'string' || description.trim() === '') {
            return res.status(400).json({
                message: 'Invalid description, it should be a non-empty string'
            });
        }

        // Validate the content
        if (!content || typeof content !== 'string' || content.trim() === '') {
            return res.status(400).json({
                message: 'Invalid content, it should be a non-empty string'
            });
        }

        // Validate the categoryId
        if (!mongoose.Types.ObjectId.isValid(categoryId)) {
            return res.status(400).json({
                message: 'Invalid category ID, a valid ID should contain 24-characters hexadecimal string'
            });
        }

        // Validate the image
        if (!image) {
            return res.status(400).json({
                message: 'Image is required'
            });
        }

        try {
            // Find the category by ID
            const category = await Category.findById(categoryId);
            if (!category) {
                return res.status(404).json({
                    message: 'Category not found'
                });
            }

            // Create a new article instance
            const article = new Article({
                _id: new mongoose.Types.ObjectId(),
                title,
                description,
                content,
                categoryId,
                image: image.replace('\\', '/')
            });

            // Save the article to the database
            await article.save();

            // Respond with success message after creating the article
            res.status(200).json({
                message: 'Created article'
            });
        } catch (error) {
            // Handle any errors that occur during the save operation
            res.status(500).json({
                error
            });
        }
    },
    getArticle: async (req, res) => {
        const articleId = req.params.articleId;

        // Validate the articleId
        if (!mongoose.Types.ObjectId.isValid(articleId)) {
            return res.status(400).json({
                message: 'Invalid article ID, a valid ID should contain 24-characters hexadecimal string'
            });
        }

        try {
            // Find the article by ID
            const article = await Article.findById(articleId);
            
            if (!article) {
                // If the article is not found, return a 404 error
                return res.status(404).json({
                    message: 'Article not found'
                });
            }

            // If the article is found, return it
            res.status(200).json({
                article
            });
        } catch (error) {
            // Handle any errors that occur in the promise chain
            res.status(500).json({
                error
            });
        }
    },
    updateArticle: async (req, res) => {
        const articleId = req.params.articleId;
        const { categoryId } = req.body;

        // Validate the articleId
        if (!mongoose.Types.ObjectId.isValid(articleId)) {
            return res.status(400).json({
                message: 'Invalid article ID, a valid ID should contain 24-characters hexadecimal string'
            });
        }

        // Validate the categoryId if provided
        if (categoryId && !mongoose.Types.ObjectId.isValid(categoryId)) {
            return res.status(400).json({
                message: 'Invalid category ID, a valid ID should contain 24-characters hexadecimal string'
            });
        }

        try {
            // Find the article by ID
            const article = await Article.findById(articleId);
            if (!article) {
                // If the article is not found, return a 404 error
                return res.status(404).json({
                    message: 'Article not found'
                });
            }

            if (categoryId) {
                // If categoryId is provided, find the category by ID
                const category = await Category.findById(categoryId);
                if (!category) {
                    // If the category is not found, return a 404 error
                    return res.status(404).json({
                        message: 'Category not found'
                    });
                }
            }

            // Update the article
            await Article.updateOne({ _id: articleId }, req.body);

            // Respond with success message after updating the article
            res.status(200).json({
                message: 'Article Updated'
            });
        } catch (error) {
            // Handle any errors that occur in the promise chain
            res.status(500).json({
                error
            });
        }
    },
    deleteArticle: async (req, res) => {
        const articleId = req.params.articleId;

        // Validate the articleId
        if (!mongoose.Types.ObjectId.isValid(articleId)) {
            return res.status(400).json({
                message: 'Invalid article ID, a valid ID should contain 24-characters hexadecimal string'
            });
        }

        try {
            // Find the article by ID
            const article = await Article.findById(articleId);
            if (!article) {
                // If the article is not found, return a 404 error
                return res.status(404).json({
                    message: 'Article not found'
                });
            }

            // If the article is found, delete it
            await Article.deleteOne({ _id: articleId });

            // Respond with success message after deleting the article
            res.status(200).json({
                message: `Article _id:${articleId} Deleted`
            });
        } catch (error) {
            // Handle any errors that occur in the promise chain
            res.status(500).json({
                error
            });
        }
    }
}
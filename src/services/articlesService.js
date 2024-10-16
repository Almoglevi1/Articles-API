import mongoose from 'mongoose';
import Article from '../models/Article';
import Category from '../models/Category';

export const getAllArticles = async () => {
    try {
        // Find all articles and populate the categoryId field with the title
        const articles = Article.find().populate('categoryId', 'title');

        // Check if no articles are found
        if (articles.length === 0) {
            throw new Error('No articles found');
        }

        return articles;
    } catch (error) {
        throw new Error('Error fetching articles: ' + error.message);
    }
};

export const createArticle = async (data, file) => {
    const { title, description, content, categoryId } = data;
    const { path: image } = file;

    // Validate the title
    if (!title || typeof title !== 'string' || title.trim() === '') {
        throw new Error('Invalid title, it should be a non-empty string');
    }

    // Validate the description
    if (!description || typeof description !== 'string' || description.trim() === '') {
        throw new Error('Invalid description, it should be a non-empty string');
    }

    // Validate the content
    if (!content || typeof content !== 'string' || content.trim() === '') {
        throw new Error('Invalid content, it should be a non-empty string');
    }

    // Validate the categoryId
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
        throw new Error('Invalid category ID, a valid ID should contain 24-characters hexadecimal string');
    }

    // Validate the image
    if (!image) {
        throw new Error('Image is required');
    }

    try {
        // Find the category by ID
        const category = await Category.findById(categoryId);
        if (!category) {
            throw new Error('Category not found');
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
    } catch (error) {
        throw new Error('Error creating article: ' + error.message);
    }
};

export const getArticle = async (articleId) => {
    // Validate the articleId
    if (!mongoose.Types.ObjectId.isValid(articleId)) {
        throw new Error('Invalid article ID, a valid ID should contain 24-characters hexadecimal string');
    }

    try {
        // Find the article by ID
        const article = await Article.findById(articleId);

        // If the article is not found, throw an error
        if (!article) {
            throw new Error('Article not found');
        }

        return article;
    } catch (error) {
        throw new Error('Error fetching article: ' + error.message);
    }
};

export const updateArticle = async (articleId, data) => {
    const { categoryId } = data;

    // Validate the articleId
    if (!mongoose.Types.ObjectId.isValid(articleId)) {
        throw new Error('Invalid article ID, a valid ID should contain 24-characters hexadecimal string');
    }

    // Validate the categoryId if provided
    if (categoryId && !mongoose.Types.ObjectId.isValid(categoryId)) {
        throw new Error('Invalid category ID, a valid ID should contain 24-characters hexadecimal string');
    }

    try {
        // Find the article by ID
        const article = await Article.findById(articleId);
        // If the article is not found, throw an error
        if (!article) {
            throw new Error('Article not found');
        }

        if (categoryId) {
            // If categoryId is provided, find the category by ID
            const category = await Category.findById(categoryId);
            if (!category) {
                // If the category is not found, throw an error
                throw new Error('Category not found');
            }
        }

        // Update the article with the provided data
        await Article.updateOne({ _id: articleId }, data);
    } catch (error) {
        throw new Error('Error updating article: ' + error.message);
    }
};

export const deleteArticle = async (articleId) => {
    // Validate the articleId
    if (!mongoose.Types.ObjectId.isValid(articleId)) {
        throw new Error('Invalid article ID, a valid ID should contain 24-characters hexadecimal string');
    }

    try {
        // Find the article by ID
        const article = await Article.findById(articleId);
        // If the article is not found, throw an error
        if (!article) {
            throw new Error('Article not found');
        }

        // If the article is found, delete it
        await Article.deleteOne({ _id: articleId });
    } catch (error) {
        throw new Error('Error deleting article: ' + error.message);
    }
};

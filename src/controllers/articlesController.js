import { getAllArticlesService, createArticleService, getArticleService, updateArticleService, deleteArticleService } from '../services/articlesService';

export const getAllArticles = async (req, res) => {
    try {
        const articles = await getAllArticlesService();
        res.status(200).json({ articles });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createArticle = async (req, res) => {
    try {
        await createArticleService(req.body, req.file);
        res.status(200).json({ message: 'Created article' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getArticle = async (req, res) => {
    try {
        const article = await getArticleService(req.params.articleId);
        res.status(200).json({ article });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateArticle = async (req, res) => {
    try {
        await updateArticleService(req.params.articleId, req.body);
        res.status(200).json({ message: 'Article Updated' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteArticle = async (req, res) => {
    try {
        await deleteArticleService(req.params.articleId);
        res.status(200).json({ message: `Article _id:${req.params.articleId} Deleted` });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

import { getAllCategories, createCategory, getCategory, updateCategory, deleteCategory } from '../services/categoriesService';

export const getAllCategories = async (req, res) => {
    try {
        const categories = await getAllCategories();
        res.status(200).json({ categories });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createCategory = async (req, res) => {
    try {
        await createCategory(req.body);
        res.status(201).json({ message: 'Category created' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getCategory = async (req, res) => {
    try {
        const category = await getCategory(req.params.categoryId);
        res.status(200).json({ category });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateCategory = async (req, res) => {
    try {
        await updateCategory(req.params.categoryId, req.body);
        res.status(200).json({ message: 'Category updated' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteCategory = async (req, res) => {
    try {
        await deleteCategory(req.params.categoryId);
        res.status(200).json({ message: `Category _id:${req.params.categoryId} deleted` });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
import { getAllCategoriesService, createCategoryService, getCategoryService, updateCategoryService, deleteCategoryService } from '../services/categoriesService';

export const getAllCategories = async (req, res) => {
    try {
        const categories = await getAllCategoriesService();
        res.status(200).json({ categories });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createCategory = async (req, res) => {
    try {
        await createCategoryService(req.body);
        res.status(201).json({ message: 'Category created' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getCategory = async (req, res) => {
    try {
        const category = await getCategoryService(req.params.categoryId);
        res.status(200).json({ category });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateCategory = async (req, res) => {
    try {
        await updateCategoryService(req.params.categoryId, req.body);
        res.status(200).json({ message: 'Category updated' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteCategory = async (req, res) => {
    try {
        await deleteCategoryService(req.params.categoryId);
        res.status(200).json({ message: `Category _id:${req.params.categoryId} deleted` });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
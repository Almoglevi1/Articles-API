import express from 'express';
import checkAuth from '../middlewares/checkAuth';
import { getAllCategories, createCategory, getCategory, updateCategory, deleteCategory } from '../controllers/categoriesController';

const router = express.Router();

// Route to get all categories
router.get('/', checkAuth, getAllCategories);

// Route to create a new category
router.post('/', checkAuth, createCategory);

// Route to get a specific category by its ID
router.get('/:categoryId', checkAuth, getCategory);

// Route to update an existing category by its ID
router.patch('/:categoryId', checkAuth, updateCategory);

// Route to delete a category by its ID
router.delete('/:categoryId', checkAuth, deleteCategory);

export default router;
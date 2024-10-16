import mongoose from 'mongoose';
import Category from '../models/Category';

export const getAllCategories = async () => {
    try {
        const categories = await Category.find();

        // Check if no categories are found
        if (categories.length === 0) {
            throw new Error('No categories found');
        }

        return categories;
    } catch (error) {
        throw new Error('Error fetching categories: ' + error.message);
    }
};

export const createCategory = async (data) => {
    // Validate the title
    if (!data.title || typeof data.title !== 'string' || data.title.trim() === '') {
        throw new Error('Invalid title, it should be a non-empty string');
    }

    // Validate the description
    if (!data.description || typeof data.description !== 'string' || data.description.trim() === '') {
        throw new Error('Invalid description, it should be a non-empty string');
    }

    // Create a new category instance
    const category = new Category({
        _id: new mongoose.Types.ObjectId(),
        title: data.title,
        description: data.description
    });

    try {
        // Save the category to the database
        await category.save();
    } catch (error) {
        throw new Error('Error creating category: ' + error.message);
    }
};

export const getCategory = async (categoryId) => {
    // Validate the categoryId
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
        throw new Error('Invalid category ID, a valid ID should contain 24-characters hexadecimal string');
    }

    try {
        // Find the category by ID
        const category = await Category.findById(categoryId);
        // If the category is not found, throw an error
        if (!category) {
            throw new Error('Category not found');
        }

        return category;
    } catch (error) {
        throw new Error('Error fetching category: ' + error.message);
    }
};

export const updateCategory = async (categoryId, data) => {
    // Validate the categoryId
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
        throw new Error('Invalid category ID, a valid ID should contain 24-characters hexadecimal string');
    }

    try {
        // Find the category by ID
        const category = await Category.findById(categoryId);
        // If the category is not found, throw an error
        if (!category) {
            throw new Error('Category not found');
        }

        // If the category is found, update it
        await Category.updateOne({ _id: categoryId }, data);
    } catch (error) {
        throw new Error('Error updating category: ' + error.message);
    }
};

export const deleteCategory = async (categoryId) => {
    // Validate the categoryId
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
        throw new Error('Invalid category ID, a valid ID should contain 24-characters hexadecimal string');
    }

    try {
        // Find the category by ID
        const category = await Category.findById(categoryId);
        // If the category is not found, throw an error
        if (!category) {
            throw new Error('Category not found');
        }

        // If the category is found, delete it
        await Category.deleteOne({ _id: categoryId });
    } catch (error) {
        throw new Error('Error deleting category: ' + error.message);
    }
};
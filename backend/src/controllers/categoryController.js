const Category = require('../models/categoryModel');

// Create a new category
const createCategory = async (req, res) => {
  const { name, description } = req.body;

  // Check if the user is an admin
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Unauthorized: Only admin can create categories' });
  }

  // Check if the category name already exists
  const existingCategory = await Category.findOne({ name });
  if (existingCategory) {
    return res.status(400).json({ message: 'Category with this name already exists' });
  }

  // Create and save the new category
  const category = new Category({ name, description });

  try {
    await category.save();
    res.status(201).json({ message: 'Category created successfully', category });
  } catch (error) {
    res.status(400).json({ message: 'Category creation failed', error: error.message });
  }
};

const getAllCategories = async (req, res) => {
    try {
      const categories = await Category.find();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching categories', error: error.message });
    }
  };

  const updateCategory = async (req, res) => {
    const categoryId = req.params.id;
    const { name, description } = req.body;
  
    try {
      const category = await Category.findById(categoryId);
  
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
  
      // Check if the user is an admin
      if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Unauthorized: Only admin can update categories' });
      }
  
      category.name = name;
      category.description = description;
  
      await category.save();
  
      res.json({ message: 'Category updated successfully', category });
    } catch (error) {
      res.status(400).json({ message: 'Category update failed', error: error.message });
    }
  };


  const getCategoryById = async (req, res) => {
    const categoryId = req.params.id;
  
    try {
      const category = await Category.findById(categoryId);
  
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
  
      res.json(category);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching category', error: error.message });
    }
  };

  const deleteCategory = async (req, res) => {
    const categoryId = req.params.id;
  
    try {
      const category = await Category.findById(categoryId);
  
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
  
      // Check if the user is an admin
      if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Unauthorized: Only admin can delete categories' });
      }
  
      await category.remove();
      res.json({ message: 'Category deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting category', error: error.message });
    }
  };
  
  const deleteAllCategories = async (req, res) => {
    try {
      // Check if the user is an admin
      if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Unauthorized: Only admin can delete categories' });
      }
  
      await Category.deleteMany({});
      res.json({ message: 'All categories deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting all categories', error: error.message });
    }
  };
  
  
module.exports = { 
    createCategory,
    getAllCategories,
    updateCategory,
    getCategoryById,
    deleteCategory,
    deleteAllCategories
};

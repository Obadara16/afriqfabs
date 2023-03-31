const Category = require('../models/categoryModel');
const slugify = require('slugify');
const SubCategory = require('../models/subCategoryModel')

// Get all categories
const getAllCategories = async (req, res) => {
    try {
      const categories = await Category.find({});
      res.json(categories);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  };

// Get single category
const getSingleCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Create a category
const createCategory = async (req, res) => {
    const { name } = req.body;
    const slug = slugify(req.body.name, { lower: true }); // Add slug to the controller

    
    try {
      // Check if a category with the same slug already exists
      const existingCategory = await Category.findOne({ slug });
      if (existingCategory) {
        return res.status(409).json({ message: 'Category with the same slug already exists' });
      }
      
      // Create a new category document with the provided name and slug values
      const newCategory = new Category({ name, slug });
      await newCategory.save();
      
      res.status(201).json({ message: 'Category created successfully', category: newCategory });
    } catch (error) {
      res.status(500).json({ message: 'Failed to create category', error });
    }
  }  
  

// Update a category
const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    category.name = name;
    await category.save();
    res.json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Delete a category
const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getAllCategories,
  getSingleCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};

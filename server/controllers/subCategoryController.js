const Category = require("../models/categoryModel");
const slugify = require("slugify");
const SubCategory = require("../models/subCategoryModel");

// Create a subcategory
const createSubcategory = async (req, res) => {
  const { name, parentCategorySlug } = req.body;
  const slug = slugify(req.body.name, { lower: true }); // Add slug to the controller

  try {
    // Check if the parent category exists
    const existingCategory = await Category.find({ slug: parentCategorySlug });
    if (!existingCategory) {
      return res.status(404).json({ message: "Parent category not found" });
    }

    // Check if a subcategory with the same slug already exists under the parent category
    const existingSubcategory = await SubCategory.findOne({
      slug,
      parentCategorySlug,
    });
    if (existingSubcategory) {
      return res.status(409).json({
        message:
          "Subcategory with the same slug already exists under the parent category",
      });
    }

    // Create a new subcategory document with the provided name, slug, and category values
    const newSubcategory = new SubCategory({ name, slug, parentCategorySlug });
    await newSubcategory.save();

    res.status(201).json({
      message: "Subcategory created successfully",
      subcategory: newSubcategory,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to create subcategory", error });
  }
};

//Get all subcategories

const getSubcategories = async (req, res) => {
  const { parentCategorySlug } = req.query;
  try {
    let subcategories;
    if (parentCategorySlug) {
      subcategories = await SubCategory.find({
        parentCategorySlug: parentCategorySlug,
      });
    } else {
      subcategories = await SubCategory.find();
    }
    res.json(subcategories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createSubcategory,
  getSubcategories,
};

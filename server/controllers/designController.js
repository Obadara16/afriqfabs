const Design = require("../models/designModel");
const Category = require("../models/categoryModel");
const SubCategory = require("../models/subCategoryModel");
const Review = require("../models/reviewModel");
const multer = require("multer");
const upload = require("../middlewares/multer");
const cloudinary = require("../middlewares/cloudinary");
const slugify = require("slugify");

// CREATE PRODUCT
const createDesign = async (req, res) => {
  const { categorySlug } = req.body;

  try {
    const result = await cloudinary.uploader.upload(req.file.path);

    // Get category object based on slug
    const category = await Category.findOne({ slug: categorySlug });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const slug = slugify(req.body.title, { lower: true });

    const newDesign = new Design({
      title: req.body.title,
      slug: slug,
      img: result.secure_url,
      categories: [
        {
          _id: category._id,
          slug: category.slug,
        },
      ],
      rows: req.body.rows,
      columns: req.body.columns,
    });

    const savedDesign = await newDesign.save();

    res.status(200).json(savedDesign);
  } catch (err) {
    res.status(400).json(err);
  }
};

// UPDATE PRODUCT
const updateDesign = async (req, res) => {
  try {
    const updatedDesign = await Design.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(updatedDesign);
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(404).json({ message: "Design not found" });
    }
    res.status(400).json(err);
  }
};

// DELETE Design
const deleteDesign = async (req, res) => {
  try {
    await Design.findByIdAndDelete(req.params.id);
    res.status(200).json("Design has been deleted...");
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(404).json({ message: "Design not found" });
    }
    res.status(400).json(err);
  }
};

// GET SINGLE PRODUCT
const getSingleDesign = async (req, res) => {
  const { slug } = req.params;
  try {
    const design = await Design.findOne({ slug: slug });
    res.status(200).json(design);
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(404).json({ message: "Design not found" });
    }
    res.status(400).json(err);
  }
};

// // GET ALL PRODUCTS
// const getAllDesigns = async(req, res) => {
//     const qNew = req.query.new;
//     const qCategory = req.query.category;

//     try {
//     let products;
//     if (qNew) {
//         products = await Product.find().sort({ createdAt: -1 }).limit(1);
//     } else if (qCategory) {
//         products = await Product.find({
//         categories: {
//             $in: [qCategory],
//         },
//         });
//     } else {
//         products = await Product.find();
//     }

//         res.status(200).json(products);
//     } catch (err) {
//         res.status(400).json(err);
//     }
// };

const getAllDesigns = async (req, res) => {
  const { categorySlug } = req.query;

  try {
    let designs;
    if (categorySlug) {
      // Get designs based on category and subcategory slugs
      designs = await Design.find({
        "categories.slug": categorySlug,
      })
        .populate("categories._id")
    } else if (categorySlug) {
      // Get Designs based on category slug
      designs = await Design.find({
        "categories.slug": categorySlug,
      })
        .populate("categories._id")
    
    } else {
      // Get all designs
      designs = await Design.find()
        .populate("categories._id")
    }

    res.json(designs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};




module.exports = {
  createDesign,
  getAllDesigns,
  getSingleDesign,
  deleteDesign,
  updateDesign,
};

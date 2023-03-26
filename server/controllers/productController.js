const Product = require("../models/productModel");
const Review = require("../models/reviewModel");
const multer = require("multer")
const upload = require("../middlewares/multer")
const cloudinary = require("../middlewares/cloudinary")

// CREATE PRODUCT
const createProduct = async(req, res) => {
    try {
      const result = await cloudinary.uploader.upload(req.file.path);
      const newProduct = new Product({
        title: req.body.title,
        desc: req.body.desc,
        img: result.secure_url, // use the secure_url returned from Cloudinary
        categories: req.body.categories,
        size: req.body.size,
        color: req.body.color,
        price: req.body.price,
        inStock: req.body.inStock
      });
      const savedProduct = await newProduct.save();
      res.status(200).json(savedProduct);
    } catch (err) {
      res.status(400).json(err);
    }
  };
  

// UPDATE PRODUCT
const updateProduct = async(req, res) => {
    
    
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        {
        $set: req.body,
        },
        { new: true }
        );

        res.status(200).json(updatedProduct);
    } catch (err) {
        if (err.name === "CastError") {
            return res.status(404).json({ message: "Product not found" });
          }
        res.status(400).json(err);
    }
};

// DELETE PRODUCT
const deleteProduct = async(req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json("Product has been deleted...");
    } catch (err) {
        if (err.name === "CastError") {
            return res.status(404).json({ message: "Product not found" });
          }
        res.status(400).json(err);
    }
};

// GET SINGLE PRODUCT
const getSingleProduct = async(req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    } catch (err) {
        if (err.name === "CastError") {
            return res.status(404).json({ message: "Product not found" });
          }
        res.status(400).json(err);
    }
};

// GET ALL PRODUCTS
const getAllProducts = async(req, res) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;

    try {
    let products;
    if (qNew) {
        products = await Product.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
        products = await Product.find({
        categories: {
            $in: [qCategory],
        },
        });
    } else {
        products = await Product.find();
    }
    
        res.status(200).json(products);
    } catch (err) {
        res.status(400).json(err);
    }
};
    
// CREATE PRODUCT REVIEW
const createProductReview = async(req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }  

        const review = new Review({
            user: req.user._id,
            product: product._id,
            rating: req.body.rating,
            comment: req.body.comment,
        });
            
        const savedReview = await review.save();
        product.reviews.push(savedReview._id);
        product.numReviews = product.reviews.length;
        product.rating =
        product.reviews.reduce((a, c) => c.rating + a, 0) / product.numReviews;
        await product.save();
        res.status(200).json({ message: "Review added successfully"});
    } catch (err) {
        if (err.name === "CastError") {
            return res.status(404).json({ message: "Product not found" });
          }
        res.status(400).json(err);
    }
};
        
// GET ALL REVIEWS FOR A PRODUCT
const getProductReview = async(req, res) => {
    try {
        const reviews = await Review.find({ product: req.params.id })
        .populate("user", "_id name")
        .select("-__v");

        if (!reviews) {
            return res.status(404).json({ message: "No reviews found" });
        }

        res.status(200).json(reviews);
    } catch (err) {
        if (err.name === "CastError") {
            return res.status(404).json({ message: "Product not found" });
          }
        res.status(400).json({ err: 'Internal server error' })
    }
}

const updateProductReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
  
        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }
  
        if (req.user._id.toString() !== review.user.toString()) {
            return res.status(401).json({ message: "Unauthorized" });
        }
  
        const { rating, comment } = req.body;
        review.rating = rating || review.rating;
        review.comment = comment || review.comment;
        review.updatedAt = Date.now();
  
        const savedReview = await review.save();
  
        const product = await Product.findById(review.product);
        const reviews = await Review.find({ product: product._id });
        const numReviews = reviews.length;
        const ratingSum = reviews.reduce((acc, review) => acc + review.rating, 0);
        const averageRating = ratingSum / numReviews;
  
        product.rating = averageRating;
        product.numReviews = numReviews;
  
        await product.save();
  
        res.status(200).json({ message: "Review updated successfully" });
    } catch (err) {
        console.log(err);
        if (err.name === "CastError") {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(400).json(err);
    }
};

  

  

module.exports = {createProduct, getAllProducts, getSingleProduct, deleteProduct, updateProduct, createProductReview, getProductReview, updateProductReview}
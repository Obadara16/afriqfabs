const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  desc: {
    type: String,
    required: true
  },
  img: {
    type: String,
    required: true
  },
  categories: [{
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true
    },
    slug: {
      type: String,
      required: true
    }
  }],
  subcategories: [{
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SubCategory',
      required: true
    },
    slug: {
      type: String,
      required: true
    }
  }],
  size: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  featured: {
    type: Boolean,
    default: false,
    required: true
  },
  inStock: {
    type: Boolean,
    required: true
  }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;

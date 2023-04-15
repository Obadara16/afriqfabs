const Cart = require('../models/cartModel');
const mongoose = require("mongoose")

// Create a new cart
const createCart = async (req, res) => {
  try {
    const cart = await Cart.findOneAndUpdate(
      { userId },
      { userId, products, quantity, total },
      { upsert: true }
    );
    res.status(200).send(cart);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// Get all carts
const getAllCarts = async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json({ carts });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a single cart by ID
const getCartById = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId })
    if (!cart) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ cart });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a cart by ID
const updateCartById = async (req, res) => {
  try {
    const cart = await Cart.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.status(200).json({ cart });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a cart by ID
const deleteCartById = async (req, res) => {
  try {
    const cart = await Cart.findByIdAndDelete(req.params.id);
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.status(204).json();
  } catch (error) {{message: "cart removed successfully"}
    res.status(400).json({ error: error.message });
  }
};


module.exports = {createCart, getAllCarts, getCartById, updateCartById, deleteCartById}
const Cart = require("../models/cartModel");
const mongoose = require("mongoose");

// Create a new cart
const createCart = async (req, res) => {
  try {
    const { userId, cart } = req.body;
    const updatedCart = await Cart.findOneAndUpdate(
      { user: userId },
      { products: cart.products, quantity: cart.quantity, total: cart.total },
      { new: true, upsert: true }
    );
    res.json({ message: "Cart updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error syncing cart with server" });
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
    const { userId } = req.params;
    const cart = await Cart.findOne({ user: userId });
    res.json({ cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error loading cart from server" });
  }
};

// Update a cart by ID
const updateCartById = async (req, res) => {
  try {
    const cart = await Cart.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
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
      return res.status(404).json({ message: "Cart not found" });
    }
    res.status(204).json();
  } catch (error) {
    {
      message: "cart removed successfully";
    }
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createCart,
  getAllCarts,
  getCartById,
  updateCartById,
  deleteCartById,
};

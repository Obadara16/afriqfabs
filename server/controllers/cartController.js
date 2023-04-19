const Cart = require("../models/cartModel");
const mongoose = require("mongoose");

// Create a new cart
// const createCart = async (req, res) => {
//   try {
//     const { userId, cart } = req.body;
//     console.log("this is the cart received from client", cart)
//     const updatedCart = await Cart.findOneAndUpdate(
//       { user: userId },
//       { products: cart.products, quantity: cart.quantity, total: cart.total },
//       { new: true, upsert: true }
//     );
//     res.json({ message: "Cart updated successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error syncing cart with server" });
//   }
// };

const createCart = async (req, res) => {
  try {
    const { userId, cart } = req.body;
    if (!cart || !cart.products) {
      return res.status(400).json({ message: "Invalid request body" });
    }
    console.log("this is the cart received from client", cart);

    const productsWithQuantity = cart.products.map((product) => ({
      product: product.product,
      quantity: product.quantity,
    }));

    const existingCart = await Cart.findOne({ user: userId });
    if (existingCart) {
      const newProducts = productsWithQuantity.filter(
        (newProduct) =>
          !existingCart.products.some(
            (existingProduct) =>
              existingProduct.product.toString() ===
              newProduct.product.toString()
          )
      );
      const mergedProducts = existingCart.products.concat(newProducts);
      const updatedCart = await Cart.findOneAndUpdate(
        { user: userId },
        {
          $set: { products: mergedProducts },
        },
        { new: true }
      );
      res.json({ products: updatedCart.products });
    } else {
      const newCart = new Cart({
        user: userId,
        products: productsWithQuantity,
      });
      const savedCart = await newCart.save();
      res.json({ products: savedCart.products });
      console.log(savedCart.products);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error syncing cart with server" });
  }
};

// Get a single cart by ID
const getCartById = async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    // Map the products array to include the quantity field for each product
    const productsWithQuantity = cart.products.map((product) => ({
      ...product.toObject(),
      quantity: product.quantity,
    }));

    console.log(cart);
    res.status(200).json({ products: productsWithQuantity });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error getting cart from backend" });
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

// Update a cart by ID
const updateCartById = async (req, res) => {
  try {
    const { userId } = req.params;
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

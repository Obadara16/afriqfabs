import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  products: localStorage.getItem("carts")
    ? JSON.parse(localStorage.getItem("carts"))
    : [],
  quantity: 0,
  total: 0,
  shouldSync: false, // Add a shouldSync value to the state
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct(state, action) {
      // Set shouldSync to true when the cart is updated
      state.shouldSync = true;

      const { product, quantity } = action.payload;
      const existingProduct = state.products.find((p) => p._id === product._id);
      if (existingProduct) {
        existingProduct.quantity += 1;
        // toast.info("Product quantity increased in cart", {
        //   position: "top-right",
        // })
      } else {
        state.products.push({ ...product, quantity });
        toast.success("Added a new product to cart", {
          position: "top-right",
        });
      }
      state.total += product.price * quantity;
    },
    increaseQuantity(state, action) {
      // Set shouldSync to true when the cart is updated
      state.shouldSync = true;

      const { _id } = action.payload;
      console.log(action.payload);
      const productIndex = state.products.findIndex(
        (product) => product._id === action.payload
      );

      if (state.products[productIndex].quantity > 0) {
        state.products[productIndex].quantity += 1;

        // Recalculate total amount based on updated quantity
        const newTotalAmount = state.products.reduce(
          (total, product) => total + product.price * product.quantity,
          0
        );
        state.total = parseFloat(newTotalAmount.toFixed(2));
        }
      },
      decreaseQuantity(state, action) {
        // Set shouldSync to true when the cart is updated
        state.shouldSync = true;
      
        const { _id } = action.payload;
        console.log(action.payload);
        const productIndex = state.products.findIndex(
          (product) => product._id === action.payload
        );
      
        if (state.products[productIndex].quantity > 1) {
          state.products[productIndex].quantity -= 1;
      
          // Recalculate total amount based on updated quantity
          const newTotalAmount = state.products.reduce(
            (total, product) => total + product.price * product.quantity,
            0
          );
          state.total = parseFloat(newTotalAmount.toFixed(2));
        } else {
          // Remove the product from the cart if quantity is 0
          state.products.splice(productIndex, 1);
        }
      },
      removeProduct(state, action) {
        // Set shouldSync to true when the cart is updated
        state.shouldSync = true;
      
        const productId = action.payload;
        const productIndex = state.products.findIndex(
          (product) => product._id === productId
        );
      
        if (productIndex !== -1) {
          const product = state.products[productIndex];
          const productTotal = product.price * product.quantity;
      
          state.total -= productTotal;
          state.quantity -= product.quantity;
          state.products.splice(productIndex, 1);
      
          toast.error("Removed product from cart", {
            position: "top-right",
          });
        }
      },
      
    clearCart(state) {
      // Set shouldSync to true when the cart is updated
      state.shouldSync = true;
    
      state.products = [];
      state.quantity = 0;
      state.total = 0;
      localStorage.removeItem("carts");
    },
  },
});

export const {
  addProduct,
  increaseQuantity,
  decreaseQuantity,
  removeProduct,

  clearCart,
} = cartSlice.actions;

// Define an asynchronous thunk action to sync the cart data with the server
export const syncCart = () => async (dispatch, getState) => {
  try {
    const { cart } = getState();
    const response = await axios.post("/api/cart", cart.products);
    if (response.status === 200) {
      dispatch({ type: "cart/setShouldSync", payload: false });
      localStorage.removeItem("carts");
    }
    } catch (error) {
      console.log(error);
    }
  };
    


export default cartSlice.reducer;

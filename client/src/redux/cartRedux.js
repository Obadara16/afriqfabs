import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { userRequest } from "../requestMethods";

const initialState = {
  user: null,
  products: [],
  shouldSync: false,
};

// Thunk to sync cart with server
export const syncCart = createAsyncThunk(
  "cart/syncCart",
  async ({ userToken, cart }) => {
    try {
      const response = await userRequest(userToken).post(
        "/cart",
        cart
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct(state, action) {
      state.shouldSync = true;
      console.log("shouldsync in addProduct", state.shouldSync)
      const { product, quantity } = action.payload;
      const existingProduct = state.products.find((p) => p._id === product._id);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.products.push({ ...product, quantity });
        toast.success("Added a new product to cart", {
          position: "top-right",
        });
      }
      if (!state.user) {
        localStorage.setItem("carts", JSON.stringify(state.products));
      }
    },
    increaseQuantity(state, action) {
      state.shouldSync = true;
      const { _id } = action.payload;
      const productIndex = state.products.findIndex(
        (product) => product._id === action.payload
      );
      if (state.products[productIndex].quantity > 0) {
        state.products[productIndex].quantity += 1;
        
        if (!state.user) {
          localStorage.setItem("carts", JSON.stringify(state.products));
        }
      }
    },
    decreaseQuantity(state, action) {
      state.shouldSync = true;
      const { _id } = action.payload;
      const productIndex = state.products.findIndex(
        (product) => product._id === action.payload
      );
      if (state.products[productIndex].quantity > 1) {
        state.products[productIndex].quantity -= 1;
        if (!state.user) {
          localStorage.setItem("carts", JSON.stringify(state.products));
        }
      } else {
        state.products.splice(productIndex, 1);
        if (!state.user) {
          localStorage.setItem("carts", JSON.stringify(state.products));
        }
        toast.error("Product removed from cart", {
          position: "top-right",
        });
      }
    },
    removeProduct(state, action) {
      // Set shouldSync to true when the cart is updated
      state.shouldSync = true;

      const { _id } = action.payload;

      const productIndex = state.products.findIndex(
        (product) => product._id === action.payload
      );

      if (productIndex !== -1) {
        const product = state.products[productIndex];

        state.products.splice(productIndex, 1);

        if (!state.user) {
          // Save cart to local storage for unauthenticated users
          localStorage.setItem("carts", JSON.stringify(state.products));
        }
      }
    },
    
    clearCart(state) {
      state.products = [];
      if (!state.user) {
        // Remove cart from local storage for unauthenticated users
        localStorage.removeItem("carts");
      }
    },
    setUser(state) {
      state.products = []
    },
    clearUserCart(state) {
      state.products = [];
        // Set shouldSync to true when the cart is updated
      state.shouldSync = true;

      if (state.user) {
        axios
          .delete(`/cart/${state.user._id}`)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.error(err);
            toast.error("Failed to clear cart", {
              position: "top-right",
            });
          });
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(syncCart.pending, (state) => {
    state.shouldSync = false;
    })
    .addCase(syncCart.fulfilled, (state) => {
    state.shouldSync = false;
    });
    },
  });
  
  export const { addProduct, increaseQuantity, decreaseQuantity, removeProduct, clearCart, clearUserCart, setUser } = cartSlice.actions;
  
  export default cartSlice.reducer;
  
  
  
  
  
  

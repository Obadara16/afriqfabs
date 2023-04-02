import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";

const initialState = {
  products: localStorage.getItem("carts")
    ? JSON.parse(localStorage.getItem("carts"))
    : [],
  quantity: 0,
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct(state, action) {
      const { product, quantity } = action.payload;
      const existingProduct = state.products.find((p) => p._id === product._id);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.products.push({ ...product, quantity });
      }
      state.total += product.price * quantity;
      if (state.isUserAuthenticated) {
        axios.post("/api/cart", { carts: state.products })
          .then(() => console.log("Cart updated on server"))
          .catch((error) => console.log(error));
      } else {
        localStorage.setItem("carts", JSON.stringify(state.products));
      }
    },
    increaseQuantity(state, action) {
      const {_id } = action.payload
      console.log(action.payload)
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


        toast.info("Increased product quantity", {
          position: "bottom-left",
        });
      } 

      if (state.isUserAuthenticated) {
        axios.post("/api/cart", { carts: state.products })
          .then(() => console.log("Cart updated on server"))
          .catch((error) => console.log(error));
      } else {
        localStorage.setItem("carts", JSON.stringify(state.products));
      }
    },
    decreaseQuantity(state, action) {
      const { _id } = action.payload;
      const productIndex = state.products.findIndex(
        (product) => product._id === action.payload
      );
    
      if (state.products[productIndex].quantity > 1) {
        state.products[productIndex].quantity -= 1;
    
        const product = state.products[productIndex];
        state.total -= product.price;
    
        toast.info("Decreased product quantity", {
          position: "bottom-left",
        });
      } else if (state.products[productIndex].quantity === 1) {
        const removedProduct = state.products[productIndex];
        state.products.splice(productIndex, 1);
        state.total -= removedProduct.price;
    
        toast.error("Product removed from cart", {
          position: "bottom-left",
        });
      }
    
      if (state.isUserAuthenticated) {
        axios.post("/api/cart", { carts: state.products })
          .then(() => console.log("Cart updated on server"))
          .catch((error) => console.log(error));
      } else {
        localStorage.setItem("carts", JSON.stringify(state.products));
      }
    },    
    removeProduct(state, action) {
      const { _id } = action.payload;
      state.products.map((product) => {
        if (product._id === action.payload) {

          const nextcarts = state.products.filter(
            (product) => product._id !== action.payload
          );

          state.products = nextcarts;
          state.total -= (product.price * product.quantity)

          if (state.products === null) {
            quantity: 0;
          }

          toast.error("Product removed from cart", {
            position: "bottom-left",
          });
        }
        if (state.isUserAuthenticated) {
          axios.post("/api/cart", { carts: state.products })
            .then(() => console.log("Cart updated on server"))
            .catch((error) => console.log(error));
        } else {
          localStorage.setItem("carts", JSON.stringify(state.products));
        }
        return state;
      });
    },
    clearCart(state) {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
      localStorage.removeItem("carts");

      if (state.isUserAuthenticated) {
        axios.post("/api/cart", { carts: state.products })
          .then(() => console.log("Cart cleared on server"))
          .catch((error) => console.log(error));
      }
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
    
    export default cartSlice.reducer;
    

import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  user: null,
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
    setShouldSync(state, action) {
      state.shouldSync = action.payload;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
  },
});

export const {
  addProduct,
  increaseQuantity,
  decreaseQuantity,
  removeProduct,
  clearCart,
  setShouldSync,
  setUser
} = cartSlice.actions;

// Define an asynchronous thunk action to sync the cart data with the server
export const syncCart = () => async (dispatch, getState) => {
  const { cart } = getState();
  const { user } = cart;

  if (!user) {
    console.log("User is not authenticated");
    return;
  }

  try {
    const response = await axios.post("/api/cart", {
      user,
      products: cart.products,
      quantity: cart.quantity,
      total: cart.total,
    });

    if (response.status === 200) {
      dispatch({ type: "cart/setShouldSync", payload: false });
      localStorage.removeItem("cart");
    }
  } catch (error) {
    console.log(error);
  }
};

    


export default cartSlice.reducer;

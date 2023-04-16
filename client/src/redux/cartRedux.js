import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { authedRequest } from "../requestMethods";

const initialState = {
  user: null,
  products: [],
  quantity: 0,
  total: 0,
  shouldSync: false,
};


// Thunk action creator to load the cart from the server when the user logs in
export const loadCartFromServer = createAsyncThunk(
  "cart/loadCartFromServer",
  async (id) => {
    try {
      console.log("this is the id boy", id)
      const response = await authedRequest.get(`/cart/${id}`);
      return response.data.cart;
      console.log("loaded cart" ,response.data.cart)
    } catch (error) {
      console.error(error);
      toast.error("Error loading cart from server", {
        position: "top-right",
      });
    }
  }
);



// Thunk action creator to save the cart to the server when the user logs in
export const saveCartToServer = createAsyncThunk(
  "cart/saveCartToServer",
  async (cart, { getState }) => {
    try {
      const { user } = getState().cart.user;
      console.log("this is the user", user)
      console.log("this is the cart", cart)
      if (user) {
        await authedRequest.put(`/cart`, { userId: user._id, cart });
      }
    } catch (error) {
      console.error(error);
      toast.error("Error syncing cart with server", {
        position: "top-right",
      });
    }
  }
);





const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct(state, action) {
      state.shouldSync = true;
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
      state.total += product.price * quantity;
      state.quantity += quantity
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
        const newTotalAmount = state.products.reduce(
          (total, product) => total + product.price * product.quantity,
          0
        );
        const totalQuantity = state.products.reduce(
          (quantity, product) => quantity +  product.quantity,
          0
        );
        state.quantity = parseFloat(totalQuantity.toFixed(2));
        state.total = parseFloat(newTotalAmount.toFixed(2));
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
        const newTotalAmount = state.products.reduce(
          (total, product) => total + product.price * product.quantity,
          0
        );
        const totalQuantity = state.products.reduce(
          (quantity, product) => quantity +  product.quantity,
          0
        );
        state.quantity = parseFloat(totalQuantity.toFixed(2));
        state.total = parseFloat(newTotalAmount.toFixed(2));
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
    setQuantity(state, action) {
      state.shouldSync = true;
      const { _id, quantity } = action.payload;
      const productIndex = state.products.findIndex(
        (product) => product._id === action.payload._id);
        if (quantity >= 1) {
          state.products[productIndex].quantity = quantity;
          const newTotalAmount = state.products.reduce(
            (total, product) => total + product.price * product.quantity,
            0
          );
          state.total = parseFloat(newTotalAmount.toFixed(2));
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
          (product) => product._id === action.payload._id
        );
      
        if (productIndex !== -1) {
          const product = state.products[productIndex];
          state.total -= product.price * product.quantity;
          state.quantity = state.quantity - product.quantity
          state.products.splice(productIndex, 1);
          if (!state.user) {
            // Save cart to local storage for unauthenticated users
            localStorage.setItem("carts", JSON.stringify(state.products));
          }
        }
      },
      clearCart(state) {
        state.products = [];
        state.quantity = 0;
        state.total = 0;
        if (!state.user) {
          // Remove cart from local storage for unauthenticated users
          localStorage.removeItem("carts");
        }
      },
      setUser(state, action) {
        state.user = action.payload;
      },
      setCart(state, action) {
        state.products = action.payload.products;
        state.quantity = action.payload.quantity;
        state.total = action.payload.total;
        state.shouldSync = false; // Reset shouldSync to false after syncing with server
      },
      setShouldSync(state, action) {
        state.shouldSync = action.payload;
      },  
      updateCart(state, action) {
        state.products = action.payload.products;
        state.total = action.payload.total;
        state.quantity = action.payload.quantity;
      }
    },
        extraReducers: (builder) => {
          builder
            .addCase(clearCart, (_, { payload }) => {
              dispatch(saveCartToServer(payload));
            })
            .addCase(loadCartFromServer.fulfilled, (state, action) => {
              state.products = action.payload.products;
              state.quantity = action.payload.quantity;
              state.total = action.payload.total;
              state.shouldSync = false;
            })
            .addCase(saveCartToServer.fulfilled, (state, action) => {
              state.shouldSync = false;
            })
            .addCase(saveCartToServer.rejected, (state, action) => {
              state.shouldSync = false;
              console.error(action.error);
              toast.error("Error syncing cart with server", {
                position: "top-right",
              });
            });
        },
        });
        
        export const { addProduct, 
                      increaseQuantity, 
                      decreaseQuantity, 
                      setQuantity,
                      removeProduct,
                      clearCart,
                      setShouldSync,
                      setUser,
                      setCart, 
                      updateCart
                    } =
                    cartSlice.actions;
        
        export default cartSlice.reducer;
        
     

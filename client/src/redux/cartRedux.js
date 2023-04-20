import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { userRequest } from "../requestMethods";

const initialState = {
  user: null,
  products: [],
  shouldSync: false,
};




// Thunk action creator to load the cart from the server when the user logs in
// export const loadCartFromServer = createAsyncThunk(
//   "cart/loadCartFromServer",
//   async (id) => {
//     try {
//       const response = await userRequest.get(`/cart/${id}`);
//       console.log("loaded cart", response.data.cart);
//       toast.success("I have loaded the cart from the server", {
//         position: "top-right",
//       });
//       return response.data.cart;
      
//     } catch (error) {
//       console.error(error);
//       toast.error("Error loading cart from server", {
//         position: "top-right",
//       });
//     }
//   }
// );

// Thunk action creator to save the cart to the server when the user logs in
// export const saveCartToServer = createAsyncThunk(
//   "cart/saveCartToServer",
//   async (id, { getState }) => {
//     try {
//       const cartProducts = getState().cart;
//       console.log("this is the cart before sending to server", cartProducts);
//       console.log("this is the user id before sending to server", id);
      
      
//       if (id) {
//         await userRequest.put(`/cart`, { userId: id, cart: cartProducts });
//         toast.success("I have updated the cart to the server", {
//           position: "top-right",
//         });
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Error syncing cart with server", {
//         position: "top-right",
//       });
//     }
//   }
// );

// export const deleteProductFromServer = createAsyncThunk(
//   "cart/deleteProductFromServer",
//   async (id) => {
//     try {
//       const response = await userRequest.delete(`/cart/${id}`);
//       console.log("loaded cart", response.data);
//       toast.success("I have deleted a product from the server", {
//         position: "top-right",
//       });
//       return response.data;
      
//     } catch (error) {
//       console.error(error);
//       toast.error("Error deleting product from server", {
//         position: "top-right",
//       });
//     }
//   }
// );



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
    clearUserCart(state) {
      state.products = [];
      state.user = null;
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
      state.shouldSync = false; // Reset shouldSync to false after syncing with server
    },
    setShouldSync(state, action) {
      state.shouldSync = action.payload;
    },
    updateCart(state, action) {
      state.products = action.payload.products;
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     // .addCase(clearCart, (_, { payload }) => {
  //     //   dispatch(saveCartToServer(payload));
  //     // })
  //     .addCase(loadCartFromServer.fulfilled, (state, action) => {
  //       cartSlice.caseReducers.setCart(state, action);
  //       state.products = action.payload.products;
  //       state.shouldSync = false;
  //     })
  //     // .addCase(saveCartToServer.fulfilled, (state, action) => {
  //     //   state.shouldSync = true;
  //     // })
  //     .addCase(saveCartToServer.rejected, (state, action) => {
  //       state.shouldSync = false;
  //       console.error(action.error);
  //     });
  // },
});

export const {
  addProduct,
  increaseQuantity,
  decreaseQuantity,
  removeProduct,
  clearCart,
  setShouldSync,
  setUser,
  setCart,
  updateCart,
  clearUserCart,
} = cartSlice.actions;

// export const saveCartMiddleware = ({ getState, dispatch }) => (next) => (action) => {
//   const result = next(action);
//   const state = getState().cart;
//   if (state.user && (action.type === 'cart/clearCart' || action.type === "cart/addProduct" || action.type === 'cart/increaseQuantity' || action.type === 'cart/decreaseQuantity' || action.type === 'cart/removeProduct')) {
//     console.log("i moved a step further")
//     dispatch(saveCartToServer(state.user))
//       .then(() => {
//         dispatch(loadCartFromServer(state.user));
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }

//   return result;
// };


// export const deleteCartMiddleware = ({ getState, dispatch }) => (next) => (action) => {
//   const result = next(action);
//   const state = getState().cart;
//   if (state.user && (action.type === 'cart/removeProduct')) {
//     console.log("i moved a step further")
//     dispatch(deleteProductFromServer(state.user))
//       .then(() => {
//         dispatch(loadCartFromServer(state.user));
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }

//   return result;
// };

export default cartSlice.reducer;

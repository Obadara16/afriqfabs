import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { authedRequest } from "../requestMethods";

const initialState = {
  user: null,
  products: [],
  cartQuantity: 0,
  quantity: 0,
  total: 0,
  shouldSync: false,
};


// Thunk action creator to load the cart from the server when the user logs in
export const loadCartFromServer = createAsyncThunk(
  "cart/loadCartFromServer",
  async (id) => {
    try {
      const response = await authedRequest.get(`/cart/${id}`);
      console.log("loaded cart" ,response.data.cart)
      return response.data.cart;
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
      const cartState = getState().cart;
      const user  = cartState.user.user;
      if (user) {
        await authedRequest.put(`/cart`, { userId: user._id, cart: cartState});
        toast.success("Cart synced successfully from the client", {
          position: "top-right",
        });
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
    removeProduct(state, action) {
      // Set shouldSync to true when the cart is updated
      state.shouldSync = true;
          
      const { _id } = action.payload;
    
      const productIndex = state.products.findIndex(
        (product) => product._id === action.payload
      );
          
      if (productIndex !== -1) {
        const product = state.products[productIndex];
        state.total -= product.price * product.quantity;
    
        state.products.splice(productIndex, 1);
    
        // Update cartQuantity by subtracting the quantity of the removed product
        state.quantity -= product.quantity;
    
        if (!state.user) {
          // Save cart to local storage for unauthenticated users
          localStorage.setItem("carts", JSON.stringify(state.products));
        }
      }
    },
      getCartsQuantity(state) {
        state.cartQuantity = state.products.reduce(
          (total, product) => total + product.quantity,
          0
        );
      },
      clearCart(state) {
        state.products = [];
        state.quantity = 0;
        state.cartQuantity = 0;
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
        state.cartQuantity = action.payload.cartQuantity
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
        state.cartQuantity = action.payload.cartQuantity;
      }
    },
        extraReducers: (builder) => {
          builder
            // .addCase(clearCart, (_, { payload }) => {
            //   dispatch(saveCartToServer(payload));
            // })
            .addCase(loadCartFromServer.fulfilled, (state, action) => {
              cartSlice.caseReducers.setCart(state, action);
              state.products = action.payload.products;
              state.quantity = action.payload.quantity;
              state.total = action.payload.total;
              state.shouldSync = false;
            })
            .addCase(saveCartToServer.rejected, (state, action) => {
              state.shouldSync = false;
              console.error(action.error);
              toast.error("Error syncing cart with server", {
                position: "top-right",
              });
            })
        },
        });
        
        export const { addProduct, 
                      increaseQuantity, 
                      decreaseQuantity, 
                      getCartsQuantity,
                      removeProduct,
                      clearCart,
                      setShouldSync,
                      setUser,
                      setCart, 
                      updateCart
                    } =
                    cartSlice.actions;
        
        export default cartSlice.reducer;
        
     

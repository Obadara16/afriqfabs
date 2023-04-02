import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Check if the user is authenticated before making API requests
const isAuth = () => {
  // Check if the user is authenticated
  const token = localStorage.getItem('token');
  return !!token;
};

// Create a thunk for creating a cart
export const createCart = createAsyncThunk('carts/createCart', async (userId) => {
  const isUserAuthenticated = isAuth();
  const cart = { userId, products: [], total: 0 };

  if (isUserAuthenticated) {
    const response = await axios.post(`${API_BASE_URL}/carts`, cart, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return response.data;
  } else {
    localStorage.setItem('cart', JSON.stringify(cart));
    return cart;
  }
});

// Create a thunk for updating a cart
export const updateCart = createAsyncThunk('carts/updateCart', async (cart) => {
  const isUserAuthenticated = isAuth();

  if (isUserAuthenticated) {
    const response = await axios.put(`${API_BASE_URL}/carts/${cart._id}`, cart, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return response.data;
  } else {
    localStorage.setItem('cart', JSON.stringify(cart));
    return cart;
  }
});

// Create a thunk for deleting a cart
export const deleteCart = createAsyncThunk('carts/deleteCart', async () => {
  const isUserAuthenticated = isAuth();

  if (isUserAuthenticated) {
    const response = await axios.delete(`${API_BASE_URL}/carts`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return response.data;
  } else {
    localStorage.removeItem('cart');
    return { products: [], total: 0 };
  }
});

// Create a thunk for getting a single cart
export const getSingleCart = createAsyncThunk('carts/getSingleCart', async (cartId) => {
  const isUserAuthenticated = isAuth();

  if (isUserAuthenticated) {
    const response = await axios.get(`${API_BASE_URL}/carts/${cartId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return response.data;
  } else {
    const cart = JSON.parse(localStorage.getItem('cart'));
    return cart || { products: [], total: 0 };
  }
});

// Create a thunk for getting all carts
export const getAllCarts = createAsyncThunk('carts/getAllCarts', async () => {
  const isUserAuthenticated = isAuth();

  if (isUserAuthenticated) {
    const response = await axios.get(`${API_BASE_URL}/carts`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return response.data;
  } else {
    const cart = JSON.parse(localStorage.getItem('cart'));
    return cart ? [cart] : [];
  }
});

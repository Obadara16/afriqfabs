import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: null,
    message: null,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.error = null;
      state.message = action.payload.message;

    },
    loginFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.currentUser = null;
    },
    registerStart: (state) => {
      state.isFetching = true;
    },
    registerSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.error = null;
      state.message = action.payload.message;
    },
    registerFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
    getProfileStart: (state) => {
      state.isFetching = true;
    },
    getProfileSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.error = null;
    },
    getProfileFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  registerStart,
  registerSuccess,
  registerFailure,
  getProfileStart,
  getProfileSuccess,
  getProfileFailure,
} = userSlice.actions;

export default userSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: null,
    message: null,
    isForgotPasswordSuccess: false,
    isResetPasswordSuccess: false,
    verifyEmailSuccess: false,
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
    forgotPasswordStart: (state) => {
      state.isFetching = true;
    },
    forgotPasswordSuccess: (state, action) => {
      state.isFetching = false;
      state.isForgotPasswordSuccess = true;
      state.message = action.payload.message;
    },
    forgotPasswordFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
    resetPasswordStart: (state) => {
      state.isFetching = true;
    },
    resetPasswordSuccess: (state, action) => {
      state.isFetching = false;
      state.isResetPasswordSuccess = true;
      state.message = action.payload.message;
    },
    resetPasswordFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
    verifyEmailStart: (state) => {
      state.isFetching = true;
    },
    verifyEmailSuccess: (state, action) => {
      state.isFetching = false;
      state.verifyEmailSuccess = true;
      state.message = action.payload.message;
    },
    verifyEmailFailure: (state, action) => {
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
  forgotPasswordStart,
  forgotPasswordSuccess,
  forgotPasswordFailure,
  resetPasswordStart,
  resetPasswordSuccess,
  resetPasswordFailure,
  verifyEmailStart,
  verifyEmailSuccess,
  verifyEmailFailure,
} = userSlice.actions;

export default userSlice.reducer;

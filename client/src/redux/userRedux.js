import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    success: null,
    error: null,
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
    },
    loginFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.currentUser = null;
      state.isFetching = false;
      state.success = null;
      state.error = null;
      state.isForgotPasswordSuccess = false;
      state.isResetPasswordSuccess = false;
      state.verifyEmailSuccess = false;
    },
    registerStart: (state) => {
      state.isFetching = true;
    },
    registerSuccess: (state, action) => {
      state.isFetching = false;
      state.success = action.payload;
      state.error = null;
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
      state.error = null;
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
      state.error = null;
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
      state.error = null;
    },
    verifyEmailFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
    setErrorMessage: (state, action) => {
      state.error = action.payload;
    },
    setSuccessMessage: (state, action) => {
      state.success = action.payload;
    },
    resetMessages: (state) => {
      state.success = null;
      state.error = null;
    },
    
    
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => action.type === "persist/REHYDRATE",
        (state) => {
          state.isFetching = false;
          state.isForgotPasswordSuccess = false;
          state.isResetPasswordSuccess = false;
          state.verifyEmailSuccess = false;
          state.error = null;
          state.success = null;
        }
      );
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
  setErrorMessage,
  setSuccessMessage,
  resetMessages,
} = userSlice.actions;

export default userSlice.reducer;

import {
  loginFailure,
  loginStart,
  loginSuccess,
  logout,
  registerFailure,
  registerStart,
  registerSuccess,
  getProfileFailure,
  getProfileStart,
  getProfileSuccess,
  forgotPasswordStart,
  forgotPasswordSuccess,
  forgotPasswordFailure,
  resetPasswordStart,
  resetPasswordSuccess,
  resetPasswordFailure,
  verifyEmailStart,
  verifyEmailSuccess,
  verifyEmailFailure,
} from "./userRedux";
import { publicRequest } from "../requestMethods";


export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure(err.message));
  }
};

export const logoutUser = () => {
  return async (dispatch) => {
    try {
      // call the logout API here
      // ...

      dispatch(logout());
    } catch (err) {
      console.log(err);
    }
  };
};

export const registerUser = async (dispatch, user) => {
  dispatch(registerStart());
  try {
    const res = await publicRequest.post("/auth/register", user);
    dispatch(registerSuccess(res.data));
  } catch (err) {
    dispatch(registerFailure(err.message));
  }
};

export const getProfile = async (dispatch) => {
  dispatch(getProfileStart());
  try {
    const res = await publicRequest.get("/user/profile");
    dispatch(getProfileSuccess(res.data));
  } catch (err) {
    dispatch(getProfileFailure(err.message));
  }
};

export const forgotPassword = (email) => async (dispatch) => {
  dispatch(forgotPasswordStart());
  try {
    const res = await publicRequest.post("/auth/forgot-password", { email });
    dispatch(forgotPasswordSuccess(res.data));
  } catch (err) {
    dispatch(forgotPasswordFailure(err.message));
  }
};

export const resetPassword = (resetData) => async (dispatch) => {
  dispatch(resetPasswordStart());
  try {
    const res = await publicRequest.post("/auth/reset-password", resetData);
    dispatch(resetPasswordSuccess(res.data));
  } catch (err) {
    dispatch(resetPasswordFailure(err.message));
  }
};

export const verifyEmail = (verificationCode) => async (dispatch) => {
  dispatch(verifyEmailStart());
  try {
    const res = await publicRequest.post("/auth/verify-email", { verificationCode });
    dispatch(verifyEmailSuccess(res.data));
  } catch (err) {
    dispatch(verifyEmailFailure(err.message));
  }
};



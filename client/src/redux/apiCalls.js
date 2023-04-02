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

export const logoutUser = async (dispatch) => {
  try {
    // call the logout API here
    // ...

    dispatch(logout());
  } catch (err) {
    console.log(err);
  }
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



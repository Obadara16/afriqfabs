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
  setErrorMessage,
  setSuccessMessage,
  
} from "./userRedux";
import { publicRequest } from "../requestMethods";
import { setUser, clearUserCart } from "./cartRedux";

export const login = (email, password) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const response = await publicRequest.post("/auth/login", {
      email,
      password,
    });
    dispatch(setUser(response.data.user._id));
    dispatch(loginSuccess(response.data));
    dispatch(setSuccessMessage(response.data.user.firstName));
    // dispatch(saveCartToServer(response.data.user._id))
    // .then(() => {
    //   dispatch(loadCartFromServer(response.data.user._id)); // dispatch saveToCart function
    // })
  } catch (error) {
    dispatch(
      loginFailure(error.response.data.error || error.response.data.message)
    );
    dispatch(
      setErrorMessage(error.response.data.error || error.response.data.message)
    );
  }
};


export const logoutUser = () => {
  return async (dispatch) => {
    try {
      // call the logout API here
      // ...

      dispatch(logout());
      const cart = JSON.parse(localStorage.getItem("carts"));
      dispatch(clearUserCart());
      localStorage.removeItem("carts");


    } catch (error) {
      console.log(error);
    }
  };
};

export const registerUser =
  (firstName, lastName, email, password) => async (dispatch) => {
    dispatch(registerStart());
    try {
      const response = await publicRequest.post("/auth/register", {
        firstName,
        lastName,
        email,
        password,
      });
      dispatch(registerSuccess());
      dispatch(setSuccessMessage(response.data.message));
    } catch (error) {
      dispatch(
        registerFailure(
          error.response.data.error || error.response.data.message
        )
      );
      dispatch(
        setErrorMessage(
          error.response.data.error || error.response.data.message
        )
      );
    }
  };

export const getProfile = async (dispatch) => {
  dispatch(getProfileStart());
  try {
    const response = await publicRequest.get("/user/profile");
    dispatch(getProfileSuccess(response.data));
    dispatch(setSuccessMessage(response.data.user));
  } catch (error) {
    dispatch(
      getProfileFailure(
        error.response.data.error || error.response.data.message
      )
    );
    dispatch(
      setErrorMessage(
        error.response.data.error ||
          error.response.data.message ||
          error.response.data.message
      )
    );
  }
};

export const forgotPassword = (email) => async (dispatch) => {
  dispatch(forgotPasswordStart());
  try {
    const response = await publicRequest.post("/auth/forgot-password", {
      email,
    });
    dispatch(forgotPasswordSuccess(response.data.message));
    dispatch(setSuccessMessage(response.data.message));

  } catch (error) {
    dispatch(
      forgotPasswordFailure(
        error.response.data.error || error.response.data.message
      )
    );
    dispatch(
      setErrorMessage(
        error.response.data.error ||
          error.response.data.message ||
          error.response.data.message
      )
    );

    console.log(error);
  }
};

export const resetPassword = (password, resetToken) => async (dispatch) => {
  dispatch(resetPasswordStart());

  try {
    const response = await publicRequest.post(
      `/auth/reset-password/${resetToken}`,
      { password }
    );
    dispatch(resetPasswordSuccess(response.data.message));
    dispatch(setSuccessMessage(response.data.message));
  } catch (error) {
    dispatch(
      resetPasswordFailure(
        error.response.data.error || error.response.data.message
      )
    );
    dispatch(
      setErrorMessage(
        error.response.data.error ||
          error.response.data.message ||
          error.response.data.message
      )
    );
  }
};

export const verifyEmail = (verificationCode) => async (dispatch) => {
  dispatch(verifyEmailStart());
  try {
    const response = await publicRequest.get(
      `/auth/verify-email/${verificationCode}`
    );
    dispatch(verifyEmailSuccess(response.data.message));
    dispatch(setSuccessMessage(response.data.message));
  } catch (error) {
    dispatch(
      verifyEmailFailure(
        error.response.data.error || error.response.data.message
      )
    );
    dispatch(
      setErrorMessage(error.response.data.error || error.response.data.message)
    );
  }
};

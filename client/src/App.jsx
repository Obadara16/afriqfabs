import "react-toastify/dist/ReactToastify.css";
import ProductDetails from "./pages/ProductDetails";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Success from "./pages/Success";
import { useSelector } from "react-redux";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ForgotPassword from "./pages/ForgotPassword";
import Gallery from "./pages/Gallery";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import ResetPassword from "./pages/ResetPassword";
import VerifyEmail from "./pages/VerifyEmail";
import NotFound from "./pages/NotFound";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { resetMessages } from "./redux/userRedux";
import { loadCartFromServer, saveCartToServer } from "./redux/cartRedux";
import ScrollToTop from "./scrollToTop";
import { authedRequest } from "./requestMethods";

// import PrivateRoute from "./utils/PrivateRoute";

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const cartState = useSelector((state) => state.cart);
  const userData = useSelector((state) => state.user?.currentUser?.tokens?.refreshToken);
  const userIdFromState = useSelector((state) => state.user?.currentUser?.user._id);
  console.log("this is the cart state from app.js file", cartState)

  useEffect(() => {
    dispatch(resetMessages());
  }, [location, dispatch]);

  useEffect(() => {
    if (userIdFromState) {
      // Make a request to the server to get cart state
      dispatch(loadCartFromServer(userIdFromState))
      dispatch(saveCartToServer(userIdFromState))

    }
  }, [dispatch, userIdFromState]);

  return (
    <div>
      <ScrollToTop />
      <ToastContainer />
      <Routes path="/">
        <Route index element={<Home />} />
        <Route
          path="/products/:category?/:subcategory?"
          element={<ProductList />}
        />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:resetToken" element={<ResetPassword />} />
        <Route
          path="/verify-email/:verificationCode"
          element={<VerifyEmail />}
        />
        <Route path="/about-us" element={<About />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/african-style-inspiration/:slug?" element={<Gallery />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;

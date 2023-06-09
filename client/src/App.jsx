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
// import { loadCartFromServer, saveCartToServer } from "./redux/cartRedux";
import ScrollToTop from "./scrollToTop";
import GalleryDetails from "./pages/GalleryDetails";
import Checkout from "./pages/Checkout";
import Profile from "./pages/Profile";
import EditAddress from "./pages/EditAddress";
import AddAddress from "./pages/AddAddress";
import Favourites from "./pages/Favourites";
import Orders from "./pages/Orders";

// import PrivateRoute from "./utils/PrivateRoute";

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const cartState = useSelector((state) => state.cart);
  const userData = useSelector((state) => state.user?.currentUser?.tokens?.refreshToken);
  const userDetails= useSelector((state) => state.user?.currentUser?.user);
  const userIdFromState = useSelector((state) => state.user?.currentUser?.user._id);
  console.log("this is the cart state from app.js file", cartState)
  console.log("this is the user state from app.js file", userDetails)

  useEffect(() => {
    dispatch(resetMessages());
  }, [location, dispatch]);

  // useEffect(() => {
  //   if (userIdFromState) {
  //     dispatch(saveCartToServer(userIdFromState)).then(() => {
  //       dispatch(loadCartFromServer(userIdFromState));
  //     });
  //   }
  // }, [dispatch, userIdFromState]);


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
        <Route path="/checkout" element={<Checkout />} />
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
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/edit-address" element={<EditAddress />} />
        <Route path="/profile/add-address" element={<AddAddress />} />
        <Route path="/african-style-inspirations/:slug?" element={<Gallery />} />
        <Route path="/african-style-inspiration/:cat/:slug" element={<GalleryDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;

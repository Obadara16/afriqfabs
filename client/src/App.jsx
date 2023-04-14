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
import ResetPassword from "./pages/ResetPassword";
import VerifyEmail from "./pages/VerifyEmail";
import NotFound from "./pages/NotFound";
import { useDispatch } from "react-redux";
import { syncCart } from "./redux/cartRedux";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { resetMessages } from "./redux/userRedux";
import ScrollToTop from "./hooks/scrollToTop";
// import PrivateRoute from "./utils/PrivateRoute";

const App = () => {

  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(resetMessages());
  }, [location, dispatch]);
  

  // const isLoggedIn = useSelector((state) => state.user.currentUser);
  // const dispatch = useDispatch();
  // const shouldSyncRedux = useSelector((state) => state.cart.shouldSync);
  // const [shouldSync, setShouldSync] = useState(shouldSyncRedux);
    

  
  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
  //   const currentUser = user && JSON.parse(user).currentUser;
  //   const token = currentUser?.token;
  
  //   const handleAuthStateChange = (isLoggedIn) => {
  //     if (isLoggedIn) {
  //       dispatch(setShouldSync(true));
  //       setShouldSync(true);
  //     } else {
  //       dispatch(setShouldSync(false));
  //       setShouldSync(false);
  //     }
  //   };
  
  //   // // Decode token to get expiration time
  //   // const decodedToken = jwt_decode(token);
  //   // const currentTime = Date.now() / 1000;
  
  //   // // Check if token is expired
  //   // if (decodedToken.exp < currentTime) {
  //   //   handleAuthStateChange(false);
  //   // } else {
  //   //   handleAuthStateChange(true);
  //   // }
  // }, [dispatch]);
  
  // useEffect(() => {
  //   if (shouldSync) {
  //     dispatch(syncCart());
  //     // Reset shouldSync to false after syncing the cart
  //     setShouldSync(false);
  //     dispatch(setShouldSync(false));
  //   }
  // }, [shouldSync, dispatch]);
  

  return (
    <div>
      <ScrollToTop/>
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

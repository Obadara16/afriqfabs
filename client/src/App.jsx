import "react-toastify/dist/ReactToastify.css"
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
  Navigate
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



const App = () => {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <Router>
      <ToastContainer/>
      <Routes path="/">
      <Route index element={<Home />} />
          <Route path="/products/:category?/:subcategory?" element={<ProductList />} />
          <Route path="/product/:slug" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/success" element={<Success />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:resetToken" element={<ResetPassword />} />
          <Route path="/verify-email/:verificationCode" element={<VerifyEmail />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/african-style-inspiration/:slug?" element={<Gallery />} />
          <Route path="*" element={<NotFound />} />
          
      </Routes>
    </Router>
  );
};

export default App;

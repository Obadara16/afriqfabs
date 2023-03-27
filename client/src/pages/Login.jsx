import { useState } from "react";
import { login } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import CombinedNav from "../components/CombinedNav";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);

  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { email, password });
  };

  return (
    <div className="">
      <CombinedNav/>
      <div className="w-full mx-auto flex justify-center items-center flex-col my-10 gap-4">
        <h1 className="text-2xl font-light">Login</h1>
        <p className="text-center">Kindly enter your email and password</p>
        <form className="flex flex-col mt-4 w-1/3 gap-8">
          <div className="relative">
            <label className="absolute top-0 left-0 -mt-2 ml-3 text-black text-sm bg-none px-3">Email</label>
            <input className="block w-full px-4 border border-custom-btn-green py-4 rounded-md focus:ring-teal-500  focus:outline-none focus:shadow-outline-teal" 
            type="text"
            id="email"
            onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className="relative">
            <label className="absolute top-0 left-0 -mt-2 ml-3 text-black text-sm px-3">Password</label>
            <input className="block w-full px-4 border border-custom-btn-green py-4 rounded-md focus:ring-teal-500 focus:outline-white focus:shadow-outline-teal" 
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex justify-end">
            <Link to="/forgot-password" className="text-sm cursor-pointer text-right">
              Forgot Password  ?
            </Link>
          </div>

          <button
            className={`w-full px-4 h-[54px] mt-4 rounded cursor-pointer ${
              isFetching ? "bg-gray-400 text-gray-900" : "bg-custom-btn-green text-white"
            }`}
            disabled={isFetching}
            onClick={handleClick}
          >
            {isFetching ? "Loading..." : "Login"}
          </button>
          <p className="text-center">Don't have an account ? <Link to="/register" className="my-2 text-sm cursor-pointer text-custom-btn-green font-medium">
            Sign Up
          </Link></p>
          {/* {error && <span className="text-red-500">Something went wrong...</span>} */}
        </form>
      </div>
      <Footer/>
    </div>
  );
};

export default Login;

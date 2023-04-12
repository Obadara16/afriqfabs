import { useEffect, useState } from "react";
import { login } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import CombinedNav from "../components/CombinedNav";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import Alert from "../components/Alert";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isFetching, error, success } = useSelector((state) => state.user);

  const [alerting, setAlerting] = useState({
    color: "",
    data: "",
  });

  const handleClick = async (e) => {
    e.preventDefault();
    
    await login(dispatch, { email, password });
  

  };

  useEffect(() => {
    if (success) {
      
      setAlerting({
        color: "success",
        data: `Welcome Back ${success}`,
      });
      navigate("/")
    } else {
      setAlerting({ color: "danger", data: error });
    }
  }, [success, error]);
  
  
  

  return (
    <div className="">
      <CombinedNav />
      <div className="w-full mx-auto flex justify-center items-center flex-col my-10 gap-4">
        <h1 className="text-2xl font-light">Login</h1>
        <p className="text-center">Kindly enter your email and password</p>
        <form className="flex flex-col mt-4 sm-w-full md:w-1/3 gap-8">
          <div className="relative">
            <input
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-custom-btn-green appearance-none dark:text-white dark:border-gray-600 dark:focus:border-custom-btn-green focus:outline-none focus:ring-0 focus:border-custom-btn-green peer"
              placeholder=" "
            />
            <label
              htmlFor="email"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-custom-basic-color dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-custom-btn-green peer-focus:dark:text-custom-btn-green peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              Email
            </label>
          </div>

          <div className="relative">
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-custom-btn-green appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-custom-btn-green peer"
              placeholder=" "
            />
            <label
              htmlFor="password"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-custom-basic-color dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-custom-btn-green peer-focus:dark:text-custom-btn-green peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              Password
            </label>
          </div>

          <div className="flex justify-end">
            <Link
              to="/forgot-password"
              className="text-sm cursor-pointer text-right"
            >
              Forgot Password ?
            </Link>
          </div>
          <div className="flex flex-col">
            {!(success === null) &&
              <Alert color={`custom-btn-green`} data={alerting.data} />
            }
            {!(error === null) &&
              <Alert color={`red-500`} data={alerting.data} />
            }
            <button
              className={`w-full px-4 h-[54px] mt-4 rounded cursor-pointer ${
                isFetching
                  ? "bg-gray-400 text-gray-900"
                  : "bg-custom-btn-green text-white"
              }`}
              disabled={isFetching}
              onClick={handleClick}
            >
              {isFetching ? "Loading..." : "Login"}
            </button>
          </div>
          <p className="text-center">
            Don't have an account ?{" "}
            <Link
              to="/register"
              className="my-2 text-sm cursor-pointer text-custom-btn-green font-medium"
            >
              Sign Up
            </Link>
          </p>
          {/* {error && <span className="text-red-500">Something went wrong...</span>} */}
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Login;

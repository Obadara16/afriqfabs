import { useState } from "react";
import { login } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import CombinedNav from "../components/CombinedNav";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);

  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { username, password });
  };

  return (
    <div className="">
      <CombinedNav />
      <div className="w-full mx-auto flex justify-center items-center flex-col my-10 gap-4">
        <h1 className="text-2xl font-semibold">Sign Up</h1>
        <p className="text-center">Kindly fill in your information below</p>
        <form className="flex flex-col mt-4 w-1/3 gap-8">
        <div className="relative">
            <label className="absolute top-0 left-0 -mt-2 ml-3 text-black text-sm bg-none px-3">
              First Name
            </label>
            <input
              className="block w-full px-4 border border-custom-btn-green py-4 rounded-md focus:ring-teal-500  focus:outline-none focus:shadow-outline-teal"
              type="text"
              id="firstName"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="relative">
            <label className="absolute top-0 left-0 -mt-2 ml-3 text-black text-sm bg-none px-3">
              LastName
            </label>
            <input
              className="block w-full px-4 border border-custom-btn-green py-4 rounded-md focus:ring-teal-500  focus:outline-none focus:shadow-outline-teal"
              type="text"
              id="lastName"
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="relative">
            <label className="absolute top-0 left-0 -mt-2 ml-3 text-black text-sm bg-none px-3 z-">
              Email
            </label>
            <input
              className="block w-full px-4 border border-custom-btn-green py-4 rounded-md focus:ring-teal-500 focus:outline-none focus:shadow-outline-teal"
              type="text"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>


          <div class="relative" >
            <input
              type="text"
              class="peer block min-h-[auto] w-full rounded border-0 bg-neutral-100  border-custom-btn-green py-4 px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:bg-neutral-700 dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
              id="password"
              placeholder="Password."
              aria-label="editable input example"
            />
            <label
              for="password"
              class="absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-neutral-200"
              >Password
            </label>
          </div>

          <button
            className={`w-full px-4 h-[54px] mt-2 rounded cursor-pointer ${
              isFetching
                ? "bg-gray-400 text-gray-900"
                : "bg-custom-btn-green text-white"
            }`}
            disabled={isFetching}
            onClick={handleClick}
          >
            {isFetching ? "Loading..." : "Login"}
          </button>
          <p className="text-center">
            Already have an account ?{" "}
            <Link
              to="/login"
              className="my-2 text-sm cursor-pointer text-custom-btn-green font-medium"
            >
              Login
            </Link>
          </p>
          {/* {error && <span className="text-red-500">Something went wrong...</span>} */}
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Register;

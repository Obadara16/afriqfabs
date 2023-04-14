import { useEffect, useState } from "react";
import { registerUser } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import CombinedNav from "../components/CombinedNav";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import Alert from "../components/Alert";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";

const Register = () => {
  const dispatch = useDispatch();
  const { isFetching, error, success } = useSelector((state) => state.user);
  const [alerting, setAlerting] = useState({
    color: "",
    data: "",
  });

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/;



  const schema = yup.object().shape({
    firstName: yup.string()
      .required('First Name is required'),
    lastName: yup.string()
      .required('Last Name is required'),
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Email is required"),
      password: yup.string()
      .matches(
        passwordRegex,
        'Use a mix of special chars, uppercase, lowercase, nums',
      )
      .required('Password is required'),
  });

const {
  handleSubmit,
  register,
  formState: { errors },
} = useForm({
  resolver: yupResolver(schema),
});

const onSubmit = async (data) => {
  dispatch(registerUser(data.firstName, data.lastName, data.email, data.password));
};


  useEffect(() => {
    if (success) {
      
      setAlerting({
        color: "success",
        data: success,
      });
    } else {
      setAlerting({ color: "danger", data: error });
    }
  }, [success, error]);


  return (
    <div className="">
      <CombinedNav />
      <div className="w-full mx-auto flex justify-center items-center flex-col my-10 gap-4">
        <h1 className="text-2xl font-semibold">Sign Up</h1>
        <p className="text-center">Kindly fill in your information below</p>
        <form className="flex flex-col mt-4 sm-w-full md:w-1/3 gap-8"
          onSubmit={handleSubmit(onSubmit)}
        >

          <div className="relative">
            <input
              type="text"
              {...register("firstName")}
              className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-custom-btn-green appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-custom-btn-green peer ${
                errors.firstName ? "border-red-500" : ""
              }`}
              placeholder=" "
            />
            <label
              htmlFor="firstName"
              className={`absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-custom-basic-color dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-custom-btn-green peer-focus:dark:text-custom-btn-green peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 ${
                errors.firstName ? "text-red-500" : ""
              }`}
            >
              {errors.firstName ? errors.firstName.message : "First Name "}
            </label>
          </div>

          <div className="relative">
            <input
              type="text"
              {...register("lastName")}
              className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-custom-btn-green appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-custom-btn-green peer ${
                errors.lastName ? "border-red-500" : ""
              }`}
              placeholder=" "
            />
            <label
              htmlFor="lastName"
              className={`absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-custom-basic-color dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-custom-btn-green peer-focus:dark:text-custom-btn-green peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 ${
                errors.lastName ? "text-red-500" : ""
              }`}
            >
              {errors.lastName ? errors.lastName.message : "Last Name "}
            </label>
          </div>

          <div className="relative">
            <input
              type="email"
              {...register("email")}
              className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-custom-btn-green appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-custom-btn-green peer ${
                errors.email ? "border-red-500" : ""
              }`}
              placeholder=" "
            />
            <label
              htmlFor="email"
              className={`absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-custom-basic-color dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-custom-btn-green peer-focus:dark:text-custom-btn-green peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 ${
                errors.email ? "text-red-500" : ""
              }`}
            >
              {errors.email ? errors.email.message : "Email "}
            </label>
          </div>

          <div className="relative">
            <input
              type="password"
              {...register("password")}
              className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-custom-btn-green appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-custom-btn-green peer ${
                errors.password ? "border-red-500" : ""
              }`}
              placeholder=" "
            />
            <label
              htmlFor="password"
              className={`absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-100 top-2 z-10 origin-[0] bg-custom-basic-color dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-custom-btn-green peer-focus:dark:text-custom-btn-green peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 ${
                errors.password ? "text-red-500" : ""
              }`}
            >
              {errors.password ? errors.password.message : "Password "}
            </label>
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
            >
              {isFetching ? "Loading..." : "Register"}
            </button>
          </div>
        <p className="text-center">
          Already have an account ?{" "}
          <Link
            to="/login"
            className="my-2 text-sm cursor-pointer text-custom-btn-green font-medium"
          >
            Login
          </Link>
        </p>
          {/* {error && <span className="text-red-500">{error}</span>}
          {success && <p>{success.message}</p>} */}

      </form>
      </div>
    <Footer />
    </div>
  );
};

export default Register;

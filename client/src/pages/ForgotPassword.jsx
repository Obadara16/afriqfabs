import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CombinedNav from "../components/CombinedNav";
import Footer from "../components/Footer";
import { forgotPassword } from "../redux/apiCalls";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import Alert from "../components/Alert";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
});

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const { isFetching, error, success } = useSelector((state) => state.user);

  const [alerting, setAlerting] = useState({
    color: "",
    data: "",
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    dispatch(forgotPassword(data.email));
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
        <h1 className="text-2xl font-light">Recover Password ?</h1>
        <p className="text-center">Kindly provide your email</p>
        {success ? (
          <p>{success}</p>
        ) : (
          <form
            className="flex flex-col mt-4 w-1/3 gap-8"
            onSubmit={handleSubmit(onSubmit)}
          >
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
                {errors.email ? errors.email.message : "Email"}
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
                {isFetching ? "Loading..." : "Submit"}
              </button>
            </div>
          </form>
        )}
      </div>
      <Footer />
    </div>
  );
};


export default ForgotPassword;

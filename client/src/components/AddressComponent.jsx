import React, { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar';
import { registerUser } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Alert from "../components/Alert";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
const AddressComponent = ({addressType, addressTypeTitle}) => {

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
      .required('Password is required'),
      newPassword: yup.string()
      .matches(
        passwordRegex,
        'Use a mix of special chars, uppercase, lowercase, nums',
      )
      .required('Password is required'),
      cNewPassword: yup.string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required'),
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
        <div className='w-11/12 mx-auto grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 h-full mb-12'>
            <div className='col-span-1 h-full'>
                <Sidebar/>
            </div>
            <div className='bg-white py-5 mt-12 col-span-3 h-full' >

                <div className='flex flex-col justify-center gap-6 w-10/12 mx-auto'>
                    <div className=''>
                        <h2 className='font-semibold '>{addressTypeTitle}</h2>
                    </div>
                    <form className="shipping-form w-full">
                        <div className="mb-6 flex flex-col md:flex-row lg:flex-row gap-4  items-center md:justify-between">
                            <div className="relative w-full">
                                <input
                                type="text"
                                {...register("firstName")}
                                className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-custom-btn-green appearance-none dark:text-white dark:border-custom-btn-green dark:focus:border-custom-btn-green focus:outline-none focus:ring-0 focus:border-custom-btn-green peer ${
                                    errors.firstName ? "border-red-500" : ""
                                }`}
                                placeholder=" "
                                />
                                <label
                                htmlFor="firstName"
                                className={`absolute text-sm text-custom-btn-green dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-custom-basic-color dark:bg-custom-btn-green px-2 peer-focus:px-2 peer-focus:text-custom-btn-green peer-focus:dark:text-custom-btn-green peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 ${
                                    errors.firstName ? "text-red-500" : ""
                                }`}
                                >
                                {errors.firstName ? errors.firstName.message : "First Name "}
                                </label>
                            </div>
                            <div className="relative w-full">
                                <input
                                type="text"
                                {...register("lasttName")}
                                className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-custom-btn-green appearance-none dark:text-white dark:border-custom-btn-green dark:focus:border-custom-btn-green focus:outline-none focus:ring-0 focus:border-custom-btn-green peer ${
                                    errors.lasttName ? "border-red-500" : ""
                                }`}
                                placeholder=" "
                                />
                                <label
                                htmlFor="lasttName"
                                className={`absolute text-sm text-custom-btn-green dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-custom-basic-color dark:bg-custom-btn-green px-2 peer-focus:px-2 peer-focus:text-custom-btn-green peer-focus:dark:text-custom-btn-green peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 ${
                                    errors.lasttName ? "text-red-500" : ""
                                }`}
                                >
                                {errors.lasttName ? errors.lasttName.message : "Last Name "}
                                </label>
                            </div>
                        </div>
                        <div className="mb-6 flex flex-col md:flex-row lg:flex-row gap-4  items-center md:justify-between">
                            <div className="relative w-full">
                                <input
                                type="text"
                                {...register("phoneNumber1")}
                                className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-custom-btn-green appearance-none dark:text-white dark:border-custom-btn-green dark:focus:border-custom-btn-green focus:outline-none focus:ring-0 focus:border-custom-btn-green peer ${
                                    errors.phoneNumber1 ? "border-red-500" : ""
                                }`}
                                placeholder=" "
                                />
                                <label
                                htmlFor="phoneNumber1"
                                className={`absolute text-sm text-custom-btn-green dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-custom-basic-color dark:bg-custom-btn-green px-2 peer-focus:px-2 peer-focus:text-custom-btn-green peer-focus:dark:text-custom-btn-green peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 ${
                                    errors.phoneNumber1 ? "text-red-500" : ""
                                }`}
                                >
                                {errors.phoneNumber1 ? errors.phoneNumber1.message : "Phone Number 1 (*) "}
                                </label>
                            </div>
                            <div className="relative w-full">
                                <input
                                type="text"
                                {...register("phoneNumber2")}
                                className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-custom-btn-green appearance-none dark:text-white dark:border-custom-btn-green dark:focus:border-custom-btn-green focus:outline-none focus:ring-0 focus:border-custom-btn-green peer ${
                                    errors.phoneNumber2 ? "border-red-500" : ""
                                }`}
                                placeholder=" "
                                />
                                <label
                                htmlFor="phoneNumber2"
                                className={`absolute text-sm text-custom-btn-green dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-custom-basic-color dark:bg-custom-btn-green px-2 peer-focus:px-2 peer-focus:text-custom-btn-green peer-focus:dark:text-custom-btn-green peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 ${
                                    errors.phoneNumber2 ? "text-red-500" : ""
                                }`}
                                >
                                {errors.phoneNumber2 ? errors.phoneNumber2.message : "Phone Number 2 (optional) "}
                                </label>
                            </div>
                        </div>
                        <div className="mb-6">
                            <div className="relative w-[100%]">
                                <textarea
                                type="text"
                                rows="3"
                                {...register("deliveryAddress")}
                                className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-custom-btn-green appearance-none dark:text-white dark:border-custom-btn-green dark:focus:border-custom-btn-green focus:outline-none focus:ring-0 focus:border-custom-btn-green peer ${
                                    errors.deliveryAddress ? "border-red-500" : ""
                                }`}
                                placeholder=" "
                                />
                                <label
                                htmlFor="deliveryAddress"
                                className={`absolute text-sm text-custom-btn-green dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-custom-basic-color dark:bg-custom-btn-green px-2 peer-focus:px-2 peer-focus:text-custom-btn-green peer-focus:dark:text-custom-btn-green peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 ${
                                    errors.deliveryAddress ? "text-red-500" : ""
                                }`}
                                >
                                {errors.deliveryAddress ? errors.deliveryAddress.message : " Delivery Address "}
                                </label>
                            </div>
                        </div>
                        <div className="mb-6">
                            <div className="relative w-[100%]">
                                <textarea
                                type="text"
                                rows="3"
                                {...register("additionalDescription")}
                                className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-custom-btn-green appearance-none dark:text-white dark:border-custom-btn-green dark:focus:border-custom-btn-green focus:outline-none focus:ring-0 focus:border-custom-btn-green peer ${
                                    errors.additionalDescription ? "border-red-500" : ""
                                }`}
                                placeholder=" "
                                />
                                <label
                                htmlFor="additionalDescription"
                                className={`absolute text-sm text-custom-btn-green dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-custom-basic-color dark:bg-custom-btn-green px-2 peer-focus:px-2 peer-focus:text-custom-btn-green peer-focus:dark:text-custom-btn-green peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 ${
                                    errors.additionalDescription ? "text-red-500" : ""
                                }`}
                                >
                                {errors.additionalDescription ? errors.additionalDescription.message : " Additional Description "}
                                </label>
                            </div>
                        </div>
                        <div className="mb-6 flex flex-col md:flex-row lg:flex-row gap-4  items-center md:justify-between">
                            <div className="relative w-full">
                                <input
                                type="text"
                                {...register("city")}
                                className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-custom-btn-green appearance-none dark:text-white dark:border-custom-btn-green dark:focus:border-custom-btn-green focus:outline-none focus:ring-0 focus:border-custom-btn-green peer ${
                                    errors.city ? "border-red-500" : ""
                                }`}
                                placeholder=" "
                                />
                                <label
                                htmlFor="city"
                                className={`absolute text-sm text-custom-btn-green dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-custom-basic-color dark:bg-custom-btn-green px-2 peer-focus:px-2 peer-focus:text-custom-btn-green peer-focus:dark:text-custom-btn-green peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 ${
                                    errors.city ? "text-red-500" : ""
                                }`}
                                >
                                {errors.city ? errors.city.message : "City "}
                                </label>
                            </div>
                            <div className="relative w-full">
                                <input
                                type="text"
                                {...register("state")}
                                className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-custom-btn-green appearance-none dark:text-white dark:border-custom-btn-green dark:focus:border-custom-btn-green focus:outline-none focus:ring-0 focus:border-custom-btn-green peer ${
                                    errors.state ? "border-red-500" : ""
                                }`}
                                placeholder=" "
                                />
                                <label
                                htmlFor="state"
                                className={`absolute text-sm text-custom-btn-green dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-custom-basic-color dark:bg-custom-btn-green px-2 peer-focus:px-2 peer-focus:text-custom-btn-green peer-focus:dark:text-custom-btn-green peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 ${
                                    errors.state ? "text-red-500" : ""
                                }`}
                                >
                                {errors.state ? errors.state.message : "State "}
                                </label>
                            </div>
                        </div>
                        <div className="mb-8 flex items-center justify-between">
                            <div className="relative w-[100%]">
                                <input
                                type="text"
                                {...register("lga")}
                                className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-custom-btn-green appearance-none dark:text-white dark:border-custom-btn-green dark:focus:border-custom-btn-green focus:outline-none focus:ring-0 focus:border-custom-btn-green peer ${
                                    errors.lga ? "border-red-500" : ""
                                }`}
                                placeholder=" "
                                />
                                <label
                                htmlFor="lga"
                                className={`absolute text-sm text-custom-btn-green dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-custom-basic-color dark:bg-custom-btn-green px-2 peer-focus:px-2 peer-focus:text-custom-btn-green peer-focus:dark:text-custom-btn-green peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 ${
                                    errors.lga ? "text-red-500" : ""
                                }`}
                                >
                                {errors.lga ? errors.lga.message : "Local Government Area "}
                                </label>
                            </div>
                        </div>
                        <div className="flex w-full">
                            <button className="bg-custom-btn-green w-full hover:bg-white hover:border hover:border-custom-btn-green hover:text-black text-white font-normal py-3 px-8 rounded focus:outline-none focus:shadow-outline">
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
  )
}

export default AddressComponent
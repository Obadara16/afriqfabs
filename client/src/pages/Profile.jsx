import React, { useState, useEffect } from 'react'
import CombinedNav from '../components/CombinedNav'
import Sidebar from '../components/Sidebar';
import { registerUser } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import Alert from "../components/Alert";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faLocation, faPencil, faPhone, faTrashCan, faUser } from '@fortawesome/free-solid-svg-icons';

const Profile = () => {
    const [profileType, setProfileType] = useState('accountInfo');

    const handleRadioChange = (event) => {
        setProfileType(event.target.value);
    };

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
    <div>
        <CombinedNav/>
        <div className='w-11/12 mx-auto grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 h-full mb-12'>
            <div className='col-span-1 h-full'>
                <Sidebar/>
            </div>
            <div className='bg-white py-10 mt-12 col-span-3 h-full' >
                <div className="flex items-center w-10/12 mx-auto">
                    <label className="inline-flex items-center">
                        <input
                        type="radio"
                        className="form-radio h-5 w-5 text-custom-btn-green checked:text-custom-btn-green"
                        name="profile-type"
                        value="accountInfo"
                        checked={profileType === 'accountInfo'}
                        onChange={handleRadioChange}
                        />
                        <span className="text-gray-700 ml-2"><i className="fas fa-credit-card"></i></span>
                        <span className="ml-2 text-gray-700">Account Information</span>
                    </label>
                    <label className="inline-flex items-center ml-6">
                        <input
                        type="radio"
                        className="form-radio h-5 w-5 text-custom-btn-green checked:text-custom-btn-green"
                        name="profile-type"
                        value="delivery"
                        checked={profileType === 'delivery'}
                        onChange={handleRadioChange}
                        />
                        <span className="text-gray-700 ml-2"><i className="fab fa-paypal"></i></span>
                        <span className="ml-2 text-gray-700">Delivery</span>
                    </label>
                                                    
                </div>

                {profileType === 'accountInfo' && (
                    <div className='flex items-center w-10/12 mx-auto mt-10'>
                        <form className="flex flex-col mt-4 w-full gap-8"
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
                                {errors.password ? errors.password.message : "Current Password "}
                                </label>
                            </div>

                            <div className="relative">
                                <input
                                type="password"
                                {...register("newPassword")}
                                className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-custom-btn-green appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-custom-btn-green peer ${
                                    errors.newPassword ? "border-red-500" : ""
                                }`}
                                placeholder=" "
                                />
                                <label
                                htmlFor="newPassword"
                                className={`absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-100 top-2 z-10 origin-[0] bg-custom-basic-color dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-custom-btn-green peer-focus:dark:text-custom-btn-green peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 ${
                                    errors.newPassword ? "text-red-500" : ""
                                }`}
                                >
                                {errors.newPassword ? errors.newPassword.message : "New Password "}
                                </label>
                            </div>

                            <div className="relative">
                                <input
                                type="password"
                                {...register("cNewPassword")}
                                className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-custom-btn-green appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-custom-btn-green peer ${
                                    errors.cNewPassword ? "border-red-500" : ""
                                }`}
                                placeholder=" "
                                />
                                <label
                                htmlFor="cNewPassword"
                                className={`absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-100 top-2 z-10 origin-[0] bg-custom-basic-color dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-custom-btn-green peer-focus:dark:text-custom-btn-green peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 ${
                                    errors.cNewPassword ? "text-red-500" : ""
                                }`}
                                >
                                {errors.cNewPassword ? errors.cNewPassword.message : "Confirm New Password "}
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
                                        {isFetching ? "Loading..." : "Save Changes"}
                                    </button>
                                </div>

                            </form>
                    </div>
                )}

                {profileType === 'delivery' && (
                    <div className='flex items-center w-10/12 mx-auto mt-4'>
                        <div className='md:w-1/2'>
                            <Link to="add-address"><button className="py-3 px-6 rounded-md my-8 bg-custom-btn-green text-white w-fit whitespace-nowrap text-sm"> + Add New Address </button></Link>
                            <div className='border border-custom-btn-green flex flex-col gap-6 rounded-md '>
                                <div className='flex flex-col gap-6 py-4 px-4 gap 6'>
                                    <div className='flex'>
                                        <FontAwesomeIcon icon={faUser} className="text-green-500 p-1"/><span className="pl-2"> Roqeeb </span>
                                    </div>
                                    <div className='flex'>
                                        <FontAwesomeIcon icon={faLocation} className="text-green-500 p-1"/><span className="pl-2"> 12, community Road, Owode Onirin, Ede Ikorodu, Lagos State </span>
                                    </div>
                                    <div className='flex'>
                                        <FontAwesomeIcon icon={faPhone} className="text-green-500 p-1"/><span className="pl-2"> O8037343871 </span>
                                    </div>
                                </div>
                                <div className='flex w-full  gap-2 px-4 py-4 bg-gray-200 justify-end'>
                                    <Link to="edit-address">
                                        <div className='flex'>
                                            <FontAwesomeIcon icon={faEdit} className="text-green-500 p-1"/><span className="pl-2 text-green-500"> Edit </span>
                                        </div>
                                    </Link>
                                    <div className='flex'>
                                        <FontAwesomeIcon icon={faTrashCan} className="text-red-500 p-1"/><span className="pl-2 text-red-500"> Delete </span>
                                    </div>
                                </div>
                            </div>  
                        </div>
                    </div>
                )}

            </div>
        </div>
        <Footer/>
    </div>
  )
}

export default Profile
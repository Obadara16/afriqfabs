import React, { useEffect, useState } from "react";
import {
  faPlus,
  faMinus,
  faTrash,
  faDeleteLeft,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { userRequest } from "../requestMethods";
import { Link, useNavigate } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import CombinedNav from "../components/CombinedNav";
import Footer from "../components/Footer";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import paymentconfirm from "../assets/paymentconfirm.svg"


const Checkout = () => {
  const [step, setStep] = useState(1);
  const handleNext = () => {
    setStep(step + 1);
  }
  const handlePrevious = () => {
    setStep(step - 1);
  }

    const [paymentMethod, setPaymentMethod] = useState('card');

    const handleRadioChange = (event) => {
        setPaymentMethod(event.target.value);
    };

  const schema = yup.object().shape({
    firstName: yup.string()
      .required('First Name is required'),
    lastName: yup.string()
      .required('Last Name is required'),
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Email is required"),
  });

    const {
    handleSubmit,
    register,
    formState: { errors },
    } = useForm({
    resolver: yupResolver(schema),
    });

    const dispatch = useDispatch();

    const onSubmit = async (data) => {
    dispatch(registerUser(data.firstName, data.lastName, data.email, data.password));
    };
  

  const totalPrice = useSelector(state =>
    state.cart.products.reduce((acc, curr) => acc + curr.quantity * curr.price, 0)
  );
  


  return (
    <div className="flex flex-col h-full w-full mx-auto">
      <CombinedNav />
        <div className="w-10/12 mx-auto relative h-full  flex-1">
        {step === 3 ? (
          <div className="flex flex-col w-full justify-center h-[60vh] items-center text-center">
            <img src={paymentconfirm} alt="paymenttick"/>
            <p className="text-sm md:text-lg font-bold">Payment Successful</p>
            <p className="text-sm md:text-md font-normal">Your order has been received and is being processed.</p>
            <Link to="/products"><button className="py-3 px-6 rounded-md my-8 bg-custom-btn-green text-white w-fit whitespace-nowrap text-sm">Continue Shopping</button></Link>
          </div>
        ) : (

            <div className="mt-12">
                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="bg-white sm:col-span-full md:col-span-full lg:col-span-3 py-6">
                        <div className="bg-white py-4 px-6">
                            <div className="w-11/12 mx-auto">
                                <div class="flex  mb-4">
                                    <div class="flex-shrink-0 mr-1">
                                        <div class="relative h-12 flex justify-center items-center ">
                                            <div class={`relative w-5 h-5 bg-white border ${
                                                        step === 1
                                                        ? "border-custom-btn-green"
                                                        : "border-gray-500"
                                                    }  rounded-full flex items-center justify-center`}>
                                                <div class="font-bold  flex justify-center items-center"><span className={`${ step === 1 ? "bg-custom-btn-green h-[3px] w-[3px]" : "bg-white"}`}/></div>
                                            </div>
                                        </div>
                                        <span class={`${step === 1  ? "text-gray-900" : "text-gray-400"} text-center block mt-2`}>
                                        Shipping
                                        </span>
                                    </div>
                                    <div class="relative flex-grow flex h-12 items-center just mr-1">
                                        <div class="h-[2px] bg-gray-500 rounded-full w-full"></div>
                                    </div>
                                    <div class="flex-shrink-0 mr-1">
                                        <div class="relative h-12 flex justify-center items-center ">
                                            <div class={`relative w-5 h-5 bg-white border ${
                                                        step === 2
                                                        ? "border-custom-btn-green"
                                                        : "border-gray-500"
                                                    }  rounded-full flex items-center justify-center`}>
                                                <div class="font-bold  flex justify-center items-center"><span className={`${ step === 2 ? "bg-custom-btn-green h-[3px] w-[3px]" : "bg-white"}`}/></div>
                                            </div>
                                        </div>
                                        <span class={`${step === 2  ? "text-gray-900" : "text-gray-400"} text-center block mt-2`}>
                                        Payment
                                        </span>
                                    </div>
                                    <div class="relative flex-grow flex h-12 items-center just mr-1">
                                        <div class="h-[2px] bg-gray-500 rounded-full w-full"></div>
                                    </div>
                                    <div class="flex-shrink-0 ml-1">
                                        <div class="relative h-12 flex justify-center items-center ">
                                            <div class={`relative w-5 h-5 bg-white border ${
                                                        step === 3
                                                        ? "border-custom-btn-green"
                                                        : "border-gray-500"
                                                    }  rounded-full flex items-center justify-center`}>
                                                <div class="font-bold  flex justify-center items-center"><span className={`${ step === 3 ? "bg-custom-btn-green h-[3px] w-[3px]" : "bg-white"}`}/></div>
                                            </div>
                                        </div>
                                        <span class={`${step === 3  ? "text-gray-900" : "text-gray-400"} text-center block mt-2`}>
                                        Confirmation
                                        </span>
                                    </div>
                                </div>


                            {step === 1 && (
                                <form className="shipping-form">
                                <div className="flex items-center justify-between mt-12 mb-8">
                                    <div className=" flex flex-col gap-4 flex-1">
                                        <h3 className="font-bold">Shipping details</h3>
                                        <p className="font-normal">Use saved address? </p>
                                        <p className="font-light text-custom-btn-green">No saved address yet. Kindly fill the form below</p>
                                    </div>
                                    <div className="flex-1 border border-custom-btn-green italic p-3 rounded-md">Your item should be delivered to you in about 3 working days within Lagos & Abuja, and 5 to 7 days outside Lagos & Abuja.</div>
                                </div>
                                <div className="mb-6 flex items-center justify-between">
                                    <div className="relative w-[45%]">
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
                                    <div className="relative w-[45%]">
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
                                <div className="mb-6 flex items-center justify-between">
                                    <div className="relative w-[45%]">
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
                                    <div className="relative w-[45%]">
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
                                <div className="mb-6 flex items-center justify-between">
                                    <div className="relative w-[45%]">
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
                                    <div className="relative w-[45%]">
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
                                <div className="mb-6 flex items-center justify-between">
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
                                <div className="flex justify-end gap-3">
                                    <Link to="/cart">
                                        <button className="border border-custom-btn-green hover:bg-custom-btn-green hover:text-white  text-black font-normal py-2 px-8 rounded focus:outline-none focus:shadow-outline">
                                            Return To Cart
                                        </button>
                                    </Link>
                                    <button className="bg-custom-btn-green hover:bg-white hover:border hover:border-custom-btn-green hover:text-black text-white font-normal py-2 px-8 rounded focus:outline-none focus:shadow-outline"  onClick={handleNext}>
                                        Next
                                    </button>
                                </div>
                                </form>
                            )}

                            {step === 2 && (
                                <form className={`payment-form ${step === 2 ? '' : 'hidden'}`}>
                                    <div className="items-center justify-between mt-12 mb-8">
                                        <div className=" flex flex-col gap-4 ">
                                            <h3 className="font-bold">Payment Method</h3>
                                            <div className="flex items-center">
                                                <label className="inline-flex items-center">
                                                    <input
                                                    type="radio"
                                                    className="form-radio h-5 w-5 text-custom-btn-green checked:text-custom-btn-green"
                                                    name="payment-method"
                                                    value="card"
                                                    checked={paymentMethod === 'card'}
                                                    onChange={handleRadioChange}
                                                    />
                                                    <span className="text-gray-700 ml-2"><i className="fas fa-credit-card"></i></span>
                                                    <span className="ml-2 text-gray-700">Card</span>
                                                </label>
                                                <label className="inline-flex items-center ml-6">
                                                    <input
                                                    type="radio"
                                                    className="form-radio h-5 w-5 text-gray-600"
                                                    name="payment-method"
                                                    value="paypal"
                                                    checked={paymentMethod === 'paypal'}
                                                    onChange={handleRadioChange}
                                                    />
                                                    <span className="text-gray-700 ml-2"><i className="fab fa-paypal"></i></span>
                                                    <span className="ml-2 text-gray-700">PayPal</span>
                                                </label>
                                                
                                            </div>
                                        </div>
                                    </div>
                                    {paymentMethod === 'card' && (
                                        <div>
                                            <div className="mb-6 flex items-center justify-between">
                                                <div className="relative w-[100%]">
                                                    <input
                                                    type="text"
                                                    {...register("cardHoldersName")}
                                                    className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-custom-btn-green appearance-none dark:text-white dark:border-custom-btn-green dark:focus:border-custom-btn-green focus:outline-none focus:ring-0 focus:border-custom-btn-green peer ${
                                                        errors.cardHoldersName ? "border-red-500" : ""
                                                    }`}
                                                    placeholder=" "
                                                    />
                                                    <label
                                                    htmlFor="cardHoldersName"
                                                    className={`absolute text-sm text-custom-btn-green dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-custom-basic-color dark:bg-custom-btn-green px-2 peer-focus:px-2 peer-focus:text-custom-btn-green peer-focus:dark:text-custom-btn-green peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 ${
                                                        errors.cardHoldersName ? "text-red-500" : ""
                                                    }`}
                                                    >
                                                    {errors.cardHoldersName ? errors.cardHoldersName.message : "Card Holder's Name "}
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="mb-6 flex items-center justify-between">
                                                <div className="relative w-[100%]">
                                                    <input
                                                    type="text"
                                                    {...register("cardNumber")}
                                                    className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-custom-btn-green appearance-none dark:text-white dark:border-custom-btn-green dark:focus:border-custom-btn-green focus:outline-none focus:ring-0 focus:border-custom-btn-green peer ${
                                                        errors.cardNumber ? "border-red-500" : ""
                                                    }`}
                                                    placeholder=" "
                                                    />
                                                    <label
                                                    htmlFor="cardNumber"
                                                    className={`absolute text-sm text-custom-btn-green dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-custom-basic-color dark:bg-custom-btn-green px-2 peer-focus:px-2 peer-focus:text-custom-btn-green peer-focus:dark:text-custom-btn-green peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 ${
                                                        errors.cardNumber ? "text-red-500" : ""
                                                    }`}
                                                    >
                                                    {errors.cardNumber ? errors.cardNumber.message : "Card Number "}
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="mb-6 flex items-center justify-between">
                                                <div className="relative w-[45%]">
                                                    <input
                                                    type="text"
                                                    {...register("expirationDate")}
                                                    className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-custom-btn-green appearance-none dark:text-white dark:border-custom-btn-green dark:focus:border-custom-btn-green focus:outline-none focus:ring-0 focus:border-custom-btn-green peer ${
                                                        errors.expirationDate ? "border-red-500" : ""
                                                    }`}
                                                    placeholder=" "
                                                    />
                                                    <label
                                                    htmlFor="expirationDate"
                                                    className={`absolute text-sm text-custom-btn-green dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-custom-basic-color dark:bg-custom-btn-green px-2 peer-focus:px-2 peer-focus:text-custom-btn-green peer-focus:dark:text-custom-btn-green peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 ${
                                                        errors.expirationDate ? "text-red-500" : ""
                                                    }`}
                                                    >
                                                    {errors.expirationDate ? errors.expirationDate.message : "Expiration Date "}
                                                    </label>
                                                </div>
                                                <div className="relative w-[45%]">
                                                    <input
                                                    type="text"
                                                    {...register("cvv")}
                                                    className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-custom-btn-green appearance-none dark:text-white dark:border-custom-btn-green dark:focus:border-custom-btn-green focus:outline-none focus:ring-0 focus:border-custom-btn-green peer ${
                                                        errors.cvv ? "border-red-500" : ""
                                                    }`}
                                                    placeholder=" "
                                                    />
                                                    <label
                                                    htmlFor="cvv"
                                                    className={`absolute text-sm text-custom-btn-green dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-custom-basic-color dark:bg-custom-btn-green px-2 peer-focus:px-2 peer-focus:text-custom-btn-green peer-focus:dark:text-custom-btn-green peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 ${
                                                        errors.cvv ? "text-red-500" : ""
                                                    }`}
                                                    >
                                                    {errors.cvv ? errors.cvv.message : "Cvv "}
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="">
                                                <p>By clicking “confirm payment”, i agree to company terms of service</p>
                                            </div>
                                            <div className="flex justify-end gap-3 mt-6">
                                                <button className="border border-custom-btn-green hover:bg-custom-btn-green hover:text-white  text-black font-normal py-2 px-8 rounded focus:outline-none focus:shadow-outline"  onClick={handlePrevious}>
                                                    Previous
                                                </button>
                                                <button className="bg-custom-btn-green hover:bg-white hover:border hover:border-custom-btn-green hover:text-black text-white font-normal py-2 px-8 rounded focus:outline-none focus:shadow-outline"  onClick={handleNext}>
                                                    Make Payment
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </form>
                            )}
                            </div>
                        </div>

                    </div>
                    <div className="sm:col-span-full md:col-span-full lg:col-span-1 ">
                        <div className=" bg-white px-2 h-fit pb-2">
                            <div className="flex justify-between  bg-white shadow-sm py-4 border-b-1 border-custom-btn-green">
                            <h2 className="font-bold">Cart Summary</h2>
                            </div>

                            <div className="flex flex-col gap-4">
                            <div className="flex justify-between py-3">
                                <p className="flex-1">Delivery Fee:</p>
                                <p className="flex-1">
                                Add your delivery location during checkout to view
                                delivery cost
                                </p>
                            </div>

                            <div className="flex justify-between py-3">
                                <p className="flex-1">Subtotal</p>
                                <p className="flex-1 font-bold text-md text-custom-btn-green">
                                ${totalPrice}.00
                                </p>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )}
        </div>
      <Footer />
    </div>
  );
};

export default Checkout;

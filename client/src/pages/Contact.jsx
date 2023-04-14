import React, { useState } from "react";
import aboutbackground from "../assets/aboutus.svg";
import Footer from "../components/Footer";
import CombinedNav from "../components/CombinedNav";
import Header from "../components/Header";

const Contact = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [phone, setPhone] = useState("");

    // const overlayStyle = {
    //     position: "absolute",
    //     top: 0,
    //     left: 0,
    //     width: "100%",
    //     height: "100%",
    //     backgroundColor: "rgba(0, 0, 0, 0.5)",
    //   };

    const titleText = "Contact Us"
    const subtitleText = ""

  return (
    <>
        <CombinedNav/>
        <Header title={titleText} subtitle={subtitleText}/>
        <div className="w-[85%] mx-auto flex flex-col">
            <div className="flex flex-col">
                <p className="text-center">Do you have any questions or complaints? We are  here Monday - Friday  ( 8am - 10pm EST) just for you. </p>
                <p className="text-center">Fill the form below to send us a message or reach out to us at; </p>
                <p className="text-center">Email; <span>afriqfabs@gmail.com</span></p>
                <p className="text-center">Address; <span>18,ori-oke bustop, Offin-Ile, Igbogbo,Lagos State</span></p>
                <div className="w-11/12 mx-auto py-6 mt-10">
                    <form className="sm:w-full md:w-1/2 mx-auto">
                    <div className="flex flex-col gap-4">
                        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                            <div className="relative sm:w-full md:w-full">
                                <input type="email" id="email" onChange={(e) => setEmail(e.target.value)} className="block px-2.5 pb-2.5 pt-4 w-full text-sm  rounded-lg border border-custom-text-green  dark:focus:border-custom-btn-green  focus:border-custom-btn-green" placeholder=" " />
                                <label htmlFor="email" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-custom-basic-color px-2 peer-focus:px-2 peer-focus:text-custom-btn-green peer-focus:dark:text-custom-btn-green peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Email</label>
                            </div>

                            <div className="relative sm:w-full md:w-full">
                                <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 rounded-lg border border-custom-btn-green appearance-none dark:text-white  dark:focus:border-custom-btn-green focus:outline-none focus:ring-0 focus:border-custom-btn-green peer" placeholder=" " />
                                <label htmlFor="password" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-custom-basic-color px-2 peer-focus:px-2 peer-focus:text-custom-btn-green peer-focus:dark:text-custom-btn-green peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Password</label>
                            </div>
                        </div>
                        <div className="relative w-[100%]">
                            <input type="email" id="email" onChange={(e) => setPhone(e.target.value)} className="block px-2.5 pb-2.5 pt-4 w-full text-sm  rounded-lg border border-custom-text-green  dark:focus:border-custom-btn-green  focus:border-custom-btn-green" placeholder=" " />
                            <label htmlFor="email" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-custom-basic-color px-2 peer-focus:px-2 peer-focus:text-custom-btn-green peer-focus:dark:text-custom-btn-green peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Phone Number</label>
                        </div>
                        <div className="relative w-[100%]">
                                <textarea type="email" id="email" onChange={(e) => setMessage(e.target.value)} className="block px-2.5 pb-2.5 pt-4 w-full text-sm  rounded-lg border border-custom-text-green  dark:focus:border-custom-btn-green  focus:border-custom-btn-green" placeholder=" " />
                                <label htmlFor="email" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-custom-basic-color px-2 peer-focus:px-2 peer-focus:text-custom-btn-green peer-focus:dark:text-custom-btn-green peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Message</label>
                            </div>
                        <button className="bg-custom-btn-green text-white rounded-sm py-3 px-4 hover:bg-primary-light transition-colors duration-300">Send Message</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <Footer/>
    </>
  );
};

export default Contact;

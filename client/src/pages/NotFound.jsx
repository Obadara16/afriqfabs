import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CombinedNav from "../components/CombinedNav";
import Footer from "../components/Footer";




const NotFound = () => {
  
  

  return (
    <div className="">
      <CombinedNav />
      
        <div className="w-full mx-auto flex justify-center items-center h-[40vh] flex-col my-10 gap-4">
            <h1 className="text-4xl font-bold">404</h1>
            <p className=" font-semibold text-xl text-center">Page Not Found</p>       
        </div> 
      <Footer />
    </div>
  );
};

export default NotFound;

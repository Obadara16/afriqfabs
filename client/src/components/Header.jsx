import React from 'react'
import aboutbackground from "../assets/aboutus.svg";

const Header = () => {
  return (
    <div
            className="bg-cover bg-black bg-no-repeat flex justify-center items-center mb-20 h-[300px]  opacity-120"
            style={{ backgroundImage: `url(${aboutbackground})` }}
        >
            <div className="w-max flex justify-center">
                
            <div className="text-center">
                <h1 className="text-white">About Us</h1>
                <h4 className="text-white hidden md:block">
                Authenticity is our Watchword
                </h4>
            </div>
            </div>
            
        </div>
  )
}

export default Header
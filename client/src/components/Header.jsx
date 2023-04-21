import React from 'react'
import aboutbackground from "../assets/aboutus.svg";

const Header = ({title, subtitle}) => {
  return (
    <div className='h-[200px] mb-6'>
      <div
          className={`absolute w-full h-[200px] bg-cover bg-center transition-opacity `}
          style={{
            backgroundImage: `url(${aboutbackground})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div
            className="absolute inset-0"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
          ></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <h1 className="text-4xl font-light text-white">{title}</h1>
            {subtitle && <p className="text-xl text-white mt-6">{subtitle}</p>}
          </div>
        </div>
    </div>
  )
}

export default Header
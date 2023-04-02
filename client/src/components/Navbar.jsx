import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faSearch,
  faUser,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/logo.svg";
import SearchComponent from "./SearchComponent";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleNavClick = () => {
    setIsNavOpen(!isNavOpen);
  };

  const totalQuantity = useSelector(state =>
    state.cart.products.reduce((acc, curr) => acc + curr.quantity, 0)
  );


  return (
    <nav className="flex items-center justify-start mx-auto flex-wrap bg-transparent-800 p-2 w-[90%] px-[2.5%]">
      <div className="flex items-center flex-shrink-0 mr-6 ">
        <img src={logo} alt="logo" className="h-8 w-8" />
        <span className="font-semibold text-xl">
          Afriq<span className="text-green-500">Fabs</span>
        </span>
      </div>
      <div className="flex-1"></div>
      <div className="flex items-center md:hidden">
        <button
          className="text-black flex items-center justify-center ml-4 w-10 h-10 rounded-full border border-gray-300 focus:outline-none focus:border-green-600"
          onClick={handleNavClick}
        >
          <FontAwesomeIcon icon={faBars} className="" />
        </button>
      </div>
      <div
        className={`${isNavOpen ? "flex" : "hidden"} flex-col items-center justify-center mt-0 bg-transparent-800 text-small p-4 w-full md:w-auto md:flex md:flex-row md:justify-between`}
      >
        <SearchComponent className="w-full sm:w-1/2 md:w-fit lg:w-fit " />
        <div className="text-black flex items-center mt-4 md:mt-0 md:ml-4">
          <FontAwesomeIcon icon={faUser} className=" mr-2" />
          <Link to="/register"><span className="text-sm">Account</span></Link>
        </div>
        <div className="text-black flex items-center mt-4 md:mt-0 md:ml-4 whitespace-nowrap">
          <FontAwesomeIcon icon={faShoppingCart} className=" mr-2" />
          <Link to="/cart"><span className="text-sm">Cart ({totalQuantity})</span></Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

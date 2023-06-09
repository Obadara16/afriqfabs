import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faSearch,
  faUser,
  faShoppingCart,
  faHeart,
  faBagShopping,
  faDoorClosed,
  faArrowRightFromBracket,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/logo.svg";
import SearchComponent from "./SearchComponent";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/apiCalls";


const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const user = useSelector((state) => state.user.currentUser);
  const cart = useSelector((state) => state.cart);
  const cartQuantity = cart.products.length;
  const dispatch = useDispatch();




  const handleNavClick = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };


  return (
    <nav className="flex items-center justify-start mx-auto flex-wrap bg-transparent-800 p-2 w-[90%] px-[2.5%]">
      <Link to="/">
        <div className="flex items-center md:flex-1 flex-shrink-0">
          <img src={logo} alt="logo" className="h-8 w-8 mr-4" />
          <span className="font-semibold text-xl">
            Afriq<span className="text-green-500">Fabs</span>
          </span>
        </div>
      </Link>
      <div className="flex-1"></div>
      <div className="flex items-center md:hidden">
        <button
          className="text-black flex items-center justify-center ml-4 w-10 h-10 rounded-full focus:outline-none focus:border-green-600"
          onClick={handleNavClick}
        >
          {isNavOpen ? 
            <FontAwesomeIcon icon={faXmark}/>
            :
            <FontAwesomeIcon icon={faBars} />
          }
        </button>
      </div>
      <div
        className={`${isNavOpen ? "flex" : "hidden"} flex-col items-center justify-center mt-0 bg-transparent-800 text-small p-4 w-full md:w-auto md:flex md:flex-row md:flex-1 md:justify-between`}
      >
        <SearchComponent className="w-full md:w-full lg:w-full flex-2 " />
        {user ? 
            <nav className="w-full flex-1">
            <div className="md:flex items-center w-full mx-auto justify-between font-light sm:flex-wrap">
              <div className="relative group px-3 py-2">
                <div className="flex items-center justify-center">
                  <FontAwesomeIcon icon={faUser} className=" mr-2" />
                  <button className="hover:opacity-50 cursor-default">Account</button>
                </div>
                <div
                    className="absolute top-0  transition group-hover:translate-y-5 translate-y-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible duration-500 ease-in-out group-hover:transform z-50 w-[200px] transform">
                    <div className="relative top-6 px-4 py-2 bg-white rounded-sm shadow-xl w-fit">
                    <div
                        className="w-2 h-2 bg-white transform rotate-45 absolute top-0 z-0 -translate-x-4 transition-transform group-hover:translate-x-3 duration-500 ease-in-out rounded-sm">
                    </div>
                    <div className="relative z-10 flex flex-col gap-9 justify-between">
                        <ul className="mt-3 text-[15px]">
                          <li>
                              <Link to="/profile"
                              className="flex items-center  py-2">
                                <FontAwesomeIcon icon={faUser} className="text-green-500 p-1"/><span className="pl-2"> My Profile</span>
                              </Link>
                          </li>
                          <li>
                              <Link to="/orders"
                              className="flex items-center text-black py-2">
                                <FontAwesomeIcon icon={faBagShopping} className= "text-green-500 p-1"/><span className="pl-2"> My Orders</span>
                              </Link>
                          </li>
                          <li>
                              <Link to="/favorite"
                              className="flex items-center text-black py-2">
                                <FontAwesomeIcon icon={faHeart} className="text-green-500 p-1"/><span className="pl-2"> My Favorite</span>
                              </Link>
                          </li>
                        </ul>
                        <div>
                          <ul>
                            <li>
                                  <button className="text-red-500" onClick={handleLogout}>
                                  <FontAwesomeIcon icon={faArrowRightFromBracket} className="pr-1" /><span className="pl-2">Logout</span>
                                  </button>
                            </li>
                          </ul>
                        </div>
                    </div>
                    </div>
                </div>
              </div>    
            </div>
          </nav>
          :
          <div className="text-black flex items-center mt-4 md:mt-0 md:ml-4 whitespace-nowrap flex-1">
          <FontAwesomeIcon icon={faUser} className=" mr-2" />
          <Link to="/register"><span className="text-sm">Account</span></Link>
        </div>
        }
        
        <div className="text-black flex items-center mt-4 md:mt-0 md:ml-4 whitespace-nowrap flex-1">
          <FontAwesomeIcon icon={faShoppingCart} className=" mr-2" />
          <Link to="/cart"><span className="text-sm">Cart ({cartQuantity})</span></Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

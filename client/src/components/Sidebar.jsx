import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { colors } from "../data";
import CustomCheckBox from "../partials/CustomCheckBox";
import { BASE_URL } from "../requestMethods";
import { logoutUser } from "../redux/apiCalls";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket, faBagShopping, faHeart, faUser } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";

const Sidebar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
  
    const handleLogout = () => {
        dispatch(logoutUser())
        navigate("/")
    }

  return (
    <div className="bg-white flex flex-col gap-10 mt-12 w-full h-fit justify-between">
            <div className="flex flex-col">
                <Link  className="py-4 px-4 flex items-center" to="/profile">
                    <FontAwesomeIcon icon={faUser} className="text-green-500 p-1"/><span className="pl-2"> My Profile</span>
                </Link>
                <Link className="py-4 px-4 border-t border-b flex items-center border-gray-200" to="/orders">
                    <FontAwesomeIcon icon={faBagShopping} className="text-green-500 p-1"/><span className="pl-2"> My Orders</span> 
                </Link>
                <Link className="py-4 px-4 flex items-center" to="/favourites">
                    <FontAwesomeIcon icon={faHeart} className="text-green-500 p-1"/><span className="pl-2"> My Favorites</span>
                </Link>
            </div>
            <div className="w-full flex px-4 py-4 border-t border-gray-200">
                <FontAwesomeIcon icon={faArrowRightFromBracket} className="text-red-500 p-1"/><span className="pl-2 hover:cursor-pointer"onClick={handleLogout}>Logout</span>
            </div>
    </div>
  );
};

export default Sidebar;

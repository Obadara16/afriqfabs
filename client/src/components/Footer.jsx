import {
  Facebook,
  Instagram,
  MailOutline,
  Phone,
  Pinterest,
  Room,
  Twitter,
} from "@material-ui/icons";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { mobile } from "../responsive";
import logo from "../assets/logo.svg"

const Footer = () => {
  return (
    <div className="relative">
  {/* <div className="h-10"></div> 
  <div className="absolute  left-0 h-full w-full overflow-hidden">
    <div className="absolute h-[50%] w-full top-72 left-0 bg-green-500 transform -rotate-45 -translate-x-2/3"></div>
  </div> */}
  <div className="container mx-auto py-6 px-4">
  <div className=" w-full mx-auto mt-20 border-t-2 border-custom-btn-green border-opacity-60  ">
      <div className="w-11/12 mx-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-20">
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4 text-sm">
          <p className="flex justify-center align-center h-[60px]"><img src={logo} alt="logo" height={60}/><span className="text-xl font-bold font-oleo ">Afriq<span className="text-green-500">Fabs</span>.</span></p>
          <p className="mb-4">
          We pride ourselves on our expertise in the industry and are committed to providing exceptional customer service to each and every customer.
          </p>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
          <h3 className="text-lg font-bold mb-4">Useful Links</h3>
          <ul className="list-none">
            <li className="mb-2">
              <Link to="#" className="text-gray-600 hover:text-gray-800 text-sm">
                Home
              </Link>
            </li>
            <li className="mb-2">
              <Link to="#" className="text-gray-600 hover:text-gray-800 text-sm">
                Cart
              </Link>
            </li>
            <li className="mb-2">
              <Link to="#" className="text-gray-600 hover:text-gray-800 text-sm">
                Man Fashion
              </Link>
            </li>
            <li className="mb-2">
              <Link to="#" className="text-gray-600 hover:text-gray-800 text-sm">
                Woman Fashion
              </Link>
            </li>
            <li className="mb-2">
              <Link to="#" className="text-gray-600 hover:text-gray-800 text-sm">
                Accessories
              </Link>
            </li>
            <li className="mb-2">
              <Link to="#" className="text-gray-600 hover:text-gray-800 text-sm">
                My Account
              </Link>
            </li>
            <li className="mb-2">
              <Link to="#" className="text-gray-600 hover:text-gray-800 text-sm">
                Order Tracking
              </Link>
            </li>
          </ul>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
          <h3 className="text-lg font-bold mb-4">Useful Links</h3>
          <ul className="list-none">
            <li className="mb-2">
              <Link to="#" className="text-gray-600 hover:text-gray-800 text-sm">
                Home
              </Link>
            </li>
            <li className="mb-2">
              <Link to="#" className="text-gray-600 hover:text-gray-800 text-sm">
                Cart
              </Link>
            </li>
            <li className="mb-2">
              <Link to="#" className="text-gray-600 hover:text-gray-800 text-sm">
                Man Fashion
              </Link>
            </li>
            <li className="mb-2">
              <Link to="#" className="text-gray-600 hover:text-gray-800 text-sm">
                Woman Fashion
              </Link>
            </li>
            <li className="mb-2">
              <Link to="#" className="text-gray-600 hover:text-gray-800 text-sm">
                Accessories
              </Link>
            </li>
            <li className="mb-2">
              <Link to="#" className="text-gray-600 hover:text-gray-800 text-sm">
                My Account
              </Link>
            </li>
            <li className="mb-2">
              <Link to="#" className="text-gray-600 hover:text-gray-800 text-sm">
                Order Tracking
              </Link>
            </li>
          </ul>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
          <h3 className="text-lg font-bold mb-4">Contact Us</h3>
          <ul className="list-none">
            <li className="flex items-center mb-2 text-sm">
              <Room className="mr-2" />
              Ogunnaike, Shangisha, Magodo
            </li>
            <li className="flex items-center mb-2 text-sm">
              <Phone className="mr-2" />
              +1 234 56 78
            </li>
            <li className="flex items-center mb-2 text-sm">
              <MailOutline className="mr-2" />
              contact@afriqfabs.dev
            </li>
          </ul>
          <div className="flex">
            <Link
              to="#"
              className="bg-custom-btn-green text-white rounded-full h-8 w-8 flex items-center justify-center mr-4"
            >
              <Facebook />
            </Link>
            <Link
              to="#"
              className="bg-custom-btn-green text-white rounded-full h-8 w-8 flex items-center justify-center mr-4"
            >
              <Instagram />
            </Link>
            <Link
              to="#"
              className="bg-custom-btn-green text-white rounded-full h-8 w-8 flex items-center justify-center mr-4"
            >
              <Twitter />
            </Link>
            <Link
              to="#"
              className="bg-custom-btn-green text-white rounded-full h-8 w-8 flex items-center justify-center"
            >
              <Pinterest />
            </Link>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</div>

    
    
  );
};
export default Footer;
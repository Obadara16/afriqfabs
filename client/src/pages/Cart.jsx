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
import {
  removeProduct,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from "../redux/cartRedux";
import logo from "../assets/logo.svg";

import { loadStripe } from "@stripe/stripe-js/pure";
const KEY = "sk_test_51LPIVnI8iL9AvZS5cEDZJKZIzcmZslAxU2XoBKYCTEaMBIh8NbWCPx9Bj5GX8CN3ZWBVUGF1nwDFbFz8WL3E8Ohu00Ghi24cDn"

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  console.log("this are the products in the cart", cart);
  const user = useSelector((state) => state.user.currentUser);
  const cartQuantity = cart.products.length;

  const totalPrice = useSelector(state =>
    state.cart.products.reduce((acc, curr) => acc + curr.quantity * curr.price, 0)
  );
  

  const dispatch = useDispatch();



  const [stripeToken, setStripeToken] = useState(null);
  const navigate = useNavigate();

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post("/checkout/payment", {
          tokenId: stripeToken.id,
          amount: 500,
        });
        navigate("/success", {
          stripeData: res.data,
          products: cart,
        });
      } catch {}
    };
    stripeToken && makeRequest();
  }, [stripeToken, totalPrice, history]);
  

  const handleRemove = (_id) => {
    console.log("remove id", _id)
    dispatch(removeProduct(_id));
  };

  const handleIncrease = (_id) => {
    dispatch(increaseQuantity(_id));
  };

  const handleDecrease = (_id) => {
    dispatch(decreaseQuantity(_id));
  };
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="flex flex-col h-full w-full mx-auto">
      <CombinedNav />
      <div className="w-10/12 mx-auto relative h-full  flex-1">
        {cart.products.length === 0 ? (
          <div className="flex flex-col w-full justify-center h-[60vh] items-center text-center">
            <p className="text-sm md:text-lg">Your cart is currently empty</p>
            <Link to="/products"><button className="py-3 px-6 rounded-md my-8 bg-custom-btn-green text-white w-fit whitespace-nowrap text-sm">Shop Products </button></Link>
          </div>
        ) : (
          <div className="mt-12">
            <h1 className="text-xl font-semibold my-4">
            My Cart ({cartQuantity})
          </h1>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white sm:col-span-full md:col-span-full lg:col-span-3">
              <div className="grid grid-cols-3  bg-white shadow-sm px-6 py-4 border-b-1 border-custom-btn-green text-center">
                <h2 className="font-bold col-span-1">Products</h2>
                <h2 className="font-bold col-span-1">Quantity</h2>
                <h2 className="font-bold col-span-1">Total</h2>
              </div>
              {cart.products.map((product) => {
                const {
                  _id,
                  price,
                  quantity,
                  title,
                  desc,
                  img,
                  available_quantity,
                } = product;
                return (
                  <div
                    key={_id}
                    className="flex justify-between my-4 px-6 bg-white "
                  >
                    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-[30%]">
                      <div className="flex flex-col gap-5 w-full">
                        <img src={img} alt={title} className="w-[240px] h-62 mr-4" />
                        <p>
                          <button
                            onClick={() => handleRemove(_id)}
                            className="text-red-600"
                          >
                            <FontAwesomeIcon icon={faTrashCan} />
                            <span className="pl-4">Delete</span>
                          </button>
                        </p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <h2 className="font-bold ">{title}</h2>
                        <p className="text-gray-600">{desc}</p>
                        <p className="text-custom-btn-green font-bold">
                          ${price}.00
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-center mt-10 w-[30%]">
                      <button
                        className="bg-gray-200 w-8 h-8 flex justify-center items-center"
                        onClick={() => handleDecrease(_id)}
                        disabled={quantity === 1}
                      >
                        <FontAwesomeIcon icon={faMinus} />
                      </button>
                      <span className="font-bold w-8 h-8 bg-gray-100 flex items-center justify-center">
                        {quantity} 
                      </span>
                      <button
                        className="bg-gray-200 w-8 h-8 flex justify-center items-center"
                        onClick={() => handleIncrease(_id)}
                        disabled={quantity === available_quantity}
                      >
                        <FontAwesomeIcon icon={faPlus} />
                      </button>
                    </div>

                    <div className="w-[30%] flex justify-center mt-10">
                      <h2 className="font-semibold text-md text-custom-btn-green">
                        ${price * quantity}.00
                      </h2>
                    </div>
                  </div>
                );
              })}
              <div className="flex justify-end px-10 py-4">
                <button
                  className="border border-red-500 text-red-500 px-5 rounded-sm py-2"
                  onClick={handleClearCart}
                >
                  <FontAwesomeIcon icon={faTrashCan} />
                  <span className="pl-4">Clear Cart</span>
                </button>
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
              {user ? (
                <div className="w-full flex flex-col gap-4">
                  <StripeCheckout
                    name="Afriq Fabs"
                    image={logo}
                    description={`Your total is $${totalPrice}`}
                    amount={totalPrice * 100}
                    token={onToken}
                    stripeKey={KEY}
                    className="w-full"
                  >
                    <button className="bg-custom-btn-green paystack-button text-white font-md py-2 px-4 rounded hover:bg-gray-400 transition-colors duration-300 mt-4 w-full">
                      Proceed to Stripe Checkout
                    </button>
                  </StripeCheckout>
                  <Link to="/checkout">
                    <button className="border border-custom-btn-green hover:bg-gray-400 hover:text-white  text-black font-normal py-2 px-8 rounded focus:outline-none focus:shadow-outline w-full">
                        Proceed to Checkout
                    </button>
                  </Link>

                </div>
              ) : (
                <button
                  className="bg-custom-btn-green text-white font-bold py-2 px-4 rounded hover:bg-gray-400 transition-colors duration-300 mt-4 w-full"
                  onClick={() => navigate("/login")}
                >
                  Login to Checkout
                </button>
              )}
            </div>
          </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Cart;

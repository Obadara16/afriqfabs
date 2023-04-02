import React, { useEffect, useState } from "react";
import { faPlus, faMinus, faTrash, faDeleteLeft, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { userRequest } from "../requestMethods";
import { useNavigate } from "react-router-dom";
import { PaystackButton } from "react-paystack";
import CombinedNav from "../components/CombinedNav";
import Footer from "../components/Footer";
import { removeProduct, increaseQuantity, decreaseQuantity, clearCart } from "../redux/cartRedux";
const KEY = "pk_test_172e3c08c10eab0ba0870694ed47f31b9d16ba2d"

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  console.log("this are the products in the cart", cart)
  const user = useSelector((state) => state.user.currentUser);
  const totalQuantity = useSelector(state =>
    state.cart.products.reduce((acc, curr) => acc + curr.quantity, 0)
  );
  const [paystackResponse, setPaystackResponse] = useState(null);
  const history = useNavigate();
  const dispatch = useDispatch()

  // const handleRemove = (_id) => {
  //   dispatch(
  //     removeProduct({ id: _id })
  //   );
  // };
  



  // const handleRemove = async (_id) => {
  //   console.log(_id)
  //   try {
  //     const res = await userRequest.delete(`/cart/${_id}`);
  //     window.location.reload();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleRemove = (_id) => {

    dispatch(
      removeProduct(_id)
      
    );
  };


  const handleIncrease = (_id) => {
      dispatch(increaseQuantity(_id));
  }

  const handleDecrease = (_id) => {
    dispatch(decreaseQuantity(_id));
}
const handleClearCart = () => {
  dispatch(clearCart());
}
  

  const onToken = (response) => {
    setPaystackResponse(response);
  };
  
  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post("/checkout/payment", {
          reference: paystackResponse.reference,
          amount: cart.total,
          email: user.email,
        });
        history.push("/success", {
          paystackData: res.data,
          products: cart,
        });
      } catch {}
    };
    paystackResponse && makeRequest();
  }, [paystackResponse, cart.total, history, user.email]);

  const generateReference = () => {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (let i = 0; i < 10; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return `ref-${text}`;
  };
  
  

  return (
    <div className="flex flex-col min-h-screen w-full mx-auto">
      <CombinedNav/>
      <div className="w-10/12 mx-auto mt-8 flex-1">
        <h1 className="text-xl font-semibold mb-8">My Cart ({totalQuantity})</h1>
        {cart.products.length === 0 ? (
        <p>Your cart is empty</p>
        ) : (
        <div className="w-full flex justify-between">
            <div className="bg-white w-[75%]">
              <div className="flex justify-between  bg-white shadow-sm px-6 py-4 border-b-1 border-custom-btn-green text-center">
                <h2 className="font-bold w-[30%]">Products</h2>
                <h2 className="font-bold w-[30%]">Quantity</h2>
                <h2 className="font-bold w-[30%]">Total</h2>
              </div>
              {cart.products.map((product) => {
                  const {_id, price, quantity, title, desc, img, available_quantity} = product;
                return (
                  <div key={_id} className="flex justify-between my-4 px-6 bg-white ">
                    <div className="flex items-center w-[30%]">
                      <div className="flex flex-col gap-5">
                        <img src={img}  alt={title} className="w-32 h-32 mr-4"/>
                          <p>
                            <button onClick={() => handleRemove(_id)} className="text-red-600">
                            <FontAwesomeIcon icon={faTrashCan}/><span className="pl-4">Delete</span>
                            </button>
                          </p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <h2 className="font-bold ">{title}</h2>
                        <p className="text-gray-600">{desc}</p>
                        <p className="text-custom-btn-green font-bold">${price}.00</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-center mt-2 w-[30%]">
                        <button
                        className="bg-gray-200 w-8 h-8 flex justify-center items-center"
                        onClick={() => handleDecrease(_id)}
                        disabled={quantity === 1}
                        >
                        <FontAwesomeIcon icon={faMinus} />
                      </button>
                      <span className="font-bold w-8 h-8 bg-gray-100 flex items-center justify-center">{quantity}</span>
                      <button
                      className="bg-gray-200 w-8 h-8 flex justify-center items-center"
                      onClick={() => handleIncrease(_id)}
                      disabled={quantity === available_quantity}
                      >
                      <FontAwesomeIcon icon={faPlus} />
                      </button>
                    </div>

                    <div className="w-[30%] flex justify-center items-center">
                      <h2 className="font-semibold text-md text-custom-btn-green">${price * quantity}.00</h2>
                    </div>
                  </div>         
                )
              } 
              )}
                <div className="flex justify-end px-10 py-4"><button className="border border-red-500 text-red-500 px-5 rounded-sm py-2" onClick={handleClearCart}><FontAwesomeIcon icon={faTrashCan} /><span className="pl-4">Clear Cart</span></button></div>

            </div>
            <div className="w-[23%]">
              <div className=" bg-white px-2 h-fit pb-2">
                <div className="flex justify-between  bg-white shadow-sm py-4 border-b-1 border-custom-btn-green">
                    <h2 className="font-bold">Cart Summary</h2>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex justify-between py-3">
                    <p className="flex-1">Delivery Fee:</p>
                    <p className="flex-1">Add your delivery location during checkout to view delivery cost</p>
                  </div>

                  <div className="flex justify-between py-3">
                    <p className="flex-1">Subtotal</p>
                    <p className="flex-1 font-bold text-md text-custom-btn-green">${cart.total}.00</p>
                  </div>
                
                </div>
              </div>
                {user ? (
                  <PaystackButton
                    className="bg-custom-btn-green paystack-button text-white font-md py-2 px-4 rounded hover:bg-gray-400 transition-colors duration-300 mt-4 w-full"
                    text="Make Payment"
                    callback={onToken}
                    reference={generateReference()}
                    email={user.email}
                    amount={cart.total * 100}
                    publicKey={KEY}
                  />
                  ) : (
                  <button
                    className="bg-custom-btn-green text-white font-bold py-2 px-4 rounded hover:bg-gray-400 transition-colors duration-300 mt-4"
                    onClick={() => history.push("/login")}
                  >
                     Login to Checkout
                  </button>
                )}
            </div>
        </div>
        )}
        
      </div>
      <Footer/>
    </div>
);
};

export default Cart;

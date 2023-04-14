import { Add, FavoriteBorderOutlined, Remove } from "@material-ui/icons";
import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { publicRequest } from "../requestMethods";
import { addProduct, decreaseQuantity, increaseQuantity } from "../redux/cartRedux";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClover, faHeart, faPlus } from "@fortawesome/free-solid-svg-icons";
import Products from "../components/Products";
import CombinedNav from "../components/CombinedNav";


const ProductDetails = () => {
  const cart = useSelector((state) => state.cart);
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate()
  const dispatch = useDispatch();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/products/find/" + id);
        setProduct(res.data);
      } catch {}
    };
    getProduct();
  }, [id]);


  const handleClick = () => {
    dispatch(addProduct({ product, quantity }));
    navigate("/cart")
  }

  const handleDecrease = (_id) => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = (_id) => {
    setQuantity(quantity + 1);
  };

  const {_id, img, title, desc, price, productSlug } = product;

  
  return (
    <div className="w-full">
      <CombinedNav/>
      <section className="w-11/12 mx-auto flex flex-col my-12 gap-6  ">
        {/* Product Images and Add to cart section goes here */}
        <section className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-16 ">
          <div className="col-span-2 md:flex h-fit">
            <div className="flex flex-col justify-center gap-4 h-fit md:w-1/3 sm:w-full">
              <img className="w-full md:w-[100%] h-[124px]" src={img} alt={title}/>
              <img className="w-full md:w-[100%] h-[124px]" src={img} alt={title}/>
              <img className="w-full md:w-[100%] h-[124px] transform -rotate-180" src={img} alt={title}/>
            </div>
            <div className="flex sm:w-full md:w-2/3 justify-center sm:pt-4 md:pt-0 md:px-4 h-full">
              <img className=" sm:w-full md:min-[380px] object-cover md:h-[480px] " src={img} alt={title} />
            </div>
          </div>
          <div className="col-span-1 p-0 px-24 flex flex-col gap-6 justify-center">
            <h1 className="font-bold">{title}</h1>
            <p className="font-semibold italic">{desc}</p>
            <span className="text-xl font-semibold text-custom-btn-green">$ {price}.<span className="text-xs align-baseline">00</span></span>
            <div className="flex flex-col items-start gap-3">
              <span className="font-light ">Color:</span>
              {/* {map((c) => (
                <div className={`w-5 h-5 rounded-full border border-gray-400 pl-4 cursor-pointer ${color === c && 'border-teal-500'}`} style={{ backgroundColor: c }} onClick={() => setColor(c)} key={c}></div>
              ))} */}
            </div>
            <div className="flex flex-col gap-3">
              <span className="font-light mr-2">Size:</span>
              <p className="text-black font-normal text-normal rounded-md border-custom-btn-green border-solid border-2 w-fit p-2 ">{quantity? 8*quantity : "8"} yards</p>
            </div>
            <div className="flex flex-col gap-3">
              <span className="font-light mr-2">Quantity:</span>
              <div className="flex items-center border border-gray-400 w-fit">
                <Remove className="cursor-pointer text-black border border-b-gray-400" onClick={() => handleDecrease(_id)} style={{bg: "#D9D9D9"}} />
                <span className="px-3">{quantity}</span>
                <Add className="cursor-pointer  text-black border border-b-gray-400" onClick={() => handleIncrease(_id)} style={{bg: "#D9D9D9"}}/>
              </div>
            </div>
            <div>
                <div className="flex gap-4">
                <button className="bg-custom-btn-green hover:bg-custom-brown h-[54px] hover:text-black text-white font-light px-8 py-4 rounded-md transition duration-300 ease-in-out transform hover:-translate-y-1 sm:text-[12px] md:text-[16px] whitespace-nowrap hover:scale-110" onClick={handleClick}>Add to Cart    .     {price}.00</button>
                <div className="border border-custom-btn-green border-opacity-60 flex items-center justify-center w-[100px] h-[54px] gap-4 py-4 px-4 rounded-md flex-nowrap font-light">
                  <FavoriteBorderOutlined />
                  <span className="text-black font-light">194</span>
                </div>
              </div>

              </div>
          </div>
        </section>

        {/* Product Description and Refund section goes here */}
        <section className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-16 my-12">
          <div className="col-span-2  h-fit flex flex-col gap-5  ">
            <div className="w-full">
                  <h3 className="font-semibold text-2xl leading-8 tracking-wider text-gray-900" >Product Description</h3>
                  <p className=" leading-7 tracking-wider text-opacity-80 text-gray-900">An African wax print is a type of colorful and vibrant fabric that is typically made of 100% cotton and features a waxy coating on the surface. The wax coating is used as a resist dyeing technique where the fabric is printed with a design using wax, which then resists the dye when the fabric is immersed in a dye bath. This results in a distinctive pattern with bold and contrasting colors.
    African wax prints come in a wide range of designs, from geometric patterns to floral prints, and often feature bright and bold colors such as red, yellow, green, and blue. They are known for their durability, vibrant colors, and unique designs, making them a popular choice for both fashion and decor.</p>
            </div>
            <div className="w-full">
                  <h3 className="font-semibold text-2xl leading-8 tracking-wider text-gray-900">Care Instruction</h3>
                  <p className=" leading-7 tracking-wider text-opacity-80 text-gray-900">An African wax print is a type of colorful and vibrant fabric that is typically made of 100% cotton and features a waxy coating on the surface. The wax coating is used as a resist dyeing technique where the fabric is printed with a design using wax, which then resists the dye when the fabric is immersed in a dye bath. This results in a distinctive pattern with bold and contrasting colors.
    African wax prints come in a wide range of designs, from geometric patterns to floral prints, and often feature bright and bold colors such as red, yellow, green, and blue. They are known for their durability, vibrant colors, and unique designs, making them a popular choice for both fashion and decor.</p>
            </div>
          </div>
          <div className="col-span-1 p-0 md:px-10 flex flex-col gap-4">
            <h1 className="font-semibold text-l leading-8 tracking-wider text-gray-900">Return and Refund Policy</h1>
            <p className="leading-7 tracking-wider text-opacity-80 text-gray-900">Thank you for shopping at AfriqFabs Store! We want you to be completely satisfied with your purchase. If for any reason you are not satisfied, you may return the item within 30 days of purchase for a refund, exchange, or store credit.
            ELIGIBILITY Only items purchased directly from AfriqFabs Store are eligible for returns. Custom-made or personalized items may not be returned.
            TIMEFRAME Items must be returned within 30 days of the purchase date. After 30 days, all sales are final.
            CONDITION Items must be returned in their original condition, unused, and with all original packaging and tags attached.
            REFUNDS Refunds will be issued in the same form of payment used for the original purchase. Shipping charges are non-refundable. In cases where an exchange is requested, any difference in price will be charged or refunded accordingly.
            FEES There are no restocking fees for returns. However, customers are responsible for any return shipping costs.
            PROCESS To initiate a return, please contact our customer service team at [afriqfabs@gmail.com]. We will provide you with a return authorisation number and a shipping label. Please include the return authorisation number on the outside of the package and ship the item back to us within 30 days.
            CONTACT INFORMATION If you have any questions or concerns about our return policy, please don't hesitate to contact us at [08037343873].
            </p>  
            <div className="border-t-2 border-b-2 border-custom-btn-green border-opacity-60 flex justify-between py-4">
              <p>Payment Method</p>
              <FontAwesomeIcon icon={faPlus}/>
            </div>

          </div>
        </section>

        {/* Related products section goes here */}
        <section >
          <h3 className="text-center font-semibold">Related Products</h3>
          <Products displayNo={4} noOfCols={4} featured={productSlug}/>
        </section>
      </section>
      <Footer />
    </div>

  );
};

export default ProductDetails;

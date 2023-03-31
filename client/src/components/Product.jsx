import {
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState } from "react";

const Product = ({ item }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [imageRotation, setImageRotation] = useState(0);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    e.preventDefault(); // prevent the link from being followed
    setIsFavorite(!isFavorite);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    const degrees = Math.floor(Math.random() * 90);
    setImageRotation(degrees);
  };

  const imageStyle = {
    transform: `rotate(${isHovered ? imageRotation : 0}deg)`,
    transition: "transform 0.5s ease",
  };

  const overlayStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  };

  return (
    <Link to={`/product/${item.slug}`}>
      <div className="flex-1 min-w-[240px] h-fit relative bg-white">
        <div className="bg-gray-300 bg-opacity-20 relative">
          <img
            src={item.img}
            className="h-[200px] w-full relative"
            alt={item.title}
            style={imageStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
          <div style={overlayStyle}></div>
          <div className="w-full h-full absolute top-0 left-0 z-3 flex items-center justify-center transition-all duration-500 cursor-pointer">
            <div
              className={`w-10 h-10 rounded-full bg-gray-400 text-${isFavorite ? `green-500` : "white"} flex items-center justify-center m-0 transition-all duration-500 z-99 transform hover:scale-110 absolute top-4 right-4`}
              onClick={handleFavoriteClick}
            >
              <FavoriteBorderOutlined />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5 bg-opacity-0 z-4 py-5 px-4 ">
          <div className="flex justify-between">
            <p className="text-black font-bold text-normal">PROD-001</p>
            <p className="text-green-500 font-bold text-normal">${item.price}<span className="text-xs pr-2">.99</span></p>
          </div>
          <p className="text-black text-normal">{item.title}</p>
          <p className="text-black text-normal">{item.desc}</p>
          <p className="text-black font-normal text-normal rounded-md border-blue-600 border-solid border-2 w-fit p-2 ">8 yards</p>
        </div>
      </div>
    </Link>
  );
};

export default Product;

import {
  FavoriteBorderOutlined,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState } from "react";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Product = ({ item, featured }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [imageRotation, setImageRotation] = useState(0);

  function handleFavoriteClick(e) {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite)
    console.log("you clickked me")
    // your favorite icon toggle logic here
  }

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
    transition: "transform 1.5s ease",
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
    <Link to={`/product/${item.slug}`} className= "w-full">
      <div className="h-fit  w-full bg-white">
        <div className="bg-gray-300  w-full bg-opacity-20 relative overflow-hidden">
          <img
            src={item.img}
            className="h-[250px] w-full relative"
            alt={item.title}
            style={imageStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            loading="lazy"
          />
          <div className="h-full w-full absolute top-0 left-0 bg-black opacity-50 flex z-0 items-center justify-center pointer-events-none">
            <div
              className={`w-10 h-10 rounded-full bg-gray-400 text-${isFavorite ? `green-500` : `white`} flex items-center pointer-events-auto justify-center m-0 transition-all duration-500 z-10 transform hover:scale-110 absolute top-4 right-4`}
              onClick={handleFavoriteClick}
            >
              {isFavorite ?
              <FontAwesomeIcon icon={faHeart} style={{color: "#FFFFFF",}} />
              :  
              <FavoriteBorderOutlined />
              }
            </div>
          </div>
        </div>
        {featured ?
          <div className="flex flex-col gap-5 bg-opacity-0 z-4 py-5 px-4 h-[150px] justify-around">
            <p className="text-black text-normal">{item.desc}</p>
            <p className="text-green-500 font-bold text-normal">${item.price}<span className="text-xs pr-2">.99</span></p>
          </div>  
        :
          <div className="flex flex-col gap-5 bg-opacity-0 z-4 py-5 px-4 ">
            <div className="flex justify-between">
              <p className="text-black font-bold text-normal">PROD-001</p>
              <p className="text-green-500 font-bold text-normal">${item.price}<span className="text-xs pr-2">.99</span></p>
            </div>
            <p className="text-black text-normal">{item.title}</p>
            <p className="text-black text-normal">{item.desc}</p>
            <p className="text-black font-normal text-normal rounded-md border-custom-btn-green border-solid border-2 w-fit p-2 ">8 yards</p>
          </div>
        }
        
      </div>
    </Link>
  );
};

export default Product;

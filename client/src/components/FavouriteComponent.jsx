import { useEffect, useState } from "react";
import axios from "axios";
import {
    FavoriteBorderOutlined,
    SearchOutlined,
    ShoppingCartOutlined,
  } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { BASE_URL } from "../requestMethods";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import nosaved from "../assets/nosaved.svg"

const FavouriteComponent = ({ cat, filters, sort, displayNo, featured, related }) => {
  const [products, setProducts] = useState([]);
  const [favourite, setFavourite] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([]);
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

  useEffect(() => {
    const getProducts = async () => {
      try {
        let endpoint = `${BASE_URL}products`;
        if (cat) {
          endpoint += `?categorySlug=${cat}`;
        } else if (featured) {
          endpoint += `/featured`;
        } else if (related) {
          endpoint += `/related?productSlug=${related}`;
        }
        const res = await axios.get(endpoint);
        setProducts(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, [cat, featured, related]);

  
  
  

  

  

  return (
    <div className="container w-full">
        <h2>Favourites ({favourite.length})</h2>
        {favourite ? 
            <div className="flex justify-center items-center">
                <img src={nosaved} alt="nosaved" height={265} width={265}/>
            </div>
            :
            <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-3`}>
                {products.slice(0, displayNo).map((item) => (
                    <div
                        key={item._id}
                        className="w-full py-4"
                    >
                        <Link to={`/product/${item.slug}`} className="w-full">
                            <div className="w-full h-fit relative bg-white">
                                <div className=" relative">
                                <img
                                    src={item.img}
                                    className="h-[120px] w-full relative"
                                    alt={item.title}
                                    // style={imageStyle}
                                    // onMouseEnter={handleMouseEnter}
                                    // // onMouseLeave={handleMouseLeave}
                                />
                                </div>
                                    <div className="flex flex-col gap-5 bg-opacity-0 z-4 py-5 px-2 ">
                                        <div className="flex justify-between">
                                            <p className="text-black font-bold text-sm">PROD-001</p>
                                            <p className="text-green-500 font-bold text-sm">${item.price}<span className="text-xs pr-2">.99</span></p>
                                        </div>
                                        <p className="text-black text-sm">{item.title}</p>
                                        <p className="text-black text-sm">{item.desc}</p>
                                        <div className="flex justify-between">
                                            <p className="text-black font-normal text-xs rounded-md border-custom-btn-green whitespace-nowrap border-solid border-2 w-fit p-2 ">8 yards</p>
                                            <div className='flex items-center'>
                                                <FontAwesomeIcon icon={faTrashCan} className="text-red-500 p-1"/><span className="pl-2 text-red-500 text-xs"> Remove </span>
                                            </div>
                                        </div>
                                        <button className="bg-custom-btn-green w-fit hover:bg-white hover:border hover:border-custom-btn-green hover:text-black text-white font-normal py-3 px-8 rounded focus:outline-none focus:shadow-outline">
                                            Purchase
                                        </button>
                                    </div>
                            </div>
                        </Link>
                    </div>
                    ))
                }
            </div>
        }
    </div>
  );
};

export default FavouriteComponent;

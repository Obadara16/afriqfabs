import { useEffect, useState } from "react";
import axios from "axios";
import {
    FavoriteBorderOutlined,
    SearchOutlined,
    ShoppingCartOutlined,
  } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { BASE_URL } from "../requestMethods";

const GalleryItems = ({ cat,  displayNo, categ }) => {
  const [designs, setDesigns] = useState([]);
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

  useEffect(() => {
    const getDesigns = async () => {
      try {
        let endpoint = `${BASE_URL}designs`;
        if (cat) {
          endpoint += `?categorySlug=${cat}`;
        } 
        const res = await axios.get(endpoint);
        setDesigns(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getDesigns();
  }, [cat]);

  
  
  

  

  

  return (
      <div className="w-full">
        <div className="w-full grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
          {designs.slice(0, displayNo).map((item) => {
                  const {img, slug, rows, _id, columns} = item;
              return(
                    <Link to={`/african-style-inspiration/${cat.slug}/${slug}`} key={_id}>
                      <img
                          src={img}
                          className={`w-full h-[340px] rounded-3xl`}
                          alt={item.title}
                          onMouseEnter={handleMouseEnter}
                          onMouseLeave={handleMouseLeave}
                      />
                    </Link>
          )})
          }
        </div>
      </div>
  );
};

export default GalleryItems;

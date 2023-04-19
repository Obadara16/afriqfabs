import { useEffect, useState } from "react";
import axios from "axios";
import {
    FavoriteBorderOutlined,
    SearchOutlined,
    ShoppingCartOutlined,
  } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { BASE_URL } from "../requestMethods";

const GalleryItems = ({ cat,  displayNo, noOfCols }) => {
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
          endpoint += `?categorySlug=${cat.slug}`;
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
        <div className="w-full max-w-8xl p-5 pb-10 mx-auto mb-10 gap-6 sm:columns-2 md:columns-3 lg:columns-4 space-y-5 ">
          {designs.slice(0, displayNo).map((item) => {
                  const {img, slug, rows, _id, columns} = item;
              return(
                    <Link to={`/african-style-inspiration/${cat.slug}/${slug}`} className={`min-h-5xl relative rounded-3xl col-span-2 row-span-1 my-5`} key={_id}>
                      <img
                          src={img}
                          className={`w-full rounded-3xl`}
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

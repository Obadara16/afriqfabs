import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { sliderItems } from "../data";
import { Link } from "react-router-dom";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const sliderInterval = setInterval(() => {
      setCurrentSlide((currentSlide + 1) % sliderItems.length);
    }, 5000);

    return () => clearInterval(sliderInterval);
  }, [currentSlide]);

  return (
    <div className="relative" style={{ height: "516px" }}>
      {sliderItems.map((item, index) => (
        <div
          key={item.id}
          className={`absolute w-full h-full bg-cover bg-center transition-opacity ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url(${item.img})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div
            className="absolute inset-0"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
          ></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <h1 className="text-lg font-light text-white">{item.title}</h1>
            <p className="text-xl text-white mt-6">{item.cat}</p>
            <Link to="/products/">
              <button className="text-lg text-white mt-6 bg-green-600 p-3 pl-6 pr-6 rounded-lg">
                Shop Now
              </button>
            </Link>
          </div>
        </div>
      ))}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-2 mb-8">
        {sliderItems.map((_, index) => (
          <div
            key={index}
            className={`h-4 w-4 rounded-full cursor-pointer ${
              index === currentSlide ? "bg-white" : "bg-gray-400"
            }`}
            onClick={() => setCurrentSlide(index)}
          ></div>
        ))}
      </div>
      <button
        className="absolute top-1/2 left-0 transform -translate-y-1/2 z-10 focus:outline-none"
        onClick={() =>
          setCurrentSlide(
            (currentSlide - 1 + sliderItems.length) % sliderItems.length
          )
        }
      >
        {/* <FontAwesomeIcon icon={faChevronLeft} className="text-4xl text-white" /> */}
      </button>
      <button
        className="absolute top-1/2 right-0 transform -translate-y-1/2 z-10 focus:outline-none"
        onClick={() => setCurrentSlide((currentSlide + 1) % sliderItems.length)}
      >
        {/* <FontAwesomeIcon icon={faChevronRight} className="text-4xl text-white" /> */}
      </button>
    </div>
  );
};

export default Slider;

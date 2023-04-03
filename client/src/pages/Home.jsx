import React from "react";
import { Link } from "react-router-dom";
import CustomProducts from "../components/CustomProducts";
import FlowMenu from "../components/FlowMenu";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Products from "../components/Products";
import Slider from "../components/Slider";
import { categories } from "../data";



const Home = () => {
  return (
    <div>
      <Navbar />
      <FlowMenu/>
      <Slider />
      <div className="mx-auto w-11/12 px-8 ">
        {categories.map((category) => (
          <div
            className="flex flex-col align-center justify-center w-full h-full mx-auto pt-16  pb-16 gap-4 "
            key={category.id}
          >
            <h3 className="text-center font-bold-500 text-3xl">
              {category.heading}
            </h3>
            <p className="text-center">{category.text}</p>
            {category.cat === "featured" ? (
              <CustomProducts featured={category.cat} displayNo={4} />
            ) : (
              <Products cat={category.cat} displayNo={3} />
            )}
            <Link to={`/products/${category.cat}`}>
              <button className="py-4 px-16 rounded-md my-8 bg-custom-btn-green text-white w-fit">
                Shop Now
              </button>
            </Link>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Home;

import React from "react";
import { Link } from "react-router-dom";
import CustomProducts from "../components/CustomProducts";
import Footer from "../components/Footer";
import MenuBar from "../components/MenuBar";
import Navbar from "../components/Navbar";
import Products from "../components/Products";
import Slider from "../components/Slider";

const categories = [
  {
    id: 1,
    cat: "african wax print",
    heading: "Latest African Wax Print Collection",
    text: "Explore awesome fabrics to suit that special occasion"
  },
  {
    id: 2,
    cat: "aso oke",
    heading: "African Premium Traditional Attire",
    text: " Best premium aso oke fabrics to rock any event"
  },
  {
    id: 3,
    cat: "ankara",
    heading: "African Traditional Fabric",
    text: " Best ankara fabrics to rock any event"
  },
  {
    id: 4,
    cat: "featured",
    heading: "Featured Collection",
    text: "Get 30% off from orders above $500 when you purchase our plain and pattern collection"
  }

]

const Home = () => {
  return (
    <div>
      <Navbar />
      <MenuBar/>
      <Slider />
      <div className="mx-auto w-11/12 px-8 ">
        {categories.map((category) => (
          <div className="flex flex-col align-center justify-center w-full h-full mx-auto pt-16  pb-16 gap-4 " key={category.id}>
          <h3 className="text-center font-bold-500 text-3xl">{category.heading}</h3>
          <p className="text-center">{category.text}</p>
          {category.cat === "featured" ? <CustomProducts cat={category.cat} displayNo={4}/> : <Products cat={category.cat}/> }
          <Link to={`/products/${category.cat}`}><button className="py-4 px-16 rounded-md my-8 bg-custom-btn-green text-white w-fit">Shop Now</button></Link>
        </div>
        ))}
      </div>
      <Footer/>
    </div>
  );
};

export default Home;

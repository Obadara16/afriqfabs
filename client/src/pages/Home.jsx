import React from "react";
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

]

const Home = () => {
  return (
    <div>
      <Navbar />
      <MenuBar/>
      <Slider />
      <>
        {categories.map((category) => (
          <div className="flex flex-col align-center justify-center w-full h-full mx-auto pt-16  pb-16 gap-4 " key={category.id}>
          <h3 className="text-center font-bold-500 text-3xl">{category.heading}</h3>
          <p className="text-center">{category.text}</p>
          <Products cat={category.cat}/>
        </div>
        ))}
      </>
      <Footer/>
    </div>
  );
};

export default Home;

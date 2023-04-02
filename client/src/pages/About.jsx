import React from "react";
import aboutbackground from "../assets/aboutus.svg";
import visionimg from "../assets/visionimg.svg";
import missionimg from "../assets/missionimg.svg";
import goalimg from "../assets/goalimg.svg";
import approachimg from "../assets/approachimg.svg";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import CombinedNav from "../components/CombinedNav";

const About = () => {
    const overlayStyle = {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      };
  return (
    <>
        <CombinedNav/>
        <div
            className="bg-cover bg-black bg-no-repeat flex justify-center items-center mb-20 h-[300px] bg-black opacity-120"
            style={{ backgroundImage: `url(${aboutbackground})` }}
        >
            <div className="w-max flex justify-center">
                
            <div className="text-center">
                <h1 className="text-white">About Us</h1>
                <h4 className="text-white hidden md:block">
                Authenticity is our Watchword
                </h4>
            </div>
            </div>
            
        </div>
        <div className="w-[85%] mx-auto flex flex-col">
            <div className="flex flex-col">
            <p className="text-base leading-7">
            "Welcome to AfriqFabs, your one-stop-shop for all your fabric needs! We're a family-owned business that's been providing high-quality fabrics to our customers for over 20 years. Our mission is to offer a wide range of fabrics that are both stylish and practical, at prices that won't break the bank.
                We pride ourselves on our expertise in the industry and are committed to providing exceptional customer service to each and every customer. Our team is always on hand to answer any questions you may have, whether you're looking for advice on choosing the right fabric for your project or need help placing an order.
                At AfriqFabs, we believe in doing our part to protect the environment, which is why we're committed to sustainable and ethical sourcing practices. We work with suppliers who share our values, ensuring that our fabrics are of the highest quality while also being responsibly sourced.
                We offer a wide range of fabrics, including cotton, silk, polyester, rayon, linen, wool, and more. Whether you're a professional seamstress or just starting out, we have the perfect fabric for your project. Plus, we offer fast and affordable shipping options to make sure you get your fabric as quickly as possible.
                Thank you for choosing AfriqFabs for your fabric needs. We look forward to serving you!"
            </p>
            </div>
            <div className="flex gap-16 md:flex-wrap md:flex-row-reverse md:mt-40 items-center">
            <div className="flex-1">
                <img src={visionimg} className="w-full h-full" alt="Our Vision" />
            </div>
            <div className="flex-1">
                <div className="flex flex-col">
                <h3 className="font-bold">Our Vision</h3>
                <p className="text-base leading-7">
                    Our vision is to be the leading online destination for fabric lovers worldwide, providing a vast selection of high-quality fabrics sourced from around the globe. We aim to inspire creativity and enable our customers to bring their visions to life with our carefully curated collection of fabrics. 
                </p>
                </div>
            </div>
            </div>
            <div className="flex gap-16 md:flex-wrap md:mt-16 items-center">
                <div className="flex-1">
                    <img src={missionimg} className="w-full h-full" alt="Our Mission" />
                </div>
                <div className="flex-1">
                    <div className="flex flex-col">
                <h3 className="font-bold">Our Mission</h3>
                <p className="text-base leading-7">
                Our mission is to provide a diverse and ever-evolving selection of high-quality fabrics to our customers, while offering exceptional customer service and a seamless shopping experience for our clients.  we are dedicated to procuring fabrics from ethical and sustainable suppliers.
                </p>
                </div>
            </div>
            
            </div>
            <div className="flex gap-16 md:flex-wrap md:mt-16 items-center">
            <div className="flex-1">
                <div className="flex flex-col">
                <h3 className="font-bold">Our Goals </h3>
                <p className="text-base leading-7">
                Our goal is to build a community of passionate and engaged fabric enthusiasts who share our love for beautiful textiles and innovative design. We strive to create a seamless shopping experience that is both easy and enjoyable, offering exceptional customer service and fast, reliable shipping. 
                </p>
                </div>
            </div>
            <div className="flex-1">
                <img src={goalimg} className="w-full h-full" alt="Our Goals" />
            </div>
            </div>
            <div className="flex gap-16 md:flex-wrap md:mt-16 items-center">
                <div className="flex-1">
                    <img src={approachimg} className="w-full h-full" alt="Our Approach" />
                </div>
                <div className="flex-1">
                    <div className="flex flex-col">
                <h3 className="font-bold">Our Approach</h3>
                <p className="text-base leading-7">
                We strive to inspire and empower our customers, whether they are professional designers or sewing hobbyists, by providing expert guidance, creative inspiration, and a supportive community. We are committed to establishing enduring bonds with our clients that are founded on mutual respect and trust 
                </p>
                </div>
            </div>
            
            </div>
        </div>
        <Footer/>
    </>
  );
};

export default About;

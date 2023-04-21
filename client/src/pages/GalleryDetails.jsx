import React, { useEffect, useState } from 'react'
import CombinedNav from '../components/CombinedNav'
import Footer from '../components/Footer'
import Header from '../components/Header'
import GalleryItems from '../components/GalleryItems'
import { BASE_URL, publicRequest } from '../requestMethods'
import axios from 'axios'
import { Link, useLocation } from 'react-router-dom'

const galleryTitle = "African Style Inspiration"

const GalleryDetails = () => {
  const [design, setDesign] = useState([])
  const location = useLocation();
  const id = location.pathname.split("/")[3];
  console.log(id)

  useEffect(() => {
    const getDesign = async () => {
      try {
        const res = await publicRequest.get("/designs/find/" + id);
        console.log("this is the response", res.data)
        setDesign(res.data);
      } catch {}
    };
    getDesign();
  }, [id]);

  
  const {_id, title, img,slug } = design;


  return (
    <div className=''>
      <CombinedNav/>
      <Header title={galleryTitle}/>
      <div className='w-11/12 mx-auto'>

        <div className='w-full flex flex-wrap justify-center lg:justify-start my-10'>
          <h2 className='font-semibold'>  {title} </h2>
        </div>

        <div className='my-2 flex flex-col md:flex-row gap-5'>
            <div className='flex md:flex-col col-span-1 gap-2'>
                <div className=''>
                    <img src={img} alt={title} className='h-[278px] w-[308px]  rounded-md'/>
                </div>
                <div className=''>
                    <img src={img} alt={title}  className='h-[278px] w-[308px] rounded-md'/>
                </div>
                <Link to='/products'>
                <button className="bg-custom-btn-green w-full hover:bg-white hover:border hover:border-custom-btn-green hover:text-black text-white font-normal py-3 px-8 rounded focus:outline-none focus:shadow-outline">
                  Shop Now
                </button>
                </Link>
            </div>
            <div className='col-span-3 flex justify-center mx-auto '>
                <div className='md:w-11/12 flex justify-center mx-auto'>
                    <img src={img} alt=""  className='w-full md:w-[848px] h-[600px] rounded-[48px]'/>
                </div>
            </div>
          
        </div>
      </div>

      <Footer/>
    </div>
  )
}

export default GalleryDetails
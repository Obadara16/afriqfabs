import React, { useEffect, useState } from 'react'
import CombinedNav from '../components/CombinedNav'
import Footer from '../components/Footer'
import Header from '../components/Header'
import GalleryItems from '../components/GalleryItems'
import { BASE_URL } from '../requestMethods'
import axios from 'axios'
import { useLocation } from 'react-router-dom'

const galleryTitle = "African Style Inspiration"

const GalleryDetails = () => {
  const [design, setDesign] = useState([])
  const location = useLocation();
  const id = location.pathname.split("/")[3];
  console.log(id)

  useEffect(() => {
    const getDesign = async () => {
      try {
        const res = await publicRequest.get("/products/find/" + id);
        console.log(res.data)
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

        <div className='w-full flex flex-wrap justify-center lg:justify-start gap-6'>
          <p>  {title} </p>
        </div>

        <div className='my-12 grid grid-cols-4 gap-5'>
            <div className='flex flex-col col-span-1 gap-2 h-full'>
                <div className=''>
                    <img src={img} alt={title} height="240px"/>
                </div>
                <div className=''>
                    <img src={img} alt={title} height="240px"/>
                </div>
            </div>
            <div className='col-span-3'>
                <div className='w-10/12 mx-auto'>
                    <img src={img} alt=""  className='w-full h-full'/>
                </div>
            </div>
          
        </div>
      </div>

      <Footer/>
    </div>
  )
}

export default GalleryDetails
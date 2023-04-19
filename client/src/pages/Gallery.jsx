import React, { useEffect, useState } from 'react'
import CombinedNav from '../components/CombinedNav'
import Footer from '../components/Footer'
import Header from '../components/Header'
import GalleryItems from '../components/GalleryItems'
import { BASE_URL } from '../requestMethods'
import axios from 'axios'

const galleryTitle = "African Style Inspiration"

const Gallery = () => {
  const [categories, setCategories] = useState([])
  const [categorySent, setCategorySent] = useState("george-fabric")

  useEffect(() => {

    const getCategories = async () => {
      try {
        const endpoint = `${BASE_URL}categories`;
        const res = await axios.get(endpoint);
        setCategories(res.data);
        setCategorySent(categories[1].slug)
      } catch (err) {
        console.log(err);
      }
    };
    getCategories();
  }, []);

  
  const colors = ['#32a852', '#1565c0', '#9c27b0', '#ff5722', '#733535', '#f44336', '#795548', '#009688'];


  return (
    <div className=''>
      <CombinedNav/>
      <Header title={galleryTitle}/>
      <div className='w-11/12 mx-auto'>

        <div className='w-full flex flex-wrap justify-center lg:justify-start gap-6'>
          {categories.map((category, index) => {
            const {slug, name} = category;
            
            return (
              <div key={slug} className='w-fit'>
                <button className='text-white px-6 py-2 rounded-3xl w-full whitespace-nowrap' style={{backgroundColor: colors[index % colors.length]}} onClick={() => {
                    setCategorySent({slug});
                  }}
                >{name}</button>
              </div>
            )
          })}
        </div>

        <div className='my-12'>
          <GalleryItems cat={categorySent} noOfCols={{sm: 4, md: 4, lg: 8}} displayNo={20}/>
        </div>
      </div>

      <Footer/>
    </div>
  )
}

export default Gallery
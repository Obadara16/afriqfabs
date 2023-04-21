import React, { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar';
import CombinedNav from '../components/CombinedNav';
import Footer from '../components/Footer';
import FavouriteComponent from '../components/FavouriteComponent';
const Favourites = () => {

    
  return (
        <div>
            <CombinedNav/>
            <div className='w-11/12 mx-auto grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 h-full mb-12'>
                <div className='col-span-1 h-full'>
                    <Sidebar/>
                </div>
                <div className='bg-white py-5 mt-12 col-span-3 h-full' >

                    <div className='flex flex-col justify-center gap-6 w-11/12 mx-auto'>
                            <FavouriteComponent/>
                    </div>

                </div>
            </div>
            <Footer/>
        </div>
  )
}

export default Favourites
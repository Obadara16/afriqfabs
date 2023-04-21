import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useCategoryAndSubcategory from '../hooks/UseCategoryAndSubCategory';
import { BASE_URL } from '../requestMethods';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function FlowMenu() {
  const [expandedIndex, setExpandedIndex] = useState(-1);
  const [isNavOpen, setIsNavOpen] = useState(false);


  const handleNavClick = () => {
    setIsNavOpen(!isNavOpen);
  };

  useEffect(() => {
    const getSubcategories = async (slug) => {
      try {
        const endpoint = `${BASE_URL}subcategories?parentCategorySlug=${slug}`;
        const res = await axios.get(endpoint);
        return res.data;
      } catch (err) {
        console.log(err);
        return [];
      }
    };

    const getCategories = async () => {
      try {
        const endpoint = `${BASE_URL}categories`;
        const res = await axios.get(endpoint);
        setCategories(res.data);
        const subcategoriesList = await Promise.all(
          res.data.map((category) => getSubcategories(category.slug))
        );
        setSubcategories(subcategoriesList);
      } catch (err) {
        console.log(err);
      }
    };
    getCategories();
  }, []);

  const { categories, subcategories, setCategories, setSubcategories } = useCategoryAndSubcategory();

  return (
    <div className="flex w-full justify-center mx-auto mt-0 shadow-md py-4">
      <nav className="w-11/12">
      <div className="flex items-center md:hidden">
        <button
          className="text-black flex items-center justify-center ml-4 w-10 h-10 rounded-full focus:outline-none focus:border-green-600"
          onClick={handleNavClick}
        >
          {isNavOpen ? 
            <FontAwesomeIcon icon={faXmark} beat size="2xs" />
            :
            <FontAwesomeIcon icon={faBars} beat size='2xs'/>
          }
        </button>
      </div>
      <div
        className={`${isNavOpen ? "flex" : "hidden"} flex-col items-center justify-center mt-0 bg-transparent-800 text-small p-4 w-full md:w-auto md:flex md:flex-row md:justify-between`}
      >
        <ul className="md:flex items-center w-11/12 mx-auto md:justify-start lg:justify-between font-light sm:flex-wrap">
            <li className="relative group px-3">
                <div className="flex flex-col">
                    <select onChange={(e) => setSort(e.target.value)} className="px-2 w-fit">
                        <option value="NGN">NGN</option>
                        <option value="USD">USD</option>
                        <option value="GBP">GBP</option>
                        <option value="YEN">YEN</option>
                    </select>
                </div>
            </li>

            <li className="relative group px-3 py-2">
                <Link to="/" className="hover:opacity-50 cursor-pointer">Home
                </Link>
            </li>

            <li className="relative group px-3 py-2">
                <span className="hover:opacity-50 cursor-default">Fabric Collections</span>
                <div className="absolute top-0 sm:-left-0 md:-left-48 transition group-hover:translate-y-5 translate-y-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible duration-500 ease-in-out group-hover:transform z-50 sm:w-[480px] md:w-[600px] lg:w-[864px]  transform">
                    <div className="relative top-6 p-6 bg-white rounded-xl shadow-xl w-full">
                        <div className="w-10 h-10 bg-white transform rotate-45 absolute top-0 z-0 translate-x-0 transition-transform group-hover:translate-x-[12rem] duration-500 ease-in-out rounded-sm"></div>
                        <div className="relative z-10">
                            <div className="w-full flex flex-wrap justify-start md:justify-start lg:justify-start gap-4">
                            {categories.map((category, index) => (
                            <div key={category._id} className="flex flex-col gap-4">
                                <Link to={`/products/${category.slug}`} className="font-semibold ">{category.name}</Link>
                                <ul className='flex flex-col gap-4'>
                                {subcategories && subcategories[index] && subcategories[index].map((subcategory) => (
                                    <li key={subcategory._id}>
                                    <Link to={`/products/${category.slug}/${subcategory.slug}`}>
                                        {subcategory.name}
                                    </Link>
                                    </li>
                                ))}
                                </ul>
                            </div>
                            ))}
                            </div>
                        </div>
                    </div>
                </div>
            </li>

            
            <li className="relative group px-3 py-2">
                        <Link to="/african-style-inspirations" className="hover:opacity-50 cursor-pointer">African Style Inspiration</Link>
            </li>

            <li className="relative group px-3 py-2">
                <Link to="/about-us" className="hover:opacity-50 cursor-pointer">About Us</Link>
            </li>

            <li className="relative group px-3 py-2">
                <Link to="/contact-us" className="hover:opacity-50 cursor-pointer">Contact Us</Link>
            </li>
            
        </ul>
      </div>
      </nav>
    </div>
  );
}

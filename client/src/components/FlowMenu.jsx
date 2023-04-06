import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useCategoryAndSubcategory from '../hooks/UseCategoryAndSubCategory';
import { BASE_URL } from '../requestMethods';

export default function FlowMenu() {
  const [expandedIndex, setExpandedIndex] = useState(-1);

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
        <ul className="md:flex items-center w-11/12 mx-auto justify-between font-light sm:flex-wrap">
            <li className="relative group px-3 py-2">
                <div className="m-4 flex flex-col">
                    <select onChange={(e) => setSort(e.target.value)} className="p-2">
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
                <div className="absolute top-0 sm:-left-0 md:-left-48 transition group-hover:translate-y-5 translate-y-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible duration-500 ease-in-out group-hover:transform z-50 sm:w-[480px] md:w-[600px]  transform">
                    <div className="relative top-6 p-6 bg-white rounded-xl shadow-xl w-full">
                        <div className="w-10 h-10 bg-white transform rotate-45 absolute top-0 z-0 translate-x-0 transition-transform group-hover:translate-x-[12rem] duration-500 ease-in-out rounded-sm"></div>
                        <div className="relative z-10">
                            <div className="flex gap-3 justify-between">
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
                        <Link to="/african-style-inspiration" className="hover:opacity-50 cursor-pointer">African Style Inspiration</Link>
            </li>

            <li className="relative group px-3 py-2">
                <Link to="/about-us" className="hover:opacity-50 cursor-pointer">About Us</Link>
            </li>

            <li className="relative group px-3 py-2">
                <Link to="/contact-us" className="hover:opacity-50 cursor-pointer">Contact Us</Link>
            </li>
            
        </ul>
      </nav>
    </div>
  );
}

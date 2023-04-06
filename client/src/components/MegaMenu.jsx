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
      <nav className="w-full">
        <ul className="md:flex items-center w-11/12 mx-auto justify-between font-light sm:flex-wrap">
            <li className="relative group px-3 py-2">
                      <button className="hover:opacity-50 cursor-default">NGN</button>
                      <div
                          className="absolute top-0 -left-2 transition group-hover:translate-y-5 translate-y-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible duration-500 ease-in-out group-hover:transform z-50 min-w-[260px] transform">
                          <div className="relative top-6 p-6 bg-white rounded-xl shadow-xl w-full">
                          <div
                              className="w-10 h-10 bg-white transform rotate-45 absolute top-0 z-0 -translate-x-4 transition-transform group-hover:translate-x-3 duration-500 ease-in-out rounded-sm">
                          </div>
                          <div className="relative z-10">
                              <p className="uppercase tracking-wider text-gray-500 font-medium text-[13px]">SELECT CURRENCY</p>
                              <ul className="mt-3 text-[15px]">
                              <li>
                                  <button
                                  className="bg-transparent bg-clip-text text-transparent bg-gradient-to-br from-indigo-400 to-pink-700 via-blue-500 font-semibold hover:from-blue-600 hover:to-indigo-600 hover:via-pink-400 py-1 block">
                                  NGN
                                  </button>
                              </li>
                              <li>
                                  <button
                                  className="bg-transparent bg-clip-text text-transparent bg-gradient-to-br from-indigo-400 to-pink-700 via-blue-500 font-semibold hover:from-blue-600 hover:to-indigo-600 hover:via-pink-400 py-1 block">
                                  USD
                                  </button>
                              </li>
                              <li>
                                  <button
                                  className="bg-transparent bg-clip-text text-transparent bg-gradient-to-br from-indigo-400 to-pink-700 via-blue-500 font-semibold hover:from-blue-600 hover:to-indigo-600 hover:via-pink-400 py-1 block">
                                  GPB
                                  </button>
                              </li>
                              <li>
                                  <button
                                  className="bg-transparent bg-clip-text text-transparent bg-gradient-to-br from-indigo-400 to-pink-700 via-blue-500 font-semibold hover:from-blue-600 hover:to-indigo-600 hover:via-pink-400 py-1 block">
                                YEN
                                  </button>
                              </li>
                              <li>
                                  <button
                                  className="bg-transparent bg-clip-text text-transparent bg-gradient-to-br from-indigo-400 to-pink-700 via-blue-500 font-semibold hover:from-blue-600 hover:to-indigo-600 hover:via-pink-400 py-1 block">
                                  CND
                                  </button>
                              </li>
                              </ul>
                          </div>
                          </div>
                      </div>
            </li>
        </ul>
      </nav>
    </div>
  );
}

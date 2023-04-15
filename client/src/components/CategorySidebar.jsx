import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { colors } from "../data";
import CustomCheckBox from "../partials/CustomCheckBox";
import { BASE_URL } from "../requestMethods";

const CategorySidebar = () => {
  const location = useLocation();
  const catSlug = location.pathname.split("/")[2];
  console.log(catSlug);
  const [subCategories, setSubCategories] = useState([]);
  const [catText, setCatText] = useState("");

  console.log(colors);

  useEffect(() => {
    const getSubCategories = async () => {
      try {
        let endpoint = `${BASE_URL}categories`;
        if (catSlug) {
          endpoint = `${BASE_URL}subcategories?parentCategorySlug=${catSlug}`;
        }
        const res = await axios.get(endpoint);
        setSubCategories(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getSubCategories();
  }, [catSlug]);

  useEffect(() => {
    if (catSlug) {
      const originalText = catSlug.replace(/-/g, " ");
      setCatText(originalText);
    }
  }, [catSlug]);

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col">
        <h3 className="text-bold pb-3">Category</h3>
        <div className="bg-white w-fit px-4 flex flex-col">
          <Link to={`/products/${catSlug}`}>
            <p className="capitalize p-3 hover:text-custom-btn-green">
              {catText}
            </p>
          </Link>
          {subCategories.map((subCategory) => (
            <div className="" key={subCategory._id}>
              {catSlug ? (
                <Link to={`/products/${catSlug}/${subCategory.slug}`}>
                  <p className="capitalize p-3 hover:text-custom-btn-green">
                    {subCategory.name}
                  </p>
                </Link>
              ) : (
                <Link to={`/products/${subCategory.slug}`}>
                  <p className="capitalize p-3 hover:text-custom-btn-green">
                    {subCategory.name}
                  </p>
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className=" mb-10">
        <h3 className="text-bold pb-3">Color</h3>
        <div className="bg-white w-fit px-4 flex flex-col">
          <CustomCheckBox />
        </div>
      </div>
    </div>
  );
};

export default CategorySidebar;

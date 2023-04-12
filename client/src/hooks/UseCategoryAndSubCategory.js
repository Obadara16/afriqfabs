import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../requestMethods";


export default function useCategoryAndSubcategory() {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

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

  return { categories, subcategories, setCategories, setSubcategories };
}

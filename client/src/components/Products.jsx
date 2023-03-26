import { useEffect, useState } from "react";
import { popularProducts } from "../data";
import Product from "./Product";
import axios from "axios";

const Products = ({ cat, filters, sort, displayNo }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          cat
            ? `http://localhost:5000/api/products?category=${cat}`
            : "http://localhost:5000/api/products"
        );
        setProducts(res.data);
        console.log(res.data)
      } catch (err) {
        console.log(err)
      }
    };
    getProducts();
  }, [cat]);

  

  

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-11/12">
      <div className="flex flex-wrap -mx-4 justify-between">
        {cat
          ? products.map((item) => (
              <div
                key={item._id}
                className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/3 p-4"
              >
                <Product item={item} />
              </div>
            ))
          : products
              .slice(0, displayNo)
              .map((item) => (
                <div
                  key={item._id}
                  className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 p-4"
                >
                  <Product item={item} />
                </div>
              ))}
      </div>
    </div>
  );
};

export default Products;

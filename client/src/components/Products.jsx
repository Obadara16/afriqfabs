import { useEffect, useState } from "react";
import { popularProducts } from "../data";
import Product from "./Product";
import axios from "axios";
import { BASE_URL } from "../requestMethods";

const Products = ({
  cat,
  filters,
  sort,
  displayNo,
  featured,
  related,
  subcat,
}) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        let endpoint = `${BASE_URL}products`;
        if (cat) {
          endpoint += `?categorySlug=${cat}`;
        } else if (featured) {
          endpoint += `/featured`;
        } else if (subcat) {
          endpoint += `/categorySlug=${cat}&subcategorySlug=${subcat}`;
        } else if (related) {
          endpoint += `/related?productSlug=${related}`;
        }
        const res = await axios.get(endpoint);
        setProducts(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, [cat, featured, related]);

  return (
    <div className="container mx-auto w-full">
      <div className=" grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {products.slice(0, displayNo).map((item) => (
          <div
            key={item._id}
            className="w-full p-4"
          >
            <Product item={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;

import { useEffect, useState } from "react";
import { popularProducts } from "../data";
import Product from "./Product";
import axios from "axios";
import { TEST_URL } from "../requestMethods";
        

const Products = ({ cat, filters, sort, displayNo, featured, related, subcat }) => {
  const [products, setProducts] = useState([]);
  

  useEffect(() => {
    const getProducts = async () => {
      try {
        let endpoint = `${TEST_URL}products`;
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
      <div className="flex -mx-4 justify-between">
        {products.slice(0, displayNo).map((item) => (
          <div
            key={item._id}
            className={`w-full sm:w-1/2 md:w-1/2 lg:w-1/${displayNo} xl:w-1/${displayNo} p-4`}
          >
            <Product item={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;

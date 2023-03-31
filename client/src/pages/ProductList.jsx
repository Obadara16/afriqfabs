import Navbar from "../components/Navbar";
import Products from "../components/Products";
import Footer from "../components/Footer";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import CategorySidebar from "../components/CategorySidebar";
import CombinedNav from "../components/CombinedNav";
import { BreadCrumb } from 'primereact/breadcrumb';


const ProductList = () => {
  const location = useLocation();
  const cat = location.pathname.split("/")[2];
  const subcat = location.pathname.split("/")[3];
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");
  // const [originalText, setOriginalText] = useState("")
  const [originalSubText, setOriginalSubText] = useState("")

  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value,
    });
  };


    const originalText = cat.replace(/-/g, ' ');
  //   const originalSubText = subcat.replace(/-/g, ' ');
  //   setOriginalSubText(originalSubText)
  // }
  
  // const newCatText = originalText.replace(/\b\w/g, function(l){ return l.toUpperCase() })
  // const newSubcatText = originalSubText.replace(/\b\w/g, function(l){ return l.toUpperCase() })
  // const items = [{ label: "newCatText" }, { label: "newSubcatText" }];
  // const home = { icon: 'pi pi-home', url: '/' }

  return (
    <div className="w-full">
      <CombinedNav/>
      <div className="w-11/12 mx-auto py-10">
      <h1 className="m-4 capitalize">{originalText}</h1>

          {/* <BreadCrumb model={items} home={home} className="" /> */}
          <div className="flex justify-between w-full">
            <div></div>
            <div className="m-4 flex flex-col">
              <select onChange={(e) => setSort(e.target.value)} className="p-2">
                <option value="sort">Sort</option>
                <option value="newest">Newest</option>
                <option value="asc">Price (asc)</option>
                <option value="desc">Price (desc)</option>
              </select>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="w-[15%]">
              <CategorySidebar/>
            </div>
            <div className="w-[80%]">
              <Products cat={cat} filters={filters} sort={sort} displayNo={3} subcat={subcat} />
            </div>
          </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductList;

import React, { useEffect, useState } from "react";
import Carpet from "./Carpet/Carpet";
import FilterProduct from "./FilterProduct/FilterProduct";

const Carpets = ({ products, onAddToCart, wait, cart }) => {
  const [searchCarpet, setSearchCarpet] = useState([]);
  const Search = (search) => {
    setSearchCarpet(search);
  };

  return (
    <div className="flex flex-col">
      <FilterProduct products={products} Search={Search} />
      <div
        id="carpets"
        className=" flex flex-wrap justify-center gap-[2rem] py-20 px-5 items-center"
      >
        <Carpet
          searchCarpet={searchCarpet}
          products={products}
          onAddToCart={onAddToCart}
        />
      </div>
    </div>
  );
};

export default Carpets;

import React, { useEffect, useState } from "react";
import Carpet from "./Carpet/Carpet";
import FilterProduct from "./FilterProduct/FilterProduct";

const Carpets = ({ onAddToCart }) => {
  const [search, setSearch] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();

  const SelectedCat = (cat) => {
    setSelectedCategory(cat);
  };

  const SearchedCarpet = (s) => {
    setSearch(s);
  };

  return (
    <div className="flex flex-col">
      <FilterProduct SelectedCat={SelectedCat} SearchedCarpet={SearchedCarpet}/>
      <div
        id="carpets"
        className=" flex flex-wrap justify-center gap-[2rem] py-20 px-5 items-center"
      >
        <Carpet
          onAddToCart={onAddToCart}
          selectedCategory={selectedCategory}
        />
      </div>
    </div>
  );
};

export default Carpets;

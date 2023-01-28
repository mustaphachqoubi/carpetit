import React, { useEffect, useState } from "react";
import Carpet from "./Carpet/Carpet";
import FilterProduct from "./FilterProduct/FilterProduct";
import { useSelector, useDispatch } from "react-redux";
import { carpetListGetProducts } from "../../redux/CarpetReducers/carpetList";

const Carpets = ({ onAddToCart }) => {
  const [search, setSearch] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const { carpetList } = useSelector((state) => state.carpetlist);
  const dispatch = useDispatch()

  const SelectedCat = (cat) => {
    setSelectedCategory(cat);
  };

  // const SearchedCarpet = (s) => {
  //   setSearch(s);
  // };

  const handleSearch = (carpetName) => {
    dispatch(carpetListGetProducts(carpetList.filter((carpet) => carpet.name.toLowerCase().includes(carpetName))))
  };

  return (
    <div className="flex flex-col">
      <FilterProduct
        SelectedCat={SelectedCat}
        // SearchedCarpet={SearchedCarpet}
        handleSearch={handleSearch}
      />
      <div
        id="carpets"
        className=" flex flex-wrap justify-center gap-[2rem] py-20 px-5 items-center"
      >
        <Carpet onAddToCart={onAddToCart} selectedCategory={selectedCategory} />
      </div>
    </div>
  );
};

export default Carpets;

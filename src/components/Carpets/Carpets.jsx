import React, { useEffect, useState } from "react";
import Carpet from "./Carpet/Carpet";
import FilterProduct from "./FilterProduct/FilterProduct";
import { useSelector, useDispatch } from "react-redux";
import { carpetListGetProducts } from "../../redux/CarpetReducers/carpetList";

const Carpets = ({ handleAddToCart }) => {
  const [search, setSearch] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const { carpetList } = useSelector((state) => state.carpetlist);
  const dispatch = useDispatch()

  const SelectedCat = (cat) => {
    setSelectedCategory(cat);
  };

  // handleAddToCart(products[0].id, 1, {[products[0].variant_groups[0].id]: products[0].variant_groups[0].options[1].id})

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
        <Carpet handleAddToCart={handleAddToCart} selectedCategory={selectedCategory} />
      </div>
    </div>
  );
};

export default Carpets;

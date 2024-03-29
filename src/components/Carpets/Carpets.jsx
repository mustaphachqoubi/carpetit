import React, { useState } from "react";
import Carpet from "./Carpet/Carpet";
import FilterProduct from "./FilterProduct/FilterProduct";
import { useSelector, useDispatch } from "react-redux";
import { setsearchedCarpetList } from "../../redux/CarpetReducers/SearchedCarpetList";

const Carpets = ({ handleAddToCart, handleDiscounts }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const { carpetList } = useSelector((state) => state.carpetlist);
  const dispatch = useDispatch();

  const SelectedCat = (cat) => {
    setSelectedCategory(cat);
  };

  const handleSearch = (carpetName) => {
      dispatch(
        setsearchedCarpetList(
          carpetList.filter((carpet) =>
            carpet.name.toLowerCase().includes(carpetName)
          )
        )
      );
  };

  return (
    <div className="flex flex-col">
      <FilterProduct handleSearch={handleSearch} SelectedCat={SelectedCat} />
      <div
        id="carpets"
        className=" flex flex-wrap justify-center gap-[2rem] py-20 px-5 items-center"
      >
        <Carpet
          handleAddToCart={handleAddToCart}
          selectedCategory={selectedCategory}
          handleDiscounts={handleDiscounts}
        />
      </div>
    </div>
  );
};

export default Carpets;

import React, { useState } from "react";
import Carpet from "./Carpet/Carpet";
import FilterProduct from "./FilterProduct/FilterProduct";

const Carpets = ({ products, onAddToCart, wait, cart }) => {
  return (
    <div className="flex flex-col">
      <FilterProduct />
      <div
        id="carpets"
        className=" flex flex-wrap justify-center gap-[2rem] py-20 px-5 items-center"
      >
        <Carpet
          products={products}
          onAddToCart={onAddToCart}
        />
      </div>
    </div>
  );
};

export default Carpets;

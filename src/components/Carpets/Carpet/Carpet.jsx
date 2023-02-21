import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { carpetListGetProducts } from "../../../redux/CarpetReducers/carpetList";
import { selectedSizeInitial } from "../../../redux/CarpetReducers/selectedSize";

import BeforeOpeningCarpet from "./BeforeOpeningCarpet";
import AfterOpeningCarpet from "./AfterOpeningCarpet";

function Carpet({ handleAddToCart, selectedCategory }) {
  const dispatch = useDispatch();

  const { selectedId } = useSelector((state) => state.selector);
  const { products } = useSelector((state) => state.products);
  const { searchRef } = useSelector((state) => state.searchRef);

  const [isFirst, setIsFirst] = useState(true);

  useEffect(() => {
    searchRef === "" && dispatch(carpetListGetProducts(products.map((c) => c)));
  }, [products, dispatch]);

  useEffect(() => {
    if (isFirst && products.length >= 1 && selectedId) {
      products.map((c) => {
        if (c.id === selectedId && c.variant_groups.length >= 1) {
          dispatch(selectedSizeInitial(c.variant_groups[0].options[0].id));
        }
      });
      setIsFirst(false);
    }
  }, [products]);

  return (
    <>
      <BeforeOpeningCarpet
        selectedCategory={selectedCategory}
        handleAddToCart={handleAddToCart}
      />
      <AfterOpeningCarpet handleAddToCart={handleAddToCart} />
    </>
  );
}

export default Carpet;

import React from "react";
import { AiOutlineRight } from "react-icons/ai";
import { useSelector } from "react-redux";

const Similar = () => {
  const {products} = useSelector(state => state.products)
  return (
    <div
      onClick={() => {
        window.scrollTo({ top: 1000, behavior: "smooth" });
      }}
      className="w-56 md:w-[15em] bg-white dark:bg-slate-600 dark:hover:bg-slate-700 dark:text-white shadow-2xl hover:bg-slate-100 flex items-center space-x-3 p-2 absolute rounded-full cursor-pointer"
    >
      <div className="shrink-0 bg-orange-500 p-2 rounded-full w-12 h-12 flex items-center justify-center overflow-hidden">
        {
          products.length >= 1 && (

            <img src={products.length >= 2 ? products[1].image.url : products[0].image.url} alt="carpet" className="w-8 shadow-lg" />
          )
        }
      </div>
      <div className="flex flex-col items-start gap-1 ">
        <h3 className="text-orange-500 text-xs font-semibold">
          Similar Carpets
        </h3>
        <h3 className="text-xs font-semibold w-30">Warain Collectible</h3>
        <h3 className="text-sm font-bold">{products.length >= 2 ? '$' + products[1].price.raw : '$744'} </h3>
      </div>
      <div className="dark:text-slate-300 absolute right-[20px] text-lg text-gray-500 cursor-pointer hover:text-slate-400">
        <AiOutlineRight />
      </div>
    </div>
  );
};

export default Similar;

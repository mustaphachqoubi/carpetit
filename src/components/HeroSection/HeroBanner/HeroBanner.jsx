import React, { useEffect, useState } from "react";
import Similar from "./Similar";
import { AiOutlineArrowDown } from "react-icons/ai";
import { FaPlay } from "react-icons/fa";
import Specification from "../Specification/Specification";
import Carpets from "../../Carpets/Carpets";
import "./styles.css";
import IntroImageSkeleton from "../../Skeletons/IntroImageSkeleton";
import { useSelector, useDispatch } from "react-redux";
import {
  setLoading,
  setLoadingInitial,
} from "../../../redux/HeroBannerReducers/loading";

const HeroBanner = ({ handleAddToCart, handleDiscounts }) => {
  const { products } = useSelector((state) => state.products);
  const { loading } = useSelector((state) => state.loading);

  const dispatch = useDispatch();

  const handleClick = (id, variantGRP) => {
    handleAddToCart(id, 1, variantGRP);
  };

  return (
    <>
      <div className="grid grid-cols-2 xl:grid-cols-3 gap-2">
        <div className="dark:text-white col-span-2 md:col-span-1 py-10 pb-0 md:pb-4 px-10 flex flex-col items-center text-center md:text-left md:flex-row md:justify-between">
          <div className=" space-y-4 mb-12 space-y-7 md:mt-20">
            <h1 className="text-4xl md:text-5xl font-bold">
              {products[0] ? products[0].name : "Loading..."}
            </h1>
            <p className="text-lg text-slate-500 dark:text-slate-400">
              {
                products[0] ? products[0].variant_groups[0].options[0].name : `115 x 115 cm`
              }
            </p>
            <h1 className="font-bold text-4xl">
              ${products[0] ? products[0].price.formatted : "Loading..."}
            </h1>

            <div className="flex flex-col md:flex-row md:gap-20 md:items-center">
              <button
                onClick={() => {
                  dispatch(
                    setLoading(
                      <svg
                        aria-hidden="true"
                        className="w-6 h-6 animate-spin text-slate-300 fill-blue-500"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                    )
                  );
                  setTimeout(function () {
                    dispatch(setLoadingInitial());
                  }, 1000);

                  if (products[0].variant_groups.length < 1) {
                    handleClick(products[0].id);
                  } else {
                    handleClick(products[0].id, {
                      [products[0].variant_groups[0].id]:
                        products[0].variant_groups[0].options[0].id,
                    });
                  }
                }}
                className="flex items-center justify-center gap-2 bg-orange-500 text-white md:text-sm lg:text-md font-semibold py-3 px-6 rounded-full hover:bg-orange-700 cursor-pointer transition ease-in-out duration-300"
              >
                {loading} Add to cart
              </button>
              <a
                href="https://www.youtube.com/watch?v=ZKgYMUep-wQ"
                target="_blank"
                rel="noreferrer"
              >
                <div className="flex justify-center py-5 md:p-0">
                  <div className="transition ease-in-out duration-300 relative border border-dashed border-orange-500 rounded-full p-5 text-2xl text-orange-500 cursor-pointer hover:border-solid">
                    <p className="hidden md:block 2xl:hidden text-sm text-orange-500 absolute left-[-8em] md:left-[-65px] w-22 bg-[#FAFCFC] dark:bg-slate-800">
                      Watch video
                    </p>
                    <FaPlay />
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>

        <div className="relative col-span-2 md:col-span-1 flex justify-center py-0 md:py-10 p-10 h-[30.5em]">
          <div className="z-50 absolute left-2 sm:left-10 top-20 ">
            <Similar products={products} />
          </div>
          {products.length > 0 ? (
            <img
              src={products[0] && products[0].image.url}
              alt="carpet"
              className="image-container sm:w-80 select-none"
            />
          ) : (
            <IntroImageSkeleton />
          )}
        </div>

        <div className="row-span-2 xl:grid content-end hidden dark:text-white">
          <Specification />
        </div>
        <div className="dark:text-white flex items-center justify-center col-start-1 xl:col-start-2 xl:col-span-1 col-span-2 mt-8 md:mt-20">
          <div
            className="border p-4 rounded-full dark:hover:bg-slate-700 hover:bg-slate-200 cursor-pointer"
            onClick={() => window.scrollTo({ top: 20000, behavior: "smooth" })}
          >
            <AiOutlineArrowDown />
          </div>
        </div>
      </div>

      <Carpets handleAddToCart={handleAddToCart} handleDiscounts={handleDiscounts}/>
    </>
  );
};

export default React.memo(HeroBanner);

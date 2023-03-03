import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { FiShoppingCart } from "react-icons/fi";

import {
  AiOutlineClose,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineDoubleRight,
  AiOutlineDoubleLeft,
} from "react-icons/ai";

import { hideOpenedProductInitial } from "../../../redux/CarpetReducers/hideOpenedProduct";
import { selectedIdNull } from "../../../redux/CarpetReducers/selectedId";
import { hiddenScroll, backScroll } from "../../../redux/CarpetReducers/scroll";
import { selectedSizeId } from "../../../redux/CarpetReducers/selectedSize";
import { updateCount } from "../../../redux/CarpetReducers/count";
import { startLoad, endLoad } from "../../../redux/CarpetReducers/loading";

const AfterOpeningCarpet = ({ handleAddToCart, setIsFirst }) => {
  const dispatch = useDispatch();

  const { selectedId } = useSelector((state) => state.selector);
  const { products } = useSelector((state) => state.products);
  const { count } = useSelector((state) => state.count);
  const { scroll } = useSelector((state) => state.scroll);
  const { selectedSize } = useSelector((state) => state.selectedSize);
  const { loading } = useSelector((state) => state.loader);

  const [assetsCount, setAssetsCount] = useState(0);

  const handleClick = (id, variantGRP) => {
    dispatch(startLoad(id));
    setTimeout(function () {
      dispatch(endLoad());
    }, 1000);
    handleAddToCart(id, 1, variantGRP);
  };

  const handleSelectedSize = (id) => {
    dispatch(selectedSizeId(id));
  };

  const HideScroll = () => {
    dispatch(hiddenScroll());
  };

  return (
    <>
      <AnimatePresence>
        {selectedId &&
          ((document.body.style.overflow = "hidden"),
          (
            <div className="z-50 p-3 overflow-y-scroll flex justify-center items-start md:items-center bg-white/30 dark:bg-slate-700/30 backdrop-blur-sm w-full h-screen fixed top-0 left-0">
              <div className="flex justify-center">
                <div
                  onClick={() => {
                    dispatch(hideOpenedProductInitial());
                    dispatch(selectedIdNull());
                    document.body.style.overflow = "visible";
                    dispatch(backScroll());
                    setAssetsCount(0)
                    setIsFirst(true)
                  }}
                  className="flex justify-center items-start md:items-center w-full h-screen fixed top-0 left-0"
                ></div>
                <motion.div
                  layoutId={selectedId}
                  className="overflow-hidden w-full relative dark:bg-slate-700 bg-[#EFF0F0] rounded-xl p-4 md:p-6 m-2 md:m-0"
                >
                  <motion.button
                    onClick={() => {
                      dispatch(hideOpenedProductInitial());
                      dispatch(selectedIdNull());
                      document.body.style.overflow = "visible";
                      dispatch(backScroll());
                      setAssetsCount(0)
                      setIsFirst(true)
                    }}
                    className="bg-white/30 backdrop-blur-sm text-xs md:text-md dark:md:text-white dark:md:border-slate-500 m-2 absolute z-50 top-3 right-3 md:top-2 md:right-2 md:border md:border-black md:top-0 md:hover:bg-black md:hover:text-white w-8 h-8 rounded-full flex justify-center items-center cursur-pointer hover:backdrop-blur-xl dark:text-white"
                  >
                    <AiOutlineClose />
                  </motion.button>
                  <div className="grid grid-cols-2">
                    <div className="md:w-80 space-y-4 col-span-2 md:col-span-1 select-none">
                      <div className="relative">
                        {products.map(
                          (carpet) =>
                            carpet.id === selectedId && (
                              <div key={carpet.id}>
                                <div
                                  onClick={() => {
                                    assetsCount <= 0
                                      ? setAssetsCount(carpet.assets.length - 1)
                                      : setAssetsCount(assetsCount - 1);
                                  }}
                                  className="flex absolute text-xs md:text-md bg-white/30 backdrop-blur-sm hover:backdrop-blur-xl top-[40%] left-2 p-3 rounded-full cursor-pointer"
                                >
                                  <AiOutlineArrowLeft />
                                </div>
                                <motion.img
                                  key={carpet.id}
                                  src={carpet.assets[assetsCount].url}
                                  alt="carpet"
                                  className="object-cover w-full h-[12em] sm:h-[18em] rounded-lg"
                                />
                                <div
                                  onClick={() => {
                                    assetsCount < carpet.assets.length - 1
                                      ? setAssetsCount(assetsCount + 1)
                                      : setAssetsCount(0);
                                  }}
                                  className="flex absolute text-xs md:text-md bg-white/30 backdrop-blur-sm hover:backdrop-blur-xl top-[40%] right-2 p-3 rounded-full cursor-pointer"
                                >
                                  <AiOutlineArrowRight />
                                </div>
                              </div>
                            )
                        )}
                      </div>

                      <div className="h-16 md:h-20 w-full overflow-hidden flex items-center justify-center relative rounded-lg">
                        <div
                          onClick={() => HideScroll()}
                          className={`${scroll} w-full h-screen absolute flex justify-center items-center bg-slate/20 backdrop-blur-md cursor-pointer`}
                        >
                          <h1 className="font-bold cursor-pointer flex gap-4 text-xs md:text-md text-white text-shadow-md justify-center text-center items-center">
                            <AiOutlineDoubleLeft className="animate-bounce text-xl text-white front-bold" />{" "}
                            Click & Scroll{" "}
                            <AiOutlineDoubleRight className="text-xl text-white front-bold animate-bounce" />
                          </h1>
                        </div>
                        {products.map((c) => {
                          return (
                            c.id === selectedId && (
                              <div
                                key={c.id}
                                className="flex justify-between items-center gap-5 overflow-x-auto"
                              >
                                {c.assets.map((a) => {
                                  return (
                                    <motion.img
                                      onClick={() => {
                                        setAssetsCount(c.assets.indexOf(a));
                                      }}
                                      key={a.id}
                                      src={a.url}
                                      alt="carpet"
                                      className="object-cover cursor-pointer rounded-lg"
                                    />
                                  );
                                })}
                              </div>
                            )
                          );
                        })}
                      </div>
                    </div>

                    <motion.div className="flex flex-col justify-between px-2 py-4 md:py-0 col-span-2 md:col-span-1 items-center md:items-start">
                      <div className="flex flex-col justify-center items-center gap-2">
                        <div className="w-80 space-y-4 text-center md:text-left">
                          <div className="flex justify-center align-center w-full">
                            <h3 className="font-bold text-md md:text-xl px-4 dark:text-white">
                              {products.map(
                                (carpet) =>
                                  carpet.id === selectedId && carpet.name
                              )}
                            </h3>
                          </div>
                          <div className="flex justify-evenly sm:justify-between items-center px-4 m-6 sm:m-0">
                            <div className="price flex flex-col md:flex-row gap-4 justify-center md:justify-start">
                              <h3 className="text-red-500 line-through font-bold text-xs md:text-sm flex">
                                $
                                {products.map(
                                  (carpet) =>
                                    carpet.id === selectedId &&
                                    carpet?.variant_groups[0]?.options[count]?.price?.raw * 1.5
                                )}
                              </h3>
                              <h3 className="text-green-500 flex text-xs md:text-sm">
                                $
                                {products.map(
                                  (carpet) => 
                                    carpet.id === selectedId && 
                                    carpet?.variant_groups[0]?.options[count]?.price?.raw
                                )}
                              </h3>
                            </div>
                            <div className="bg-red-200 flex justify-center items-center p-2 w-20 h-10 rounded-xl text-red-500 font-bold text-xs md:text-sm">
                              -
                              {products.map(
                                (carpet) =>
                                  carpet.id === selectedId &&
                                  String(
                                    carpet?.variant_groups[0]?.options[count]?.price?.raw 
                                    * 1.5 -
                                      carpet?.variant_groups[0]?.options[count]?.price?.raw).slice(0, 2)
                              )}
                              %
                            </div>
                          </div>
                        </div>

                        <div className="w-80 mt-4 space-y-4 ">
                          {products.map((carpet) => {
                            return (
                              <div key={carpet.id}>
                                {carpet.id === selectedId &&
                                  carpet.variant_groups.map((variant) => {
                                    return (
                                      <div
                                        key={variant.id}
                                        className="flex items-center flex-wrap gap-2 justify-center dark:text-white mx-12 sm:mx-0"
                                      >
                                        {variant.name === "size" &&
                                          variant.options.map((option) => {
                                            return (
                                              <div
                                                onClick={(e) => {
                                                  handleSelectedSize(option.id);
                                                  dispatch(
                                                    updateCount(
                                                      variant.options.indexOf(
                                                        option
                                                      )
                                                    )
                                                  );
                                                  setIsFirst(false)
                                                }}
                                                key={option.id}
                                                className={`${
                                                  selectedSize === option.id
                                                    ? "border-2 border-black"
                                                    : "border-2 border-gray-300"
                                                } p-2 w-20 rounded-md hover:bg-slate-200 dark:hover:bg-slate-500 cursor-pointer text-center text-xs md:text-md`}
                                              >
                                                {option.name}
                                              </div>
                                            );
                                          })}
                                      </div>
                                    );
                                  })}
                              </div>
                            );
                          })}
                        </div>

                        <div
                          onClick={() => {
                            products.map((c) => {
                              if (c.id === selectedId) {
                                if (c.variant_groups.length < 1) {
                                  handleClick(c.id);
                                } else {
                                  c.variant_groups[0].options.map((o) => {
                                    if (o.id === selectedSize) {
                                      handleClick(c.id, {
                                        [c.variant_groups[0].id]: o.id,
                                      });
                                    }
                                  });
                                }
                              }
                            });
                          }}
                          className="mt-4 bg-gradient-to-r from-orange-500 to-yellow-500 hover:bg-gradient-to-l from-orange-500 to-yellow-500 flex gap-4 items-center justify-center w-full h-10 md:px-5 rounded-lg font-bold text-white cursor-pointer"
                        >
                          {loading === selectedId ? (
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
                          ) : (
                            <div className="flex gap-4 items-center justify-center text-center text-xs md:text-[1rem]">
                              Add to Cart{" "}
                              <FiShoppingCart className="text-lg md:text-xl" />
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="w-full md:w-80 mt-4">
                        {products.map(
                          (carpet) =>
                            carpet.id === selectedId && (
                              <p
                                key={carpet.id}
                                dangerouslySetInnerHTML={{
                                  __html: carpet.description,
                                }}
                                className="text-slate-400 text-xs md:text-sm"
                              />
                            )
                        )}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>
          ))}
      </AnimatePresence>
    </>
  );
};

export default AfterOpeningCarpet;

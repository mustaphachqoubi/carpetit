import React, { useState, useEffect, useMemo } from "react";
import { FiShoppingCart } from "react-icons/fi";
import {
  AiOutlineClose,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
} from "react-icons/ai";
import { BsStar, BsStarHalf, BsStarFill } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";
import ProductSkeleton from "../../Skeletons/ProductSkeleton";

function Carpet({ products, onAddToCart, selectedCategory, search }) {
  const [loading, setLoading] = useState(-1);
  const [selectedId, setSelectedId] = useState(null);
  const [carpetList, setCarpetList] = useState([]);
  const [count, setCount] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe || isRightSwipe) {
      if (isLeftSwipe) {
        products.map((carpet) =>
          count <= 0 ? setCount(carpet.assets.length - 1) : setCount(count - 1)
        );
      } else {
        count < products.map((carpet) => setCount(carpet.assets.length - 1))
          ? setCount(count + 1)
          : setCount(0);
      }
    }
  };

  const handleClick = (id) => {
    setLoading(id);
    setTimeout(function () {
      setLoading(-1);
    }, 1000);
    onAddToCart(id, 1);
  };

  const getFilteredList = () => {
    if (!selectedCategory) {
      return carpetList;
    } else if (selectedCategory == "all") {
      return carpetList;
    }
    return carpetList.filter(
      (item) => item.categories.map((c) => c.slug) == selectedCategory
    );
  };

  var filteredList = useMemo(getFilteredList, [selectedCategory, carpetList]);

  useEffect(() => {
    setCarpetList(products.map((c) => c));
  }, [products]);

  return (
    <>
      {products.length > 0
        ? filteredList.map((c) => (
            <motion.div
              layoutId={c.id}
              className="shrink-0 cursor-pointer w-[18rem] sm:max-w-sm "
              key={c.id}
            >
              <motion.div className="relative">
                <motion.h3
                  onClick={() => setSelectedId(c.id)}
                  className="bg-red-200 px-3 py-1 rounded-md text-red-500 absolute top-4 left-4 font-semibold shadow-lg text-lg"
                >
                  -70%
                </motion.h3>
                <motion.img
                  onClick={() => setSelectedId(c.id)}
                  src={c.image.url}
                  alt="carpet"
                  className="object-cover h-[18em] w-80 rounded-xl"
                />
                <motion.div
                  onClick={() => handleClick(c.id)}
                  className={
                    "absolute bg-white text-slate-500 hover:bg-slate-200 right-[1rem] bottom-[1rem] p-4 text-xl rounded-full"
                  }
                >
                  {loading === c.id ? (
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
                    <FiShoppingCart />
                  )}
                </motion.div>
              </motion.div>
              <motion.div
                className="flex justify-between p-2 py-4"
                onClick={() => setSelectedId(c.id)}
              >
                <motion.div>
                  <h3 className="dark:text-white font-bold text-xl">
                    {c.name}
                  </h3>
                  <p
                    dangerouslySetInnerHTML={{
                      __html:
                        c.description.length > 20
                          ? `${c.description.slice(0, 16)}...`
                          : c.description,
                    }}
                    className="text-slate-400 text-sm"
                  />
                </motion.div>
                <motion.div className="bg-gradient-to-r from-orange-500 to-yellow-500 flex items-center justify-center h-10 px-5 rounded-lg font-bold ">
                  ${c.price.formatted}
                </motion.div>
              </motion.div>
            </motion.div>
          ))
        : [1, 2, 3, 4, 5, 6, 7, 8].map((p) => <ProductSkeleton key={p} />)}
      <AnimatePresence>
        {selectedId && (
          <div className="p-8 sm:p-0 overflow-y-scroll flex justify-center items-start md:items-center bg-white/30 backdrop-blur-sm w-full h-screen fixed top-0 left-0">
            <div>
              <motion.div
                layoutId={selectedId}
                className="w-full relative dark:bg-slate-600 bg-[#EFF0F0] rounded-xl p-6"
              >
                <motion.button
                  onClick={() => setSelectedId(null)}
                  className="bg-white/30 backdrop-blur-sm dark:md:text-white dark:md:border-slate-500 m-2 absolute z-50 top-5 right-5 md:right-0 md:border md:border-black md:top-0 md:hover:bg-black md:hover:text-white w-8 h-8 rounded-full flex justify-center items-center cursur-pointer hover:backdrop-blur-xl dark:text-white"
                >
                  <AiOutlineClose />
                </motion.button>
                <div className="grid grid-cols-2">
                  <div className="md:w-80 space-y-4 col-span-2 md:col-span-1">
                    <div className="relative">
                      {products.map(
                        (carpet) =>
                          carpet.id == selectedId && (
                            <div key={carpet.id}>
                              <div
                                onClick={() => {
                                  count <= 0
                                    ? setCount(carpet.assets.length - 1)
                                    : setCount(count - 1);
                                }}
                                className="hidden md:flex absolute bg-white/30 backdrop-blur-sm hover:backdrop-blur-xl top-[40%] left-2 p-3 rounded-full cursor-pointer"
                              >
                                <AiOutlineArrowLeft />
                              </div>
                              <motion.img
                                onTouchStart={(e) => onTouchStart(e)}
                                onTouchMove={(e) => onTouchMove(e)}
                                onTouchEnd={() => onTouchEnd()}
                                key={carpet.id}
                                src={carpet.assets[count].url}
                                alt="carpet"
                                className="object-cover w-full h-[12em] sm:h-[18em] rounded-lg"
                              />
                              <div
                                onClick={() => {
                                  count < carpet.assets.length - 1
                                    ? setCount(count + 1)
                                    : setCount(0);
                                }}
                                className="hidden md:flex absolute bg-white/30 backdrop-blur-sm hover:backdrop-blur-xl top-[40%] right-2 p-3 rounded-full cursor-pointer"
                              >
                                <AiOutlineArrowRight />
                              </div>
                            </div>
                          )
                      )}
                    </div>

                    <div className="sm:h-20 overflow-hidden">
                      {products.map((c) => {
                        return (
                          c.id == selectedId && (
                            <div
                              key={c.id}
                              className="flex justify-between items-center gap-5"
                            >
                              {c.assets.slice(1).map((a) => {
                                return (
                                  <motion.img
                                    onClick={() => {
                                      setCount(c.assets.indexOf(a));
                                    }}
                                    key={a.id}
                                    src={
                                      c.assets[count].id == a.id
                                        ? c.assets[0].url
                                        : a.url
                                    }
                                    alt="carpet"
                                    className="object-fill h-16 w-full cursor-pointer rounded-lg"
                                  />
                                );
                              })}
                            </div>
                          )
                        );
                      })}
                    </div>
                  </div>

                  <motion.div className="flex flex-col p-2 py-4 col-span-2 md:col-span-1 items-center md:items-start">
                    <div className="w-80 space-y-4 text-center md:text-left">
                      <h3 className="font-bold text-2xl md:text-xl px-4 dark:text-white">
                        {products.map(
                          (carpet) => carpet.id == selectedId && carpet.name
                        )}
                      </h3>
                      <div className="flex justify-around sm:justify-between items-center px-4 m-4 sm:m-0">
                        <div className="price flex gap-4 justify-center md:justify-start">
                          <h3 className="text-red-500 line-through font-bold text-sm">
                            $1000
                          </h3>
                          <h3 className="text-green-500">
                            $
                            {products.map(
                              (carpet) =>
                                carpet.id == selectedId &&
                                carpet.price.formatted
                            )}
                          </h3>
                        </div>
                        <div className="bg-red-200 flex justify-center items-center p-2 w-20 rounded-xl text-red-500 font-bold ">
                          -70%
                        </div>
                      </div>
                      <div className="flex px-12 sm:px-4">
                        <input
                          type="text"
                          className="dark:text-white dark:bg-slate-500 dark:placeholder:text-white focus:outline-none bg-gray-200 placeholder:text-sm p-2 rounded-l-md w-full"
                          placeholder="You have a Cupon !"
                        />
                        <button className="bg-black text-white font-bold p-2 text-sm rounded-r-md h-10 ">
                          check
                        </button>
                      </div>
                    </div>

                    <div className="w-80 mt-4 space-y-4">
                      <div className="flex justify-center h-10 px-12 sm:px-4">
                        <input
                          type="text"
                          className="dark:text-white dark:bg-slate-500 dark:placeholder:text-white focus:outline-none mb-4 h-10 bg-gray-200 placeholder:text-sm p-2 rounded-l-md w-full "
                          placeholder="Put size in cm"
                        />
                        <button className="bg-black text-white font-bold p-2 h-10 w-[5.5em] sm:w-[5em] text-sm rounded-r-md">
                          Size it
                        </button>
                      </div>

                      {products.map((carpet) => {
                        return (
                          <div key={carpet.id} className="">
                            {carpet.id == selectedId &&
                              carpet.variant_groups.map((variant) => {
                                return (
                                  <div
                                    key={variant.id}
                                    className="flex items-center flex-wrap gap-2 justify-center dark:text-white mx-12 sm:mx-0"
                                  >
                                    {variant.name == "size" &&
                                      variant.options.map((option) => {
                                        return (
                                          <div
                                            key={option.id}
                                            className="p-2 w-20 border rounded-md border-gray-300 hover:bg-slate-200 dark:hover:bg-slate-500 cursor-pointer text-center"
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
                      onClick={() => handleClick(selectedId)}
                      className="mt-4 bg-gradient-to-r from-orange-500 to-yellow-500 hover:bg-gradient-to-l from-orange-500 to-yellow-500 flex gap-4 items-center justify-center w-full h-10 px-5 rounded-lg font-bold text-white cursor-pointer"
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
                        <div className="flex gap-4 items-center justify-center">
                          Add to Cart <FiShoppingCart className="text-xl" />
                        </div>
                      )}
                    </div>
                  </motion.div>

                  <motion.div className="flex justify-between p-2 py-4 col-span-2 md:col-span-1">
                    <div className="w-80">
                      {products.map(
                        (carpet) =>
                          carpet.id == selectedId && (
                            <p
                              key={carpet.id}
                              dangerouslySetInnerHTML={{
                                __html: carpet.description,
                              }}
                              className="text-slate-400 text-sm"
                            />
                          )
                      )}
                    </div>
                  </motion.div>

                  <motion.div className="flex justify-between p-2 py-4 col-span-2 md:col-span-1">
                    <div className="w-80">
                      <div className="flex text-xl text-yellow-500">
                        <BsStarFill />
                        <BsStarFill />
                        <BsStarFill />
                        <BsStarHalf />
                        <BsStar />
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Carpet;

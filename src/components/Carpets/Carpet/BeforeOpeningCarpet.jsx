import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { FiShoppingCart } from "react-icons/fi";
import ProductSkeleton from "../../Skeletons/ProductSkeleton";

import { hideOpenedProductHidden } from "../../../redux/CarpetReducers/hideOpenedProduct";
import { selectedIdGetId } from "../../../redux/CarpetReducers/selectedId";
import { startLoad, endLoad } from "../../../redux/CarpetReducers/loading";
import {countToZero} from '../../../redux/CarpetReducers/count'

const BeforeOpeningCarpet = ({ selectedCategory, handleAddToCart }) => {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);
  const { searchedCarpetList } = useSelector((state) => state.searchedCarpetList);
  const { loading } = useSelector((state) => state.loader);

  const handleClick = (id, variantGRP) => {
    dispatch(startLoad(id));
    setTimeout(function () {
      dispatch(endLoad());
    }, 1000);
    handleAddToCart(id, 1, variantGRP);
  };

  const getFilteredList = () => {
    if (selectedCategory === "") {
      return searchedCarpetList;
    } else {
      return searchedCarpetList.filter((carpet) =>
        carpet.categories.map((cat) => cat.name).includes(selectedCategory)
      );
    }
  };

  var filteredList = useMemo(getFilteredList, [selectedCategory, searchedCarpetList]);

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <>
      {products.length > 0
        ? filteredList.map((c) => (
            <motion.div
              variants={container}
              initial="hidden"
              animate="visible"
              transition={{
                delay: 0.5,
                duration: 2,
                default: { ease: "linear" }
              }}                            
              layoutId={c.id}
              className={`shrink-0 cursor-pointer w-[16rem] sm:w-[18rem] sm:max-w-sm`}
              key={c.id}
              onClick={() => {
                dispatch(hideOpenedProductHidden());
                dispatch(countToZero())
              }}
            >
              <motion.div className={`relative`}>
                <motion.img
                  onClick={() => dispatch(selectedIdGetId(c.id))}
                  src={c.assets[0].url}
                  alt="carpet"
                  className="img object-cover h-[18em] w-80 rounded-xl"
                />
                <motion.div
                  onClick={() => {
                    if (c.variant_groups.length < 1) {
                      handleClick(c.id);
                    } else {
                      handleClick(c.id, {
                        [c.variant_groups[0].id]:
                          c.variant_groups[0].options[0].id,
                      });
                    }
                  }}
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
                className="flex flex-col sm:flex-row text-center sm:text-left gap-2 sm:gap-0 justify-between py-4"
                onClick={() => dispatch(selectedIdGetId(c.id))}
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
        : [1, 2, 3, 4, 5, 6, 7, 8].map((p) => (
            <ProductSkeleton key={p} className="animate-pulse" />
          ))}
    </>
  );
};

export default React.memo(BeforeOpeningCarpet);

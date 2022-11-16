import React, { useState, useEffect, useRef } from "react";
import { BiFilterAlt } from "react-icons/bi";
import { Filtering } from "../../../dummy";

const FilterProduct = ({ products, Search }) => {
  const [filter, setFilter] = useState("hidden");
  const searchRef = useRef(null);

  return (
    <div className="flex flex-col items-center mt-20 md:mt-10">
      <div className="flex justify-center items-center p-4 md:p-10">
        <input
          className="dark:text-white pr-[10rem] h-16 w-full md:h-[3.5rem] px-6 md:w-[30rem] bg-[#EFF0F0] dark:bg-slate-600 dark:placeholder:text-white rounded-md"
          type="search"
          name=""
          id=""
          placeholder="Search Carpets"
          ref={searchRef}
        />
        <button
          className="text-xs ml-[-7rem] md:ml-[-10rem] h-12 w-[6.5rem] md:h-[3.5rem] md:w-[10rem] flex justify-center items-center bg-zinc-900 hover:bg-black text-white  font-bold rounded-lg md:rounded-sm"
          type="submit"
          onClick={() => Search(searchRef.current.value)}
        >
          Explore Now
        </button>
      </div>

      <div className="text-gray-400 w-full flex justify-center md:px-48 flex-wrap">
        <button className="bg-orange-500 py-2 px-4 rounded-md font-medium text-white m-2">
          Everything
        </button>
        <button className="hover:bg-orange-500 hover:text-white py-2 px-4 rounded-md font-medium m-2">
          Popular
        </button>
        <button className="hover:bg-orange-500 hover:text-white py-2 px-4 rounded-md font-medium m-2">
          Hot
        </button>
        <button className="hover:bg-orange-500 hover:text-white py-2 px-4 rounded-md font-medium m-2">
          Moroccan
        </button>
        <button className="hover:bg-orange-500 hover:text-white py-2 px-4 rounded-md font-medium m-2">
          Egyptian
        </button>
        <button
          onClick={() =>
            filter === "hidden"
              ? setFilter("flex")
              : filter === "flex"
              ? setFilter("hidden")
              : ""
          }
          className="flex justify-center items-center bg-[#EFF0F0] dark:bg-slate-600 dark:hover:bg-slate-700 dark:text-white hover:bg-zinc-300 text-black py-2 px-4 rounded-md font-medium m-2"
        >
          <BiFilterAlt />
          Filter
        </button>
      </div>

      <div className="py-4 px-10 w-96">
        <div
          className={`${filter} flex dark:bg-slate-500 bg-gray-200 shadow-md text-slate-500 dark:text-white w-full h-48 rounded-xl flex-wrap justify-evenly items-center`}
        >
          {Filtering.map((fil) => (
            <div key={fil.title}>
              <h3 className="font-bold text-slate-900">{fil.title}</h3>
              <ul className="mt-2">
                {fil.filterList.map((i) => (
                  <li
                    className="text-sm hover:text-black cursor-pointer"
                    key={i}
                  >
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterProduct;

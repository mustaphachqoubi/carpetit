import React, { useState, useEffect, useRef } from "react";
import { BiFilterAlt } from "react-icons/bi";
import Filtering from "../../../dummy";
import { useDispatch } from "react-redux";
import { getSearchRef } from "../../../redux/CarpetReducers/searchInputReducer";

const FilterProduct = ({ SelectedCat, handleSearch }) => {
  const [choosenBg, setChoosenBg] = useState("bg-orange-500 text-white");
  const [isAllBg, setIsAllBg] = useState(false);
  const [filter, setFilter] = useState("hidden");
  const [allBg, setAllBg] = useState("bg-orange-500 text-white");
  const [ispopularBg, setPopularBg] = useState(false);
  const [ishotBg, setHotBg] = useState(false);
  const [ismoroccanBg, setMoroccanBg] = useState(false);
  const [isegyptiang, setEgyptianBg] = useState(false);

  const searchRef = useRef(null);
  const dispatch = useDispatch();

  const handleAllBg = () => {
    setIsAllBg((current) => !current);
    setHotBg(false);
    setMoroccanBg(false);
    setEgyptianBg(false);
    setPopularBg(false);
    setAllBg("bg-orange-500 text-white");
  };
  const handlePopularBg = () => {
    setPopularBg((current) => !current);
    setHotBg(false);
    setMoroccanBg(false);
    setEgyptianBg(false);
    setAllBg("");
  };
  const handleHotBg = () => {
    setHotBg((current) => !current);
    setPopularBg(false);
    setMoroccanBg(false);
    setEgyptianBg(false);
    setAllBg("");
  };
  const handleMoroccanBg = () => {
    setMoroccanBg((current) => !current);
    setHotBg(false);
    setPopularBg(false);
    setEgyptianBg(false);
    setAllBg("");
  };
  const handleEgyptianBg = () => {
    setEgyptianBg((current) => !current);
    setHotBg(false);
    setPopularBg(false);
    setMoroccanBg(false);
    setAllBg("");
  };

  useEffect(() => {
    dispatch(getSearchRef(searchRef.current.value));
  });

  return (
    <div className="flex flex-col items-center mt-20 md:mt-10">
      <div className="flex justify-center items-center p-4 md:p-10">
        <input
          className="dark:text-white pr-[10rem] h-16 w-full md:h-[3.5rem] px-6 md:w-[30rem] bg-[#EFF0F0] dark:bg-slate-600 dark:placeholder:text-white rounded-md"
          type="search"
          name=""
          id=""
          placeholder="white, moroccan..."
          ref={searchRef}
        />
        <button
          className="text-xs ml-[-7rem] md:ml-[-10rem] h-12 w-[6.5rem] md:h-[3.5rem] md:w-[10rem] flex justify-center items-center bg-zinc-900 hover:bg-black text-white  font-bold rounded-lg md:rounded-sm"
          type="submit"
          onClick={() => {
            handleSearch(searchRef.current.value.toLowerCase());
          }}
        >
          Explore Now
        </button>
      </div>

      <div className="text-gray-400 w-full flex justify-center md:px-48 flex-wrap px-4 md:px-0">
        <button
          title="all"
          onClick={(e) => {
            SelectedCat("");
            handleAllBg();
          }}
          className={`${allBg} py-2 px-4 rounded-md font-medium m-2`}
        >
          All
        </button>
        <button
          title="popular"
          className={`${
            ispopularBg ? choosenBg : ""
          } py-2 px-4 rounded-md font-medium m-2`}
          onClick={(e) => {
            SelectedCat(e.target.title.toLowerCase());
            handlePopularBg();
          }}
        >
          Popular
        </button>
        <button
          title="hot"
          onClick={(e) => {
            SelectedCat(e.target.title.toLowerCase());
            handleHotBg();
          }}
          className={`${
            ishotBg ? choosenBg : ""
          } py-2 px-4 rounded-md font-medium m-2`}
        >
          Hot
        </button>
        <button
          title="moroccan"
          onClick={(e) => {
            handleMoroccanBg();
            SelectedCat(e.target.title.toLowerCase());
          }}
          className={`${
            ismoroccanBg ? choosenBg : ""
          } py-2 px-4 rounded-md font-medium m-2`}
        >
          Moroccan
        </button>
        <button
          title="egyptian"
          onClick={(e) => {
            handleEgyptianBg();
            SelectedCat(e.target.title.toLowerCase());
          }}
          className={`${
            isegyptiang ? choosenBg : ""
          } py-2 px-4 rounded-md font-medium m-2`}
        >
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

      <div className="py-4 px-10 w-[100%]">
        <div
          className={`${filter} flex dark:bg-slate-500 bg-gray-200 text-slate-500 dark:text-white w-full h-48 rounded-xl flex-wrap justify-evenly items-center`}
        >
          {Filtering.map((fil) => (
            <div key={fil.title}>
              <h3 className="font-bold text-slate-900">{fil.title}</h3>
              <div className="mt-2">
                {fil.filterList.map((i) => (
                  <h3
                    title={i.toLowerCase()}
                    className="text-sm mt-2 hover:text-black cursor-pointer"
                    key={i}
                    onClick={(e) => {
                      SelectedCat(e.target.title);
                    }}
                  >
                    {i}
                  </h3>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterProduct;

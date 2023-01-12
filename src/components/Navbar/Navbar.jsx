import React, { useState, useEffect } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { FaRegMoon } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = ({ pullDark, totalItems }) => {
  const [darkToggle, setDarkToggle] = useState("");

  useEffect(() => {
    pullDark(darkToggle);
  });

  return (
    <div className="dark:text-white dark:bg-slate-800 py-4 px-10 w-full flex justify-between items-center bg-[#FAFCFC] z-50">
      <Link to="/">
        <div className="flex items-center cursor-pointer">
          {/* <div className="w-8">
            <img src="https://i.pinimg.com/originals/8b/2f/04/8b2f042f2746d28297de313b1fec2ec4.png" alt="" />
          </div> */}
          <h3 className="font-semibold text-xl md:text-xl">Carpetit</h3>
        </div>
      </Link>
      <div className="flex gap-5 justify-center items-center">
        <div
          onClick={() =>
            darkToggle === ""
              ? setDarkToggle("dark")
              : darkToggle === "dark"
              ? setDarkToggle("")
              : setDarkToggle("dark")
          }
          className="border p-3 rounded-full dark:hover:bg-slate-700 hover:bg-slate-200 cursor-pointer flex items-center justify-center"
        >
          <FaRegMoon />
        </div>
        <Link to="/cart">
          <div className="relative border p-3 rounded-full dark:hover:bg-slate-700 hover:bg-slate-200 cursor-pointer flex items-center justify-center">
            <div 
            className="absolute top-0 right-[-10px] w-6 h-6 bg-red-500 p-1 rounded-full text-sm flex justify-center items-center text-white">
              {!totalItems ? 0 : totalItems >= 10 ? "+9" : totalItems}
            </div>
            <FiShoppingCart />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;

import React from "react";
import { BsInstagram } from "react-icons/bs";
import { FiTwitter } from "react-icons/fi";
import { ImWhatsapp } from "react-icons/im";

const Footer = () => {
  return (
    <>
      <hr />
      <div className="dark:text-white space-y-4 md:space-y-0 flex flex-col md:flex-row justify-between items-center p-8">
        <h3 className="font-bold cursor-pointer">
          Carpet<span className="text-orange-500">it</span>
        </h3>
        <h3 className="font-semibold">carpetit@gmail.com</h3>
        <div className="flex space-x-4">
          <div className="bg-slate-200 hover:bg-slate-300 cursor-pointer dark:bg-slate-500 dark:hover:bg-slate-600 p-3 rounded-lg md:text-2xl">
            <BsInstagram />
          </div>
          <div className="bg-slate-200 hover:bg-slate-300 cursor-pointer dark:bg-slate-500 dark:hover:bg-slate-600 p-3 rounded-lg md:text-2xl">
            <FiTwitter />
          </div>
          <div className="bg-slate-200 hover:bg-slate-300 cursor-pointer dark:bg-slate-500 dark:hover:bg-slate-600 p-3 rounded-lg md:text-2xl">
            <ImWhatsapp />
          </div>
        </div>
      </div>
      <div className="dark:text-white flex p-4 justify-center text-center">
        Copyright © 2022 Carpetit | All Rights Reserved.
      </div>
    </>
  );
};

export default Footer;

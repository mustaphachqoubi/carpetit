import React, { useEffect } from "react";
import { RiStarSFill } from "react-icons/ri";

const Specification = ({ products }) => {
  return (
    <div className="mr-5 w-96 space-y-2">
      <h1 className="font-bold text-xl">Specification</h1>
      <p className="flex items-center text-yellow-500">
        <RiStarSFill />
        <RiStarSFill />
        <RiStarSFill />
        <RiStarSFill />
        <RiStarSFill />
        <span className="ml-2 text-gray-500 text-sm">156 Reviews</span>
      </p>
      <p
        className="max-w-xs"
        dangerouslySetInnerHTML={{
          __html: products[0] && products[0].description,
        }}
      />
      <hr className="mt-5" />
      <div className="grid grid-rows-4 divide-y">
        <div className="flex justify-start justify-between items-center p-4">
          <h3 className="text-slate-400 font-semibold">Carpet ID</h3>
          <h3 className="font-medium">
            {products[0] ? products[0].id : "Loading..."}
          </h3>
        </div>
        <div className="flex justify-start justify-between items-center p-4">
          <h3 className="text-slate-400 font-semibold">Thickness</h3>
          <h3 className="font-medium">9 mm</h3>
        </div>
        <div className="flex justify-start justify-between items-center p-4">
          <h3 className="text-slate-400 font-semibold">Pile</h3>
          <h3 className="font-medium">Wool</h3>
        </div>
        <div className="flex justify-start justify-between items-center p-4">
          <h3 className="text-slate-400 font-semibold">Warp</h3>
          <h3 className="font-medium">Cotton</h3>
        </div>
      </div>
    </div>
  );
};

export default Specification;

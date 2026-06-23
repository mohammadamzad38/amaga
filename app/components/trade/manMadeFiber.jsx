"use client";

import Sort from "../sort";
import Reset from "../reset";
import SearchInput from "../search";
import React, { useState } from "react";
import { FaAngleUp } from "react-icons/fa6";
import { FaAngleDown } from "react-icons/fa6";
import FiberTopButton from "../fiberTopButton";
import FiberMiddleBar from "../fiberMiddleBar";

const categories = ["Polyster", "Viscose", "Rayon", "Others"];

const ManMadeFiber = () => {
  const [category, setCategory] = useState("Polyster");
  const [open, setOpen] = useState(false);

  return (
    <div className="h-screen bg-[#ECECEC] px-6 relative">
      <div>
        <FiberTopButton />
        <FiberMiddleBar />

        <div className="flex justify-between pt-8 flex-wrap gap-4 items-center overflow-hidden">
          <div className="flex items-center gap-2 md:gap-6">
            <div className="relative">
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center justify-between gap-3 px-4 py-2 rounded-full border border-gray-300 bg-white text-sm font-medium min-w-30"
              >
                {category}
                {open ? <FaAngleUp /> : <FaAngleDown />}
              </button>

              {open && (
                <div className="absolute left-0 mt-2 w-full bg-white rounded-xl shadow-md z-50 overflow-hidden">
                  {categories.map((item) => (
                    <div
                      key={item}
                      onClick={() => {
                        setCategory(item);
                        setOpen(false);
                      }}
                      className={`px-4 py-2 text-sm cursor-pointer hover:bg-green-50 ${
                        category === item ? "bg-green-100 font-semibold" : ""
                      }`}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <SearchInput />
          </div>

          <div className="flex gap-12 items-center">
            <Reset />
            <Sort />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManMadeFiber;

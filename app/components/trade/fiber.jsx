"use client";

import React from "react";
import Sort from "../sort";

import Reset from "../reset";
import Search from "../search";
import BuyerQuarry from "../buyerQuarry";
import GradeDropdown from "../gradeDropdown";

import OriginDropdown from "../originDropdown";
import StapleDropdown from "../stapleDropdown";
import FiberTopBar from "../fiberMiddleBar";
import FiberTopButton from "../fiberTopButton";

const Fiber = () => {
  return (
    <div className="bg-[#ECECEC] h-screen pt-6">
      <div className="grid md:grid-cols-[3fr_1fr] flex-col">
        <FiberTopButton />
        <div>
          <BuyerQuarry />
        </div>
      </div>

      <FiberTopBar />

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-4 lg:gap-10 pt-6">
        <div className="flex flex-row justify-around w-full gap-4">
          <OriginDropdown />
          <GradeDropdown />
          <StapleDropdown />
        </div>

        <div className="flex flex-wrap gap-4 justify-around">
          <Search />
          <Reset />
          <Sort />
        </div>
      </div>
    </div>
  );
};

export default Fiber;

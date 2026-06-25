import React from "react";
import Sort from "../sort";
import Reset from "../reset";
import Search from "../search";
import ShopNavBTN from "./shopsNavBTN";
import Navigation from "../navigation";
import ActionButton from "../actionButton";

const Retail = () => {
  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 justify-center items-center md:justify-between">
        <ShopNavBTN />
        <div className="w-[60%] md:w-auto mb-4 md:mb-0">
          <ActionButton href={""} label={"Upload Retail Offers"} />
        </div>
      </div>
      <div className="flex flex-wrap justify-around gap-4 mt-4 md:justify-between">
        <Navigation t2={"Online Mall"} />
        <Search />
        <Reset />
        <Sort />
      </div>
    </div>
  );
};

export default Retail;

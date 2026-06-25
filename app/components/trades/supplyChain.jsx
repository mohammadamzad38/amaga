import React from "react";
import Sort from "../sort";
import Reset from "../reset";
import Search from "../search";
import FiberNavBTN from "../fiberNavBTN";
import ActionButton from "../actionButton";
import OriginDropDown from "../originDropdown";

const SupplyChain = () => {
  return (
    <div>
      <div>
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center md:justify-between">
          <FiberNavBTN />
          <div className="w-[60%] md:w-auto mb-4 md:mb-0">
            <ActionButton href={""} label={"Upload to Supplier Directory"} />
          </div>
        </div>
        <div className="border-b border-gray-400"></div>
        <div className="flex flex-wrap justify-around gap-4 mt-4">
          <OriginDropDown />
          <Search />
          <Reset />
          <Sort />
        </div>
      </div>
    </div>
  );
};

export default SupplyChain;

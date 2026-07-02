import React from "react";
import Sort from "../../sort";
import Reset from "../../reset";
import Search from "../../search";
import Navigation from "../../navigation";
import ActionButton from "../../actionButton";
import OriginDropdown from "../../originDropdown";

const Logistic = () => {
  return (
    <div className="h-screen">
      <div>
        <div className="flex flex-col lg:flex-row justify-between gap-6 md:gap-14">
          <Navigation t2={"Logistic"} />

          <div className="flex justify-between md:justify-end lg:justify-between gap-4">
            <ActionButton label={"Upload Logistic Offers"} href={""} />
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-4 justify-between  mt-4">
          <Search />
          <OriginDropdown />
          <Reset />
          <Sort />
        </div>
      </div>
    </div>
  );
};

export default Logistic;

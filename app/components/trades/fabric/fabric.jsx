"use client";

import Sort from "../../sort";
import Reset from "../../reset";
import Search from "../../search";
import Navigation from "../../navigation";
import React, { useState } from "react";
import PriceFilter from "../../priceFilter";
import ActionButton from "../../actionButton";
import OriginDropdown from "../../originDropdown";

const categoriesList = [
  "Cotton",
  "Polyester",
  "Millange",
  "Viscose",
  "Leather",
  "Rayon",
  "Others",
];

const Fabric = () => {
  const [priceFilter, setPriceFilter] = useState("low_to_high");
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCategory = (item) => {
    if (selectedCategories.includes(item)) {
      setSelectedCategories(selectedCategories.filter((i) => i !== item));
    } else {
      setSelectedCategories([...selectedCategories, item]);
    }
  };

  return (
    <div className="h-screen bg-[#ECECEC] ">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-6 h-auto">
        <div>
          <div className="bg-white p-4">
            <h2 className="text-sm font-semibold mb-3">CATEGORIES</h2>

            <div className="space-y-2 max-h-50 overflow-y-auto">
              {categoriesList.map((item) => (
                <label
                  key={item}
                  className="flex items-center max-w-lg gap-2 text-sm cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(item)}
                    onChange={() => handleCategory(item)}
                    className="accent-green-500 w- h-4"
                  />
                  {item}
                </label>
              ))}
            </div>
          </div>

          <PriceFilter value={priceFilter} onChange={setPriceFilter} />

          {/* <QuerryCard value={buyer} className={""} /> */}
        </div>

        <div>
          <div className="flex flex-col lg:flex-row justify-between gap-6 md:gap-14">
            <div className="flex justify-between gap-10">
              <Navigation t2={"Fabric"} />
              <OriginDropdown />
            </div>
            <div className="flex justify-between md:justify-end lg:justify-between gap-4">
              <ActionButton label={"Edit as a Supplier"} href={""} />
              <ActionButton label={"Upload Fabric Offers"} href={""} />
            </div>
          </div>
          <div className="flex flex-wrap gap-4 justify-between  mt-4">
            <Search />
            <Reset />
            <Sort />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fabric;

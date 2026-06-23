"use client";

import Sort from "../sort";
import Reset from "../reset";
import Search from "../search";
import Navigation from "../navigation";
import React, { useState } from "react";
import PriceFilter from "../priceFilter";
import ActionButton from "../actionButton";

const categoriesList = [
  "Ginnery Machines",
  "Lubricants",
  "Bearing",
  "Belts",
  "Adhesives",
  "Machine Parts",
  "Chemicals",
  "Machinery",
  "Textile Wax",
  "Dyes & Chemicals",
  "Others",
];

const Machine = () => {
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

            <div className="space-y-2 max-h-[200px] overflow-y-auto">
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

        <div className="flex flex-col">
          <div className="flex flex-col md:flex-row gap-4 justify-between w-full">
            <Navigation t2="Machinery" />

            <div className="flex items-center gap-4">
              <ActionButton
                label="Edit as a Supplier"
                href="/trade/upload/supplier"
              />
              <ActionButton
                label="Upload Machinery Offers"
                href="/trade/upload/machinery"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-4 justify-center md:justify-between mt-8 items-center">
            <Search />

            <div className="flex items-center gap-10 md:gap-4">
              <Reset />
              <Sort />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Machine;

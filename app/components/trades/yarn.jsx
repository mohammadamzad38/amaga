"use client";

import React, { useState } from "react";
import Sort from "../sort";
import Reset from "../reset";
import Search from "../search";
import Navigation from "../navigation";
import ActionButton from "../actionButton";
import OriginDropDown from "../originDropdown";
import YarnFilter from "../yarnFilter";

const Yarn = () => {
  const [fiber, setFiber] = useState([]);
  const [quality, setQuality] = useState([]);
  const [yarnCount, setYarnCount] = useState([]);
  const [speciality, setSpeciality] = useState([]);
  return (
    <div>
      <div className="grid md:grid-cols-1 md:grid-cols-[1fr_3fr] gap-10 min-h-screen">
        <div>
          <YarnFilter
            fiber={fiber}
            setFiber={setFiber}
            quality={quality}
            setQuality={setQuality}
            yarnCount={yarnCount}
            setYarnCount={setYarnCount}
            speciality={speciality}
            setSpeciality={setSpeciality}
          />
        </div>

        <div>
          <div className="flex flex-col lg:flex-row justify-between gap-6 md:gap-14">
            <div className="flex justify-between gap-10">
              <Navigation t2={"Yarn"} />
              <OriginDropDown />
            </div>
            <div className="flex justify-between md:justify-end lg:justify-between gap-4">
              <ActionButton label={"Edit as a Supplier"} href={""} />
              <ActionButton label={"Upload yarn offers"} href={""} />
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

export default Yarn;

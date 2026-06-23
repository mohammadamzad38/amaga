"use client";

import React from "react";
import QuerryCard from "./querryCard";
import { GrFormPrevious } from "react-icons/gr";
import { MdOutlineNavigateNext } from "react-icons/md";

const buyer = [
  {
    image: "/images/profile.jpeg",
    name: "Mohammad Amzad ",
    price: "30",
    qn: "200",
    qry: "I dont know What?",
    date: "03/02/2021",
  },
  {
    image: "/images/profile.jpeg",
    name: "Kon Amzad",
    price: "10",
    qn: "100",
    qry: "What should i dont know What?",
    date: "11/02/2021",
  },
  {
    image: "/images/profile.jpeg",
    name: "Kon Amzad",
    price: "10",
    qn: "100",
    qry: "What should i dont know What?",
    date: "11/02/2021",
  },
  {
    image: "/images/profile.jpeg",
    name: "Kon Amzad",
    price: "10",
    qn: "100",
    qry: "What should i dont know What?",
    date: "11/02/2021",
  },
  {
    image: "/images/profile.jpeg",
    name: "Kon Amzad",
    price: "10",
    qn: "100",
    qry: "What should i dont know What?",
    date: "11/02/2021",
  },
];

const BuyerQuarry = () => {
  return (
    <div className="max-w-sm lg:max-w-3xl space-y-4">
      <div className="flex gap-2">
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="bg-white rounded-full p-2 shadow cursor-pointer hover:text-[#1DBF74]"
        >
          <GrFormPrevious size={20} />
        </button>

        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="bg-white rounded-full p-2 shadow cursor-pointer hover:text-[#1DBF74]"
        >
          <MdOutlineNavigateNext size={20} />
        </button>
      </div>

      <div className="flex gap-4">
        <div className="w-20 bg-white p-4 rounded-lg shadow  flex flex-col justify-center">
          <p className="text-xl font-bold text-green-500">{buyer.length}</p>
          <p className="text-sm text-gray-500 mt-2">Buy available</p>
        </div>

        <QuerryCard className={"flex-1 min-w-0"} value={buyer} />
      </div>
    </div>
  );
};

export default BuyerQuarry;

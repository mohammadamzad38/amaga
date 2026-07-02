"use client";

import React, { useEffect, useState } from "react";
import QuerryCard from "./querryCard";
import { GrFormPrevious } from "react-icons/gr";
import { MdOutlineNavigateNext } from "react-icons/md";
import { useData } from "../../context/DataContext";

const BuyerQuarry = ({ query }) => {
  const { getAllPosts } = useData();

  const [buyer, setBuyer] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadBuyerPosts() {
      setLoading(true);

      const result = await getAllPosts(query);

      if (!mounted) return;

      if (!result.error) {
        setBuyer(result.data?.results?.data || []);
      } else {
        setBuyer([]);
      }

      setLoading(false);
    }

    loadBuyerPosts();

    return () => {
      mounted = false;
    };
  }, [query, getAllPosts]);

  return (
    <div className="max-w-sm lg:max-w-3xl space-y-4">
      <div className="flex gap-2">
        <button className="bg-white rounded-full p-2 shadow cursor-pointer hover:text-[#1DBF74]">
          <GrFormPrevious size={20} />
        </button>

        <button className="bg-white rounded-full p-2 shadow cursor-pointer hover:text-[#1DBF74]">
          <MdOutlineNavigateNext size={20} />
        </button>
      </div>

      <div className="flex gap-4">
        <div className="w-20 bg-white p-4 rounded-lg shadow flex flex-col justify-center">
          <p className="text-xl font-bold text-green-500">{buyer.length}</p>

          <p className="text-sm text-gray-500 mt-2">Buy available</p>
        </div>

        <QuerryCard className="flex-1 min-w-0" value={buyer} />
      </div>
    </div>
  );
};

export default BuyerQuarry;

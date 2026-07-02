"use client";

import Sort from "../../sort";
import Image from "next/image";
import Reset from "../../reset";
import SearchInput from "../../search";
import Navigation from "../../navigation";
import { useEffect, useState } from "react";
import FiberNavBTN from "../fiber/fiberNavBTN";
import { useData } from "../../../../context/DataContext";

export default function IndicesCharts() {
  const { getAllPosts } = useData();
  const [meta, setMeta] = useState(null);
  const [search, setSearch] = useState("");
  const [indices, setIndices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortt, setSort] = useState("id desc");
  const [resetSignal, setResetSignal] = useState(0);

  useEffect(() => {
    const savedSort = localStorage.getItem("sort");
    const savedSearch = localStorage.getItem("search");

    if (savedSort) setSort(savedSort);
    if (savedSearch) setSearch(savedSearch);
  }, []);

  useEffect(() => {
    localStorage.setItem("sort", sortt);
    localStorage.setItem("search", search);
  }, [sortt, search]);

  useEffect(() => {
    let mounted = true;

    async function loadIndices() {
      setLoading(true);

      const result = await getAllPosts({
        search,
        top: 12,
        orderby: sortt,
        filter: "status=1",
        type: "index-chart",
      });

      if (!mounted) return;

      if (!result.error) {
        setMeta(result?.data?.meta || null);
        setIndices(result?.data?.results || []);
      } else {
        setMeta(null);
        setIndices([]);
      }

      setLoading(false);
    }
    loadIndices();

    return () => {
      mounted = false;
    };
  }, [sortt, search, getAllPosts]);

  const handlereset = () => {
    setSearch("");
    setSort("id desc");
    setResetSignal((n) => n + 1);

    localStorage.removeItem("sort");
    localStorage.removeItem("search");
  };

  return (
    <div className="w-full min-h-screen pt-6">
      <FiberNavBTN />

      <div className="flex flex-col md:flex-row md:items-center gap-4 md:justify-between mb-6">
        <Navigation t2="Indices & Charts" />

        <input
          className="border border-gray-300 max-w-62.5 bg-white text-gray-600 font-semibold px-10 py-2 rounded-full text-center cursor-not-allowed"
          type="text"
          disabled
          placeholder="Upload Indices & Charts Offers"
        />
      </div>

      <div className="grid md:grid-cols-[2fr_1fr] flex-col gap-4 md:items-center md:justify-between mb-6">
        <SearchInput resetSignal={resetSignal} onSearch={search} />

        <div className="flex flex-row gap-10 justify-between">
          <Reset onReset={handlereset} />
          <Sort sorted={sortt} setSorted={setSort} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {indices.map((item) => (
          <div
            key={item.id}
            className="relative bg-white shadow rounded-md h-64 flex items-center justify-center group overflow-hidden"
          >
            <Image
              width={500}
              height={500}
              src={item.img || "/images/company-logo.png"}
              alt=""
              className="object-contain max-h-full"
            />

            <div className="absolute inset-0 bg-black/0 group-hover:bg-[#142C6C]/60 transition flex items-start justify-center pt-6">
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="
                ease-in-out
            opacity-0 
            translate-y-1
            group-hover:opacity-100 
            group-hover:translate-y-20 
            transition-all 
            duration-300 
            border-2 border-white
            text-white 
            px-4 py-2 
            rounded-md 
            font-semibold
          "
              >
                See Details
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";

import Sort from "../sort";
import Reset from "../reset";
import Image from "next/image";
import SearchInput from "../search";
import Navigation from "../navigation";
import { useEffect, useState } from "react";
import FiberTopButton from "../fiberTopButton";
import { useData } from "../../../context/DataContext";

export default function IndicesCharts() {
  const [search, setSearch] = useState("");
  const { posts, getAllPosts } = useData();
  const [sorted, setSorted] = useState("new");

  const getSortedPost = [...posts].sort((a, b) => {
    return sorted === "new"
      ? new Date(a.created_at) - new Date(b.created_at)
      : new Date(b.created_at) - new Date(a.created_at);
  });

  useEffect(() => {
    const mode = "index-chart";
    const filter = {
      select: "",
      search: "",
      filter: "status=1",
      expand: "",
      orderby: "id desc",
      top: 12,
      skip: 0,
    };
    getAllPosts(mode, filter);
  }, [getAllPosts]);

  return (
    <div className="w-full bg-gray-100 min-h-screen px-6 pt-6">
      <FiberTopButton />

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
        <SearchInput />

        <div className="flex flex-row gap-10 justify-between">
          <Reset />
          <Sort sorted={sorted} setSorted={setSorted} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {getSortedPost.map((item) => (
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

            <p>{item.id}</p>
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

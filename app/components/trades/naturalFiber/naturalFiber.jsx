"use client";

import Sort from "../../sort";
import Reset from "../../reset";
import SearchInput from "../../search";
import { FaAngleUp } from "react-icons/fa6";
import { FaAngleDown } from "react-icons/fa6";
import FiberNavBTN from "../fiber/fiberNavBTN";
import CategoryDropdown from "./categoryDropDown";
import React, { useEffect, useState } from "react";
import FiberMiddleBar from "../fiber/fiberMiddleBar";
import { useData } from "../../../../context/DataContext";
import ViewCard from "../manMadeFiber/viewCard";
 
const NaturalFiber = () => {
  const { getAllPosts } = useData();
  const [meta, setMeta] = useState(null);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("id desc");
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("");
  const [resetSignal, setResetSignal] = useState(0);
  const [naturalFiber, setNaturalFiber] = useState([]);

  const categories = ["Jute", "Flax", "Others"];
  useEffect(() => {
    const saveSort = localStorage.getItem("sort");
    const saveSearch = localStorage.getItem("search");
    const saveCategory = localStorage.getItem("category");

    if (saveSort) setSort(saveSort);
    if (saveSearch) setSearch(saveSearch);
    if (saveCategory) setCategory(saveCategory);
  }, []);

  useEffect(() => {
    localStorage.setItem("sort", sort);
    localStorage.setItem("search", search);
    localStorage.setItem("category", category);
  }, [sort, search, category]);

  useEffect(() => {
    let mounted = true;

    async function loadNaturalFiber() {
      setLoading(true);

      const filters = ["type=3", "status=1"];
      if (category) filters.push(`category='${category}'`);

      const result = await getAllPosts({
        type: "fiber",
        filter: filters.join(" AND "),
        search,
        top: 12,
        orderby: sort,
      });

      if (!mounted) return;

      if (!result.error) {
        setMeta(result?.data?.meta || null);
        setNaturalFiber(result?.data?.results || []);
      } else {
        setNaturalFiber([]);
        setMeta(null);
      }
      setLoading(false);
    }

    loadNaturalFiber();

    return () => {
      mounted = false;
    };
  }, [sort, search, category, getAllPosts]);

  const handleReset = () => {
    setSearch("");
    setCategory("");
    setSort("id desc");
    setResetSignal((n) => n + 1);

    localStorage.removeItem("search");
    localStorage.removeItem("category");
    localStorage.removeItem("sort");
  };

  return (
    <div className="relative">
      <div>
        <FiberNavBTN />
        <FiberMiddleBar />

        <div className="flex justify-between w-full pt-8 flex-wrap gap-4 items-center overflow-hidden">
          <div className="flex items-center gap-2 md:gap-6">
            <CategoryDropdown
              value={category}
              onChange={setCategory}
              options={categories}
            />
            <SearchInput resetSignal={resetSignal} onSearch={setSearch} />
          </div>

          <div className="flex gap-12 items-center">
            <Reset onReset={handleReset} />
            <Sort sorted={sort} setSorted={setSort} />
          </div>
        </div>
      </div>
      <div className="py-14">
        <ViewCard cardData={naturalFiber} />
      </div>
    </div>
  );
};

export default NaturalFiber;

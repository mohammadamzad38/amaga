"use client";

import Sort from "../../sort";
import Reset from "../../reset";
import SearchInput from "../../search";
import FiberNavBTN from "../fiber/fiberNavBTN";
import CategoryDropdown from "./categoryDropDown";
import React, { useEffect, useState } from "react";
import FiberMiddleBar from "../fiber/fiberMiddleBar";
import { useData } from "../../../../context/DataContext";
import ViewCard from "../manMadeFiber/viewCard";
import useLocalStorageState from "../../../../lib/storage";

const NaturalFiber = () => {
  const { getAllPosts } = useData();
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [resetSignal, setResetSignal] = useState(0);
  const [naturalFiber, setNaturalFiber] = useState([]);

  const [search, setSearch] = useLocalStorageState("natural_search", "");
  const [sort, setSort] = useLocalStorageState("natural_sort", "id desc");
  const [category, setCategory] = useLocalStorageState("natural_category", "");

  const categories = ["Jute", "Flax", "Others"];

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

"use client";

import Sort from "../../sort";
import Reset from "../../reset";
import SearchInput from "../../search";
import FiberNavBTN from "../fiber/fiberNavBTN";
import React, { useEffect, useState } from "react";
import FiberMiddleBar from "../fiber/fiberMiddleBar";
import { useData } from "../../../../context/DataContext";
import CategoryDropdown from "../naturalFiber/categoryDropDown";
import ViewCard from "./viewCard";
import useLocalStorageState from "../../../../lib/storage";

const categories = ["Polyester", "Viscose", "Rayon", "Others"];

const ManMadeFiber = () => {
  const { getAllPosts } = useData();
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [artificial, setArtificial] = useState([]);
  const [resetSignal, setResetSignal] = useState(0);

  const [search, setSearch] = useLocalStorageState("art_search", "");
  const [category, setCategory] = useLocalStorageState("art_category", "");
  const [sortt, setSort] = useLocalStorageState("art_sort", "id desc");

  useEffect(() => {
    let mounted = true;

    async function loadData() {
      setLoading(true);

      const filters = ["type=2", "status=1"];
      if (category) filters.push(`category='${category}'`);

      const result = await getAllPosts({
        type: "fiber",
        filter: filters.join(" AND "),
        top: 12,
        search,
        orderby: sortt,
      });
      if (!mounted) return;

      if (!result.error) {
        setMeta(result?.data?.meta || null);
        setArtificial(result?.data?.results || []);
      } else {
        setArtificial([]);
        setMeta(null);
      }
      setLoading(false);
    }
    loadData();
    return () => {
      mounted = false;
    };
  }, [sortt, getAllPosts, search, category]);

  const handleReset = () => {
    setSort("id desc");
    setSearch("");
    setCategory("");
    setResetSignal((n) => n + 1);
  };

  return (
    <div className=" relative">
      <div>
        <FiberNavBTN />
        <FiberMiddleBar />

        <div className="flex justify-between pt-8 flex-wrap gap-4 items-center overflow-hidden">
          <div className="flex items-center gap-2 md:gap-6">
            <CategoryDropdown
              value={category}
              options={categories}
              onChange={setCategory}
            />
            <SearchInput
              resetSignal={resetSignal}
              value={search}
              onSearch={setSearch}
            />
          </div>

          <div className="flex gap-12 items-center">
            <Reset onReset={handleReset} />
            <Sort sorted={sortt} setSorted={setSort} />
          </div>
        </div>
      </div>
      <div className="py-14">
        <ViewCard cardData={artificial} />
      </div>
    </div>
  );
};

export default ManMadeFiber;

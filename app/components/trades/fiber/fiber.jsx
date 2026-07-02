"use client";

import Sort from "../../sort";
import Reset from "../../reset";
import Search from "../../search";
import FiberNavBTN from "./fiberNavBTN";
import FiberTopBar from "./fiberMiddleBar";
import FiberCart from "../fiber/fiberCart";
import BuyerQuarry from "../../buyerQuarry";
import GradeDropdown from "../../gradeDropdown";
import StapleDropdown from "../../stapleDropdown";
import OriginDropdown from "../../originDropdown";
import React, { useEffect, useState } from "react";
import { useData } from "../../../../context/DataContext";

const Fiber = () => {
  const { getAllPosts } = useData();
  const [grade, setGrade] = useState("");
  const [meta, setMeta] = useState(null);
  const [staple, setStaple] = useState("");
  const [origin, setOrigin] = useState("");
  const [search, setSearch] = useState("");
  const [sortt, setSort] = useState("id desc");
  const [loading, setLoading] = useState(true);
  const [fiberData, setFiberData] = useState([]);
  const [resetSignal, setResetSignal] = useState(0);

  useEffect(() => {
    const savedSort = localStorage.getItem("sort");
    const savedGrade = localStorage.getItem("grade");
    const savedStaple = localStorage.getItem("staple");
    const savedOrigin = localStorage.getItem("origin");
    const savedSearch = localStorage.getItem("search");

    if (savedSort) setSort(savedSort);
    if (savedGrade) setGrade(savedGrade);
    if (savedStaple) setStaple(savedStaple);
    if (savedOrigin) setOrigin(savedOrigin);
    if (savedSearch) setSearch(savedSearch);
  }, []);

  useEffect(() => {
    localStorage.setItem("sort", sortt);
    localStorage.setItem("grade", grade);
    localStorage.setItem("staple", staple);
    localStorage.setItem("search", search);
    localStorage.setItem("origin", origin);
  }, [sortt, grade, staple, origin, search]);

  useEffect(() => {
    let mounted = true;

    async function loadFiberPost() {
      setLoading(true);

      const filters = ["type=1", "status=1"];

      if (grade) filters.push(`grade='${grade}'`);
      if (origin) filters.push(`origin='${origin}'`);
      if (staple) filters.push(`staple='${staple}'`);

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
        setFiberData(result?.data?.results || []);
      } else {
        setMeta(null);
        setFiberData([]);
      }

      setLoading(false);
    }

    loadFiberPost();

    return () => {
      mounted = false;
    };
  }, [origin, grade, staple, search, sortt, getAllPosts]);

  const handleReset = () => {
    setOrigin("");
    setGrade("");
    setSearch("");
    setStaple("");
    setSort("id desc");
    setResetSignal((n) => n + 1);

    localStorage.removeItem("origin");
    localStorage.removeItem("grade");
    localStorage.removeItem("staple");
    localStorage.removeItem("search");
    localStorage.removeItem("sort");
  };

  return (
    <div className="bg-[#ECECEC] pt-6">
      <div>
        <div className="grid md:grid-cols-[3fr_1fr] flex-col">
          <FiberNavBTN />
          <div>
            <BuyerQuarry query={{ type: "buyer-post/getByCategoryId/1" }} />
          </div>
        </div>

        <FiberTopBar />

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-4 lg:gap-10 pt-6">
          <div className="flex flex-row justify-around w-full gap-4">
            <OriginDropdown value={origin} onChange={setOrigin} />
            <GradeDropdown value={grade} onChange={setGrade} />
            <StapleDropdown value={staple} onChange={setStaple} />
          </div>

          <div className="flex flex-wrap gap-4 justify-around">
            <Search resetSignal={resetSignal} onSearch={setSearch} />
            <Reset onReset={handleReset} />
            <Sort sorted={sortt} setSorted={setSort} />
          </div>
        </div>
      </div>
      <div className="py-14">
        <FiberCart loading={loading} fiberData={fiberData} />
      </div>
    </div>
  );
};

export default Fiber;

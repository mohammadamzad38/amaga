"use client";

import Sort from "../../sort";
import Reset from "../../reset";
import Search from "../../search";
import FiberNavBTN from "./fiberNavBTN";
import FiberTopBar from "./fiberMiddleBar";
import FiberCart from "../fiber/fiberCart";
import BuyerQuarry from "../../buyerQuarry";
import GradeDropdown from "../../gradeDropdown";
import Pagination from "../../common/pagination";
import StapleDropdown from "../../stapleDropdown";
import OriginDropdown from "../../originDropdown";
import React, { useEffect, useState } from "react";
import { useData } from "../../../../context/DataContext";
import useLocalStorageState from "../../../../lib/storage";

const Fiber = () => {
  const { getAllPosts } = useData();
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fiberData, setFiberData] = useState([]);
  const [resetSignal, setResetSignal] = useState(0);

  const [grade, setGrade] = useLocalStorageState("fiber_grade", "");
  const [staple, setStaple] = useLocalStorageState("fiber_staple", "");
  const [origin, setOrigin] = useLocalStorageState("fiber_origin", "");
  const [search, setSearch] = useLocalStorageState("fiber_search", "");
  const [sortt, setSort] = useLocalStorageState("fiber_sort", "id desc");

  useEffect(() => {
    setPage(1);
  }, [search, origin, grade, staple, sortt]);

  useEffect(() => {
    let mounted = true;

    async function loadFiberPost() {
      setLoading(true);

      const filters = ["type=1", "status=1"];
      const limit = 12;
      const skip = (page - 1) * limit;

      if (grade) filters.push(`grade='${grade}'`);
      if (origin) filters.push(`origin='${origin}'`);
      if (staple) filters.push(`staple='${staple}'`);

      const result = await getAllPosts({
        skip,
        search,
        top: limit,
        type: "fiber",
        orderby: sortt,
        filter: filters.join(" AND "),
      });

      console.log("Current page:", page);
      console.log("Skip:", skip);

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
  }, [origin, grade, staple, search, sortt, getAllPosts, page]);

  const handleReset = () => {
    setGrade("");
    setOrigin("");
    setSearch("");
    setStaple("");
    setSort("id desc");

    setResetSignal((n) => n + 1);
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
        <Pagination meta={meta} onPageChange={setPage} />
      </div>
    </div>
  );
};

export default Fiber;

"use client";

import React, { useEffect, useState } from "react";
import Sort from "../../sort";
import Reset from "../../reset";
import Search from "../../search";
import FiberNavBTN from "../fiber/fiberNavBTN";
import ActionButton from "../../actionButton";
import OriginDropDown from "../../originDropdown";
import SupplyBTN from "./supplyBTN";
import { useData } from "../../../../context/DataContext";

const SupplyChain = () => {
  const { getAllPosts } = useData();
  const [tag, setTag] = useState("");
  const [meta, setMeta] = useState(null);
  const [origin, setOrigin] = useState("");
  const [search, setSearch] = useState("");
  const [sortt, setSort] = useState("id desc");
  const [loading, setLoading] = useState(true);
  const [supply, setSupply] = useState([]);
  const [resetSignal, setResetSignal] = useState(0);

  useEffect(() => {
    const savedSort = localStorage.getItem("sort");
    const savedOrigin = localStorage.getItem("origin");
    const savedSearch = localStorage.getItem("search");
    const savedtag = localStorage.getItem("tag");

    if (savedSort) setSort(savedSort);
    if (savedOrigin) setOrigin(savedOrigin);
    if (savedSearch) setSearch(savedSearch);
    if (savedtag) setTag(savedtag);
  }, []);

  useEffect(() => {
    localStorage.setItem("sort", sortt);
    localStorage.setItem("search", search);
    localStorage.setItem("origin", origin);
    localStorage.setItem("tag", tag);
  }, [sortt, origin, search, tag]);

  useEffect(() => {
    let mounted = true;

    async function loadSupply() {
      setLoading(true);

      const filters = ["status=1"];
      if (origin) filters.push(`origin='${origin}'`);

      const result = await getAllPosts({
        type: "supply-chain",
        search,
        orderby: sortt,
        top: 9,
        filter: filters.join(" AND "),
        tagId: tag,
      });

      if (!mounted) return;

      if (!result.error) {
        setMeta(result?.data?.meta || null);
        setSupply(result?.data?.results || []);
      } else {
        setMeta(null);
        setSupply([]);
      }

      setLoading(false);
    }

    loadSupply();

    return () => {
      mounted = false;
    };
  }, [sortt, tag, origin, search, getAllPosts]);

  const handleReset = () => {
    setOrigin("");
    setSearch("");
    setTag("");
    setSort("id desc");
    setResetSignal((n) => n + 1);

    localStorage.removeItem("origin");
    localStorage.removeItem("search");
    localStorage.removeItem("sort");
    localStorage.removeItem("tag");
  };

  console.log("this is supply", supply);

  return (
    <div>
      <div>
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center md:justify-between">
          <FiberNavBTN />
          <div className="w-[60%] md:w-auto mb-4 md:mb-0">
            <ActionButton href={""} label={"Upload to Supplier Directory"} />
          </div>
        </div>
        <SupplyBTN value={tag} onSelect={setTag} />
        <div className="border-b border-gray-400"></div>
        <div className="flex flex-wrap justify-around gap-4 mt-4">
          <OriginDropDown value={origin} onChange={setOrigin} />
          <Search resetSignal={resetSignal} onSearch={setSearch} />
          <Reset onReset={handleReset} />
          <Sort sorted={sortt} setSorted={setSort} />
        </div>
      </div>
    </div>
  );
};

export default SupplyChain;

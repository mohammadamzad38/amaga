"use client";

import React, { useEffect, useState } from "react";
import Sort from "../../sort";
import Reset from "../../reset";
import Search from "../../search";
import FiberNavBTN from "../fiber/fiberNavBTN";
import ActionButton from "../../actionButton";
import OriginDropDown from "../../originDropdown";
import SupplyCard from "./supplyCard";
import SupplyBTN from "./supplyBTN";
import { useData } from "../../../../context/DataContext";
import useLocalStorageState from "../../../../lib/storage";

const SupplyChain = () => {
  const { getAllPosts } = useData();
  const [meta, setMeta] = useState(null);
  const [supply, setSupply] = useState([]);
  const [loading, setLoading] = useState(true);
  const [resetSignal, setResetSignal] = useState(0);

  const [tag, setTag] = useLocalStorageState("tag_supply", "");
  const [origin, setOrigin] = useLocalStorageState("origin_supply", "");
  const [search, setSearch] = useLocalStorageState("search_supply", "");
  const [sortt, setSort] = useLocalStorageState("sort_supply", "id desc");

  useEffect(() => {
    let mounted = true;

    async function loadSupply() {
      setLoading(true);

      const filters = ["status=1"];
      if (origin) filters.push(`country='${origin}'`);

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
      <div className="py-10">
        <SupplyCard cardData={supply} />
      </div>
    </div>
  );
};

export default SupplyChain;

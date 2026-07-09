"use client";

import Sort from "../../sort";
import Reset from "../../reset";
import Search from "../../search";
import ShopCard from "./shopCard";
import ShopNavBTN from "../shopsNavBTN";
import Navigation from "../../navigation";
import ActionButton from "../../actionButton";
import OriginDropDown from "../../originDropdown";
import React, { useEffect, useState } from "react";
import { useData } from "../../../../context/DataContext";
import useLocalStorageState from "../../../../lib/storage";

const ShopLinks = () => {
  const { getAllPosts } = useData();

  const [meta, setMeta] = useState(null);
  const [shops, setShops] = useState([]);
  const [signal, setSignal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useLocalStorageState("shop_search", "");
  const [sort, setSort] = useLocalStorageState("shop_sort", "id desc");
  const [origin, setOrigin] = useLocalStorageState(
    "shop_origin",
    "United Kingdom",
  );

  useEffect(() => {
    let mounted = true;

    async function loadShops() {
      setLoading(true);

      const filters = ["status=1"];
      if (origin) filters.push(`country_of_origin='${origin}'`);

      const result = await getAllPosts({
        search,
        top: 12,
        orderby: sort,
        type: "shop-link",
        filter: filters.join(" AND "),
      });

      if (!mounted) return;

      if (!result.error) {
        setShops(result.data?.results || []);
        setMeta(result?.data?.meta || null);
      } else {
        setShops([]);
        setMeta(null);
      }

      setLoading(false);
    }

    loadShops();

    return () => {
      mounted = false;
    };
  }, [, sort, search, origin, getAllPosts]);

  const handleReset = () => {
    setSearch("");
    setOrigin("");
    setSort("id desc");

    setSignal((n) => n + 1);
  };

  return (
    <div>
      <div>
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center md:justify-between">
          <ShopNavBTN />
          <div className="w-[60%] md:w-auto mb-4 md:mb-0">
            <ActionButton href={""} label={"Upload Shop Link"} />
          </div>
        </div>
        <div className="border-b border-gray-400"></div>
        <div className="flex flex-wrap justify-around gap-4 mt-4 md:justify-between">
          <Navigation t2={"Shop Links"} />
          <Search resetSignal={signal} value={search} onSearch={setSearch} />
          <OriginDropDown value={origin} onChange={setOrigin} />
          <Reset onReset={handleReset} />
          <Sort sorted={sort} setSorted={setSort} />
        </div>
      </div>
      <div>
        <ShopCard shopData={shops} loading={loading} />
      </div>
    </div>
  );
};

export default ShopLinks;

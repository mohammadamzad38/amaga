"use client";

import React, { useEffect, useState } from "react";
import Sort from "../../sort";
import Reset from "../../reset";
import Search from "../../search";
import ShopNavBTN from "../shopsNavBTN";
import Navigation from "../../navigation";
import ActionButton from "../../actionButton";
import BuyerQuarry from "../../buyerQuarry";
import useLocalStorageState from "../../../../lib/storage";
import Category from "../category";
import { useData } from "../../../../context/DataContext";
import RetailCard from "./retailCard";

const Retail = () => {
  const { getAllPosts } = useData();

  const [meta, setMeta] = useState(null);
  const [signal, setSignal] = useState(0);
  const [loading, setLoading] = useState();
  const [retails, setRetails] = useState([]);

  const [search, setSearch] = useLocalStorageState("retail_search", "");
  const [sort, setSort] = useLocalStorageState("retail_sort", "id desc");
  const [category, setCategory] = useLocalStorageState("retail_category", []);

  useEffect(() => {
    let mounted = true;

    async function loadLogistics() {
      setLoading(true);

      const filters = ["status=1"];
      if (category.length > 0) {
        filters.push(
          `category IN(${category.map((item) => `'${item}'`).join(", ")})`,
        );
      }

      const result = await getAllPosts({
        type: "mall-product",
        top: 12,
        search,
        orderby: sort,
        filter: filters.join(" AND "),
      });

      if (!mounted) return;

      if (!result.error) {
        setRetails(result.data?.results || []);
        setMeta(result?.data?.meta || null);
      } else {
        setRetails([]);
        setMeta(null);
      }

      setLoading(false);
    }

    loadLogistics();

    return () => {
      mounted = false;
    };
  }, [search, category, sort, getAllPosts]);

  const handleReset = () => {
    setSearch("");
    setCategory([]);
    setSort("id desc");

    setSignal((n) => n + 1);
  };
  return (
    <>
      <div>
        <div className="py-2">
          <BuyerQuarry query={{ type: "buyer-post/getByCategoryId/4" }} />
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center md:justify-between">
          <ShopNavBTN />
          <div className="w-[60%] md:w-auto mb-4 md:mb-0">
            <ActionButton href={""} label={"Upload Retail Offers"} />
          </div>
        </div>
        <div>
          <Category category={category} setCategory={setCategory} />
        </div>
        <div className="flex flex-wrap justify-around gap-4 mt-4 md:justify-between">
          <Navigation t2={"Online Mall"} />
          <Search resetSignal={signal} value={search} onSearch={setSearch} />
          <Reset onReset={handleReset} />
          <Sort sorted={sort} setSorted={setSort} />
        </div>
      </div>
      <div className="py-10">
        <RetailCard data={retails} loading={loading} />
      </div>
    </>
  );
};

export default Retail;

"use client";

import Sort from "../../sort";
import Reset from "../../reset";
import Search from "../../search";
import BulkCard from "./bulkCard";
import Category from "../category";
import ShopNavBTN from "../shopsNavBTN";
import Navigation from "../../navigation";
import ActionButton from "../../actionButton";
import React, { useEffect, useState } from "react";
import { useData } from "../../../../context/DataContext";
import useLocalStorageState from "../../../../lib/storage";

const Retail = () => {
  const { getAllPosts } = useData();

  const [meta, setMeta] = useState(null);
  const [signal, setSignal] = useState(0);
  const [loading, setLoading] = useState();
  const [bulkOrders, setbulkOrders] = useState([]);

  const [search, setSearch] = useLocalStorageState("bulk_search", "");
  const [sort, setSort] = useLocalStorageState("bulk_sort", "id desc");
  const [category, setCategory] = useLocalStorageState("bulk_category", []);

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
        setbulkOrders(result.data?.results || []);
        setMeta(result?.data?.meta || null);
      } else {
        setbulkOrders([]);
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
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center md:justify-between">
          <ShopNavBTN />
          <div className="w-[60%] md:w-auto mb-4 md:mb-0">
            <ActionButton href={""} label={"Upload Bulk Orders Offers"} />
          </div>
        </div>
        <div>
          <Category setCategory={setCategory} category={category} />
        </div>
        <div className="flex flex-wrap justify-around md:justify-between gap-4 mt-4">
          <Navigation t2={"Bulk Orders"} />
          <Search resetSignal={signal} value={search} onSearch={setSearch} />
          <Reset onReset={handleReset} />
          <Sort sorted={sort} setSorted={setSort} />
        </div>
      </div>
      <div className="py-10">
        <BulkCard data={bulkOrders} loading={loading} />
      </div>
    </>
  );
};

export default Retail;

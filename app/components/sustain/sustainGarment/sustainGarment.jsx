"use client";

import Sort from "../../sort";
import Reset from "../../reset";
import Search from "../../search";
import Navigation from "../../navigation";
import React, { useEffect, useState } from "react";
import { useData } from "../../../../context/DataContext";
import useLocalStorageState from "../../../../lib/storage";
import GarmentsCard from "../../trades/garments/garmentCard";

const SustainGarments = () => {
  const { getAllPosts } = useData();
  const [meta, setMeta] = useState(null);
  const [signal, setSignal] = useState(0);
  const [garments, setgarments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useLocalStorageState("search_bci", "");
  const [orderby, setOrderby] = useLocalStorageState("bci_sort", "id desc");
  const [categories, setcategories] = useState("bci_garmcategory", "Pre-owned");

  useEffect(() => {
    let mounted = true;

    async function loadGarments() {
      setLoading(true);

      const filters = ["status=1", "category IN('Pre-owned')"];

      const result = await getAllPosts({
        type: "garment",
        top: 9,
        search,
        orderby,
        filter: filters.join(" AND "),
      });

      if (!mounted) return;

      if (!result.error) {
        setgarments(result.data?.results || []);
        setMeta(result?.data?.meta || null);
      } else {
        setgarments([]);
        setMeta(null);
      }

      setLoading(false);
    }

    loadGarments();

    return () => {
      mounted = false;
    };
  }, [search, orderby, getAllPosts]);

  const handleReset = () => {
    setSearch("");
    setOrderby("id desc");

    setSignal((n) => n + 1);
  };

  return (
    <div className="bg-[#ECECEC] ">
      <div>
        <Navigation t2={"garments"} />

        <div className="flex flex-wrap gap-4 justify-between  mt-4">
          <Search resetSignal={signal} onSearch={setSearch} />
          <Reset onReset={handleReset} />
          <Sort sorted={orderby} setSorted={setOrderby} />
        </div>
      </div>
      <div className="py-10">
        <GarmentsCard
          data={garments}
          loading={loading}
          className={"xl:grid-cols-4"}
        />
      </div>
    </div>
  );
};

export default SustainGarments;

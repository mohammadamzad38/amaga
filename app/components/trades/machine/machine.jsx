"use client";

import Sort from "../../sort";
import Reset from "../../reset";
import Search from "../../search";
import MachineCard from "./machineCard";
import QueryBuyer from "../buy/queryByer";
import Navigation from "../../navigation";
import PriceFilter from "../../priceFilter";
import ActionButton from "../../actionButton";
import React, { useEffect, useState } from "react";
import useLocalStorageState from "../../../../lib/storage";
import { useData } from "../../../../context/DataContext";

const categoriesList = [
  "Ginnery Machines",
  "Lubricants",
  "Bearing",
  "Belts",
  "Adhesives",
  "Machine Parts",
  "Chemicals",
  "Machinery",
  "Textile Wax",
  "Dyes & Chemicals",
  "Others",
];

const Machine = () => {
  const { getAllPosts } = useData();
  const [meta, setMeta] = useState(null);
  const [buyers, setBuyers] = useState([]);
  const [machine, setMachine] = useState([]);
  const [loading, setLoading] = useState(true);
  const [resetSignal, setResetSignal] = useState(0);

  const [category, setCategory] = useLocalStorageState("machine_category", []);
  const [search, setSearch] = useLocalStorageState("machine_search", "");
  const [orderby, setOrderby] = useLocalStorageState(
    "machine_orderby",
    "id desc",
  );

  const handleCategory = (item) => {
    if (category.includes(item)) {
      setCategory(category.filter((i) => i !== item));
    } else {
      setCategory([...category, item]);
    }
  };

  useEffect(() => {
    let mounted = true;

    async function loadBuyerPosts() {
      setLoading(true);

      const result = await getAllPosts({
        type: "buyer-post/getByCategoryId/2",
      });

      if (!mounted) return;

      if (!result.error) {
        setBuyers(result.data?.results?.data || []);
        setMeta(result?.data?.meta || null);
      } else {
        setBuyers([]);
        setMeta(null);
      }

      setLoading(false);
    }

    loadBuyerPosts();

    return () => {
      mounted = false;
    };
  }, [getAllPosts]);

  useEffect(() => {
    let mounted = true;

    async function loadMachine() {
      setLoading(true);

      let apiOrderby = orderby;
      const filters = ["status=1"];

      if (orderby === "negotiable") {
        filters.push("negotiable=1");
        apiOrderby = "id desc";
      }

      if (category.length > 0)
        filters.push(
          `category IN(${category.map((item) => `'${item}'`).join(", ")})`,
        );

      const result = await getAllPosts({
        top: 9,
        search,
        type: "machine",
        orderby: apiOrderby,
        filter: filters.join(" AND "),
      });

      if (!mounted) return;

      if (!result.error) {
        setMeta(result?.data?.meta || null);
        setMachine(result?.data?.results || []);
      } else {
        setMeta(null);
        setMachine([]);
      }
      setLoading(false);
    }

    loadMachine();

    return () => {
      mounted = false;
    };
  }, [orderby, search, category, getAllPosts]);

  const handleReset = () => {
    setSearch("");
    setCategory([]);
    setOrderby("id desc");

    setResetSignal((n) => n + 1);
  };

  return (
    <div className=" bg-[#ECECEC] ">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-6 h-auto">
        <div>
          <div className="bg-white p-4">
            <h2 className="text-sm font-semibold mb-3">CATEGORIES</h2>

            <div className="space-y-2 max-h-50 overflow-y-auto">
              {categoriesList.map((item) => (
                <label
                  key={item}
                  className="flex items-center max-w-lg gap-2 text-xs cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={category.includes(item)}
                    onChange={() => handleCategory(item)}
                    className="accent-green-500 w- h-4"
                  />
                  {item}
                </label>
              ))}
            </div>
          </div>

          <PriceFilter value={orderby} onChange={setOrderby} />
          <div className="bg-white mt-4 space-y-4">
            <p className="text-sm md:text-xl text-center font-bold pt-4 md:pt-6">
              Buyers Enquiry Preview
            </p>

            <QueryBuyer value={buyers} />
          </div>
        </div>

        <div>
          <div className="flex flex-col">
            <div className="flex flex-col md:flex-row gap-4 justify-between w-full">
              <Navigation t2="Machinery" />

              <div className="flex items-center gap-4">
                <ActionButton
                  label="Edit as a Supplier"
                  href="/trade/upload/supplier"
                />
                <ActionButton
                  label="Upload Machinery Offers"
                  href="/trade/upload/machinery"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-4 justify-center md:justify-between mt-8 items-center">
              <Search resetSignal={resetSignal} onSearch={setSearch} />

              <div className="flex items-center gap-10 md:gap-4">
                <Reset onReset={handleReset} />
                <Sort sorted={orderby} setSorted={setOrderby} />
              </div>
            </div>
          </div>

          <div className="py-10">
            <MachineCard data={machine} loading={loading} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Machine;

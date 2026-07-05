"use client";

import Sort from "../../sort";
import Reset from "../../reset";
import Search from "../../search";
import Navigation from "../../navigation";
import React, { useEffect, useState } from "react";
import PriceFilter from "../../priceFilter";
import ActionButton from "../../actionButton";
import OriginDropdown from "../../originDropdown";
import QueryBuyer from "../buy/queryByer";
import { useData } from "../../../../context/DataContext";
import useLocalStorageState from "../../../../lib/storage";
import FabricCard from "./fabricCard";

const categoriesList = [
  "Cotton",
  "Polyester",
  "Millange",
  "Viscose",
  "Leather",
  "Rayon",
  "Others",
];

const Fabric = () => {
  const { getAllPosts } = useData();
  const [buyer, setBuyer] = useState([]);
  const [meta, setMeta] = useState(null);
  const [fabrics, setfabrics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [resetSignal, setResetSignal] = useState(0);

  const [orderby, setOrderby] = useLocalStorageState("id desc", []);
  const [search, setSearch] = useLocalStorageState("fabric_search", []);
  const [origin, setOrigin] = useLocalStorageState("fabric_origin", []);
  const [category, setCategory] = useLocalStorageState("fabric_category", []);

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
        type: "buyer-post/getByCategoryId/6",
      });

      if (!mounted) return;

      if (!result.error) {
        setBuyer(result.data?.results?.data || []);
      } else {
        setBuyer([]);
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

    async function loadFabric() {
      setLoading(true);

      const filters = ["status=1"];

      let apiOrders = orderby;

      if (orderby === "negotiable") {
        filters.push("negotiable=1");
        apiOrders = "id desc";
      }

      if (category.length > 0) {
        filters.push(
          `category IN(${category.map((item) => `'${item}'`).join(", ")})`,
        );
      }

      const result = await getAllPosts({
        top: 9,
        origin,
        search,
        type: "textile",
        orderby: apiOrders,
        filter: filters.join(" AND "),
      });

      if (!mounted) return;

      if (!result.error) {
        setfabrics(result.data?.results || []);
        setMeta(result?.data?.meta || null);
      } else {
        setfabrics([]);
        setMeta(null);
      }

      setLoading(false);
    }
    loadFabric();

    return () => {
      mounted = false;
    };
  }, [search, orderby, origin, category, getAllPosts]);

  const handleReset = () => {
    setOrigin("");
    setSearch("");
    setCategory([]);
    setOrderby("id desc");

    setResetSignal((n) => n + 1);
  };

  return (
    <div className="">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-6 h-auto">
        <div>
          <div className="bg-white p-4">
            <h2 className="text-sm font-semibold mb-3">CATEGORIES</h2>

            <div className="space-y-2 max-h-50 overflow-y-auto">
              {categoriesList.map((item) => (
                <label
                  key={item}
                  className="flex items-center max-w-lg gap-2 text-sm cursor-pointer"
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

          <div className=" mt-4 ">
            <p className="text-sm pb-4 bg-white md:text-xl text-center font-bold pt-4 md:pt-6">
              Buyers Enquiry Preview
            </p>

            <QueryBuyer value={buyer} />
          </div>
        </div>

        <div>
          <div>
            <div className="flex flex-col lg:flex-row justify-between gap-6 md:gap-14">
              <div className="flex justify-between gap-10">
                <Navigation t2={"Fabric"} />
                <OriginDropdown />
              </div>
              <div className="flex justify-between md:justify-end lg:justify-between gap-4">
                <ActionButton label={"Register as a Supplier"} href={""} />
                <ActionButton label={"Edit as a Supplier"} href={""} />
                <ActionButton label={"Upload Fabric Offers"} href={""} />
              </div>
            </div>
            <div className="flex flex-wrap gap-4 justify-between  mt-4">
              <Search
                resetSignal={resetSignal}
                value={search}
                onSearch={setSearch}
              />
              <Reset onReset={handleReset} />
              <Sort sorted={orderby} setSorted={setOrderby} />
            </div>
          </div>
          <div className="py-8">
            <FabricCard data={fabrics} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fabric;

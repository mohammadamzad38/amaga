"use client";

import Sort from "../../sort";
import Reset from "../../reset";
import Search from "../../search";
import React, { useEffect, useState } from "react";
import Navigation from "../../navigation";
import PriceFilter from "../../priceFilter";
import ActionButton from "../../actionButton";
import { useData } from "../../../../context/DataContext";
import QueryBuyer from "../buy/queryByer";
import useLocalStorageState from "../../../../lib/storage";
import GarmentsCard from "./garmentCard";

const categoriesList = [
  "Outwear",
  "Pants/Botoms",
  "Fabric",
  "Basic Knit",
  "Undergarment",
  "Design Story/Concept",
  "Headwear",
  "T-shirt",
  "Pre-owned",
  "Others",
];

const Garments = () => {
  const { getAllPosts } = useData();
  const [meta, setMeta] = useState(null);
  const [gByers, setGbyers] = useState([]);
  const [signal, setSignal] = useState(0);
  const [garments, setgarments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setcategories] = useLocalStorageState("garm_category", []);
  const [search, setSearch] = useLocalStorageState("search_garment", "");
  const [orderby, setOrderby] = useLocalStorageState("germ_sort", "id desc");

  useEffect(() => {
    let mounted = true;

    async function loadBuyerPosts() {
      setLoading(true);

      const result = await getAllPosts({
        type: "buyer-post/getByCategoryId/5",
      });

      if (!mounted) return;

      if (!result.error) {
        setGbyers(result.data?.results?.data || []);
      } else {
        setGbyers([]);
      }

      setLoading(false);
    }

    loadBuyerPosts();

    return () => {
      mounted = false;
    };
  }, [getAllPosts]);

  const handleCategory = (item) => {
    if (categories.includes(item)) {
      setcategories(categories.filter((i) => i !== item));
    } else {
      setcategories([...categories, item]);
    }
  };

  useEffect(() => {
    let mounted = true;

    async function loadGarments() {
      setLoading(true);

      let apiOrder = orderby;

      const filters = ["status=1"];

      if (orderby === "negotiable") {
        filters.push("negotiable=1");
        apiOrder = "id desc";
      }

      if (categories.length > 0) {
        filters.push(
          `category IN(${categories.map((item) => `'${item}'`).join(", ")})`,
        );
      }

      const result = await getAllPosts({
        type: "garment",
        top: 9,
        search,
        orderby: apiOrder,
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
  }, [search, categories, orderby, getAllPosts]);

  const handleReset = () => {
    setSearch("");
    setcategories([]);
    setOrderby("id desc");

    setSignal((n) => n + 1);
  };

  return (
    <div className="bg-[#ECECEC] ">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-6 h-auto">
        <div>
          <div className="bg-white p-4">
            <h2 className="text-sm font-semibold mb-3">CATEGORIES</h2>

            <div className="space-y-2 max-h-50 overflow-y-auto">
              {categoriesList.map((item) => (
                <label
                  key={item}
                  className="flex items-center  max-w-lg gap-2 text-sm cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={categories.includes(item)}
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
            <QueryBuyer value={gByers} />
          </div>
        </div>

        <div>
          <div>
            <div className="flex flex-col lg:flex-row justify-between gap-6 md:gap-14">
              <Navigation t2={"garments"} />

              <div className="flex justify-between md:justify-end lg:justify-between gap-4">
                <ActionButton label={"Register as a Supplier"} href={""} />
                <ActionButton label={"Edit as a Supplier"} href={""} />
                <ActionButton label={"Upload Garments Offers"} href={""} />
              </div>
            </div>
            <div className="flex flex-wrap gap-4 justify-between  mt-4">
              <Search resetSignal={signal} onSearch={setSearch} />
              <Reset onReset={handleReset} />
              <Sort sorted={orderby} setSorted={setOrderby} />
            </div>
          </div>
          <div className="my-10">
            <GarmentsCard data={garments} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Garments;

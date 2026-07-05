"use client";

import Sort from "../../sort";
import Reset from "../../reset";
import Search from "../../search";
import React, { useEffect, useState } from "react";
import Navigation from "../../navigation";
import ActionButton from "../../actionButton";
import useLocalStorageState from "../../../../lib/storage";
import { useData } from "../../../../context/DataContext";
import DesignCard from "./designCard";

const categoriesList = [
  { label: "Fabric Cutting Pattern", value: 59 },
  { label: "Knit Print Design", value: 60 },
  { label: "Woven Print Design", value: 61 },
  { label: "Fashion", value: 62 },
  { label: "Children", value: 63 },
  { label: "Ladies", value: 64 },
  { label: "Men", value: 65 },
  { label: "Sports", value: 66 },
  { label: "Undergarment", value: 67 },
  { label: "Traditional", value: 68 },
  { label: "Accounting", value: 69 },
  { label: "Garments", value: 70 },
  { label: "Embroidery Design", value: 71 },
  { label: "T-shirt Prints", value: 72 },
  { label: "Others", value: 73 },
];

const Design = () => {
  const { getAllPosts } = useData();

  const [meta, setMeta] = useState(null);
  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useLocalStorageState("design_sort", "id desc");
  const [search, setSearch] = useLocalStorageState("design_search", "");
  const [category, setCategory] = useLocalStorageState("design_category", []);

  const handleCategory = (value) => {
    if (category.includes(value)) {
      setCategory(category.filter((i) => i !== value));
    } else {
      setCategory([...category, value]);
    }
  };

  useEffect(() => {
    let mounted = true;

    async function loadDesign() {
      setLoading(true);

      const filters = ["portfolio_type=1", "status=1"];

      const result = await getAllPosts({
        search,
        top: 9,
        orderby: sort,
        type: "portfolio",
        filter: filters.join(" AND "),
        tagIds: category,
      });

      if (!mounted) return;

      if (!result.error) {
        setDesigns(result.data?.results || []);
        setMeta(result?.data?.meta || null);
      } else {
        setDesigns([]);
        setMeta(null);
      }

      setLoading(false);
    }
    loadDesign();

    return () => {
      mounted = false;
    };
  }, [sort, category, search, getAllPosts]);

  const handleReset = () => {
    setSearch("");
    setCategory([]);
    setSort("id desc");
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
                  key={item.value}
                  className="flex items-center max-w-lg gap-2 text-xs cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={category.includes(item.value)}
                    onChange={() => handleCategory(item.value)}
                    className="accent-green-500 w- h-4"
                  />
                  {item.label}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div>
            <div className="flex flex-col lg:flex-row justify-between gap-6 md:gap-14">
              <div className="flex justify-between gap-10">
                <Navigation t2={"Design"} />
              </div>
              <div className="flex justify-between md:justify-end lg:justify-between gap-4">
                <ActionButton label={"Upload Desing Offers"} href={""} />
              </div>
            </div>
            <div className="flex flex-wrap gap-4 justify-between  mt-4">
              <Search value={search} onSearch={setSearch} />
              <Reset onReset={handleReset} />
              <Sort sorted={sort} setSorted={setSort} />
            </div>
          </div>
          <div className="py-10">
            <DesignCard data={designs} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Design;

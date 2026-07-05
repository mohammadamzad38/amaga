"use client";

import Sort from "../../sort";
import Reset from "../../reset";
import Search from "../../search";
import Navigation from "../../navigation";
import React, { useEffect, useState } from "react";
import ActionButton from "../../actionButton";
import useLocalStorageState from "../../../../lib/storage";
import { useData } from "../../../../context/DataContext";
import DesignCard from "../designer/designCard";

const categoriesList = [
  { label: "Knowledge", value: 37 },
  { label: "Machinery", value: 38 },
  { label: "Software", value: 40 },
  { label: "Electronics", value: 39 },
  { label: "Design", value: 41 },
  { label: "Processing", value: 42 },
  { label: "Woven Textile", value: 46 },
  { label: "Knit Textile", value: 43 },
  { label: "Cut & Saw", value: 44 },
  { label: "Chemical", value: 45 },
  { label: "Accounting", value: 47 },
  { label: "Traditional", value: 48 },
  { label: "Sustainable", value: 49 },
  { label: "Garments", value: 82 },
  { label: "Marketing", value: 50 },
  { label: "Sales", value: 51 },
  { label: "Logistics", value: 52 },
  { label: "Warehousing", value: 53 },
  { label: "Security", value: 54 },
  { label: "Purchasing", value: 55 },
  { label: "Sourcing", value: 56 },
  { label: "Fiber", value: 57 },
  { label: "Others", value: 58 },
];

const Consultant = () => {
  const { getAllPosts } = useData();
  const [meta, setMeta] = useState();
  const [consultants, setConsultants] = useState([]);
  const [loading, setLaoding] = useState();
  const [search, setSearch] = useLocalStorageState("consult_search", "");
  const [sort, setSort] = useLocalStorageState("consult_sort", "id desc");
  const [categories, setcategories] = useLocalStorageState(
    "consult_category",
    [],
  );

  const handleCategory = (value) => {
    if (categories.includes(value)) {
      setcategories(categories.filter((i) => i !== value));
    } else {
      setcategories([...categories, value]);
    }
  };

  useEffect(() => {
    let mounted = true;

    async function loadConsult() {
      setLaoding(true);

      const result = await getAllPosts({
        search,
        orderby: sort,
        tagIds: categories,
        type: "portfolio",
        filter: "portfolio_type=2 and status=1",
      });

      if (!mounted) return;

      if (!result.error) {
        setConsultants(result.data?.results || []);
        setMeta(result?.data?.meta || null);
      } else {
        setConsultants([]);
        setMeta(null);
      }

      setLaoding(false);
    }

    loadConsult();

    return () => {
      mounted = false;
    };
  }, [sort, search, categories, getAllPosts]);

  const handleReset = () => {
    setSort("id desc");
    setSearch("");
    setcategories("");
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
                  key={item.value}
                  className="flex items-center max-w-lg gap-2 text-sm cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={categories.includes(item.value)}
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
              <div className="flex gap-4 md:justify-between w-full">
                <Navigation t2={"Consultant"} />
                <ActionButton label={"Upload Consultant Offers"} href={""} />
              </div>
            </div>
            <div className="flex flex-wrap gap-4 justify-between  mt-4">
              <Search onSearch={setSearch} value={search} />
              <Reset onReset={handleReset} />
              <Sort sorted={sort} setSorted={setSort} />
            </div>
          </div>
          <div className="py-10">
            <DesignCard data={consultants} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Consultant;

"use client";
import React, { useEffect, useState } from "react";
import Sort from "../../sort";
import Image from "next/image";
import Reset from "../../reset";
import Search from "../../search";
import Navigation from "../../navigation";
import ActionButton from "../../actionButton";
import OriginDropdown from "../../originDropdown";
import { useData } from "../../../../context/DataContext";
import useLocalStorageState from "../../../../lib/storage";
import ImageTT from "../../../../public/images/company-logo.png";

const Logistic = () => {
  const { getAllPosts } = useData();
  const [meta, setMeta] = useState(null);
  const [signal, setSignal] = useState(0);
  const [loading, setLoading] = useState();

  const [logistics, setLogistics] = useState([]);
  const [search, setSearch] = useLocalStorageState("logi_search", "");
  const [sort, setSort] = useLocalStorageState("logi_sort", "id desc");
  const [origin, setOrigin] = useLocalStorageState("logis_origin", "");

  useEffect(() => {
    let mounted = true;

    async function loadLogistics() {
      setLoading(true);

      const filters = ["status=1"];
      if (origin) filters.push(`country_of_origin='${origin}'`);

      const result = await getAllPosts({
        top: 12,
        search,
        orderby: sort,
        type: "logistic",
        filter: filters.join(" AND "),
      });

      if (!mounted) return;

      if (!result.error) {
        setLogistics(result.data?.results || []);
        setMeta(result?.data?.meta || null);
      } else {
        setLogistics([]);
        setMeta(null);
      }

      setLoading(false);
    }

    loadLogistics();

    return () => {
      mounted = false;
    };
  }, [origin, search, sort, getAllPosts]);

  const handleReset = () => {
    setSearch("");
    setOrigin("");
    setSort("id desc");
    setSignal((n) => n + 1);
  };
  return (
    <div>
      <div>
        <div className="flex justify-between">
          <Navigation t2={"Logistic"} />

          <ActionButton label={"Upload Logistic Offers"} href={""} />
        </div>
        <div className="flex flex-wrap items-center gap-4 justify-between  mt-4">
          <Search resetSignal={signal} value={search} onSearch={setSearch} />

          <OriginDropdown value={origin} onChange={setOrigin} />
          <Reset onReset={handleReset} />
          <Sort sorted={sort} setSorted={setSort} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 py-10 lg:grid-cols-4 gap-6">
        {loading ? (
          <div className="col-span-full flex justify-center items-center py-20">
            <p className="text-lg font-medium text-gray-500">Loading ......</p>
          </div>
        ) : logistics.length > 0 ? (
          logistics.map((item) => (
            <div
              key={item.id}
              className="relative bg-white shadow rounded-md h-64 flex items-center justify-center group overflow-hidden"
            >
              <Image
                width={500}
                height={500}
                src={item.img || ImageTT}
                alt=""
                className="object-contain max-h-full"
              />

              <div className="absolute inset-0 bg-black/0 group-hover:bg-[#142C6C]/60 transition flex items-start justify-center pt-6">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-20 transition-all duration-300 border-2 border-white text-white px-4 py-2 rounded-md font-semibold"
                >
                  See Details
                </a>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full flex justify-center items-center py-20">
            <p className="text-gray-500">No logistics found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Logistic;

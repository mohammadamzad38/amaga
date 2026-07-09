"use client";

import Sort from "../../sort";
import Reset from "../../reset";
import Search from "../../search";
import React, { useEffect, useState } from "react";
import Navigation from "../../navigation";
import ActionButton from "../../actionButton";
import useLocalStorageState from "../../../../lib/storage";
import { useData } from "../../../../context/DataContext";
import ContentType from "../../trades/knowledge/contentType";
import KnowledgeCard from "../../trades/knowledge/knowledgeCard";

const MarketKnowledge = () => {
  const { getAllPosts } = useData();

  const [meta, setMeta] = useState(null);
  const [knowledge, setKnowledge] = useState([]);
  const [loading, setLoading] = useState(true);
  const [contentType, setContentType] = useLocalStorageState(
    "knowledge_content",
    "",
  );
  const [recomend, setRecomend] = useLocalStorageState("knowledge_recom", "");
  const [sort, setSort] = useLocalStorageState("knowledge_sort", "id desc");
  const [search, setSearch] = useLocalStorageState("knowledge_search", "");
  const [category, setCategory] = useLocalStorageState(
    "knowledge_category",
    [],
  );

  useEffect(() => {
    let mounted = true;

    async function loadDesign() {
      setLoading(true);

      const filters = ["status=1"];
      if (recomend) filters.push(recomend);
      if (contentType) filters.push(`type=${contentType}`);

      const result = await getAllPosts({
        search,
        top: 9,
        orderby: sort,
        type: "market-knowledge",
        filter: filters.join(" AND "),
      });

      if (!mounted) return;

      if (!result.error) {
        setKnowledge(result.data?.results || []);
        setMeta(result?.data?.meta || null);
      } else {
        setKnowledge([]);
        setMeta(null);
      }

      setLoading(false);
    }
    loadDesign();

    return () => {
      mounted = false;
    };
  }, [sort, recomend, contentType, search, getAllPosts]);

  const handleReset = () => {
    setSearch("");
    setCategory([]);
    setRecomend("");
    setContentType("");
    setSort("id desc");
  };
  return (
    <div className=" bg-[#ECECEC] ">
      <div className="grid grid-cols-1 h-auto">
        <div>
          <div>
            <div className="flex flex-col lg:flex-row justify-between items-center gap-6 md:gap-14">
              <div className="flex justify-between gap-10">
                <Navigation t2={"Market knowledge"} />
              </div>
              <div className="flex justify-between md:justify-end lg:justify-between gap-4">
                <ActionButton label={"Upload"} href={""} />
              </div>
            </div>
            <div className="flex flex-wrap gap-4 justify-between items-center mt-4">
              <Search value={search} onSearch={setSearch} />
              <Reset onReset={handleReset} />
              <div>
                <select
                  value={recomend}
                  onChange={(e) => setRecomend(e.target.value)}
                  className="w-30 rounded-lg border border-gray-300 bg-white px-4 py-2 text-xs focus:outline-none"
                >
                  <option value="">All</option>
                  <option value="recommended=1">Recommended</option>
                </select>
              </div>
              <div>
                <ContentType
                  contentType={contentType}
                  setContentType={setContentType}
                />
              </div>

              <Sort sorted={sort} setSorted={setSort} />
            </div>
          </div>
          <div className="py-10">
            <KnowledgeCard
              data={knowledge}
              loading={loading}
              className={"lg:grid-cols-4"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketKnowledge;

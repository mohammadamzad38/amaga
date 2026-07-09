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
import PrimaryBTN from "../button/primaryBTN";

const MarketKnowledge = () => {
  const { getAllPosts } = useData();

  const [meta, setMeta] = useState(null);
  const [knowledge, setKnowledge] = useState([]);
  const [loading, setLoading] = useState(true);
  const [contentType, setContentType] = useLocalStorageState("bci_content", "");
  const [recomend, setRecomend] = useLocalStorageState("bci_recom", "");
  const [sort, setSort] = useLocalStorageState("bci_sort", "id desc");
  const [search, setSearch] = useLocalStorageState("bci_search", "");

  useEffect(() => {
    let mounted = true;

    async function loadDesign() {
      setLoading(true);

      const category = ["19", "29"];
      const filters = ["status=1"];
      if (recomend) filters.push(recomend);
      if (contentType) filters.push(`type=${contentType}`);

      const result = await getAllPosts({
        search,
        top: 12,
        orderby: sort,
        type: "market-knowledge",
        filter: filters.join(" AND "),
        tagIds: category,
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
    setRecomend("");
    setContentType("");
    setSort("id desc");
  };

  return (
    <div className=" bg-[#ECECEC] ">
      <div className="grid grid-cols-1 h-auto">
        <div>
          <div>
            <div>
              <div className="flex justify-between items-center w-full gap-10">
                <PrimaryBTN />
                <div>
                  <ActionButton label={"Upload"} href={""} />
                </div>
              </div>
              <div>
                <Navigation t2={"Market knowledge"} />
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

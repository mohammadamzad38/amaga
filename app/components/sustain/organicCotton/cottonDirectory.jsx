"use client";

import Sort from "../../sort";
import Reset from "../../reset";
import SearchInput from "../../search";
import Navigation from "../../navigation";
import { useEffect, useState } from "react";
import ActionButton from "../../actionButton";
import SecondaryBTN from "../button/secondaryBTN";
import OriginDropdown from "../../originDropdown";
import { useData } from "../../../../context/DataContext";
import useLocalStorageState from "../../../../lib/storage";
import SupplyCard from "../../trades/supplyChain/supplyCard";

const CottonDirectory = () => {
  const { getAllPosts } = useData();
  const [meta, setMeta] = useState(null);
  const [supplyCotton, setSupplyCotton] = useState([]);
  const [loading, setLoading] = useState(true);
  const [resetSignal, setResetSignal] = useState(0);
  const [origin, setOrigin] = useLocalStorageState("origin_cotSuply", "");
  const [search, setSearch] = useLocalStorageState("search_cotSuply", "");
  const [sortt, setSort] = useLocalStorageState("sort_cotSuply", "id desc");

  useEffect(() => {
    let mounted = true;

    async function loadSupply() {
      setLoading(true);

      const filters = ["status=1"];
      if (origin) filters.push(`country='${origin}'`);

      const result = await getAllPosts({
        type: "supply-chain",
        search,
        top: 9,
        tagId: 13,
        orderby: sortt,
        filter: filters.join(" AND "),
      });

      if (!mounted) return;

      if (!result.error) {
        setMeta(result?.data?.meta || null);
        setSupplyCotton(result?.data?.results || []);
      } else {
        setMeta(null);
        setSupplyCotton([]);
      }

      setLoading(false);
    }

    loadSupply();

    return () => {
      mounted = false;
    };
  }, [sortt, origin, search, getAllPosts]);

  const handleReset = () => {
    setOrigin("");
    setSearch("");
    setSort("id desc");

    setResetSignal((n) => n + 1);
  };

  return (
    <div>
      <div>
        <div className="flex justify-between w-full items-center">
          <SecondaryBTN />
          <ActionButton href={""} label={"Upload to Supplier Directory"} />
        </div>
        <Navigation t2={"Directory"} />
        <div className="flex flex-wrap justify-around gap-4 mt-4">
          <OriginDropdown value={origin} onChange={setOrigin} />
          <SearchInput
            resetSignal={resetSignal}
            value={search}
            onSearch={setSearch}
          />
          <Reset onReset={handleReset} />
          <Sort sorted={sortt} setSorted={setSort} />
        </div>
      </div>
      <div className="py-10">
        <SupplyCard cardData={supplyCotton} loading={loading} />
      </div>
    </div>
  );
};

export default CottonDirectory;

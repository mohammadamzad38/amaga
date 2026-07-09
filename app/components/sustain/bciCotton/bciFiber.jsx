"use client";

import Reset from "../../reset";
import SearchInput from "../../search";
import Origin from "../../originDropdown";
import { useEffect, useState } from "react";
import FiberCart from "../../trades/fiber/fiberCart";
import { useData } from "../../../../context/DataContext";
import useLocalStorageState from "../../../../lib/storage";
import PrimaryBTN from "../button/primaryBTN";
import Navigation from "../../navigation";

const BciFiber = () => {
  const { getAllPosts } = useData();
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fiberBci, setFiberBci] = useState([]);
  const [resetSignal, setResetSignal] = useState(0);

  const [origin, setOrigin] = useLocalStorageState("bci_origin", "");
  const [search, setSearch] = useLocalStorageState("bci_search", "");

  useEffect(() => {
    let mounted = true;

    async function loadFiberPost() {
      setLoading(true);

      const filters = ["type=1", "status=1", "grade='BCI'"];

      if (origin) filters.push(`origin='${origin}'`);

      const result = await getAllPosts({
        search,
        top: 12,
        type: "fiber",
        filter: filters.join(" AND "),
      });

      if (!mounted) return;

      if (!result.error) {
        setMeta(result?.data?.meta || null);
        setFiberBci(result?.data?.results || []);
      } else {
        setMeta(null);
        setFiberBci([]);
      }

      setLoading(false);
    }

    loadFiberPost();

    return () => {
      mounted = false;
    };
  }, [origin, search, , getAllPosts]);

  const handleReset = () => {
    setOrigin("");
    setSearch("");

    setResetSignal((n) => n + 1);
  };

  return (
    <div className="bg-[#ECECEC] pt-6">
      <div className="mb-4">
        <PrimaryBTN />
        <Navigation t2={"BCI Cotton"} />
      </div>

      <div className="flex flex-wrap gap-4 justify-around">
        <SearchInput resetSignal={resetSignal} onSearch={setSearch} />
        <Origin value={origin} onChange={setOrigin} />
        <Reset onReset={handleReset} />
      </div>
      <div className="py-14">
        <FiberCart loading={loading} fiberData={fiberBci} />
      </div>
    </div>
  );
};

export default BciFiber;

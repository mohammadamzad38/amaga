"use client";

import Sort from "../../sort";
import Reset from "../../reset";
import Search from "../../search";
import YarnCard from "./yarnCard";
import YarnFilter from "./yarnFilter";
import QueryBuyer from "../buy/queryByer";
import Navigation from "../../navigation";
import ActionButton from "../../actionButton";
import OriginDropDown from "../../originDropdown";
import React, { useEffect, useState } from "react";
import { useData } from "../../../../context/DataContext";
import useLocalStorageState from "../../../../lib/storage";

const Yarn = () => {
  const { getAllPosts } = useData();
  const [yarn, setYarn] = useState([]);
  const [meta, setMeta] = useState(null);
  const [buyer, setBuyer] = useState([]);
  const [loading, setLoading] = useState(true);
  const [resetSignal, setResetSignal] = useState(0);

  const [fiber, setFiber] = useLocalStorageState("yarn_fiber", []);
  const [origin, setOrigin] = useLocalStorageState("yarn_origin", "");
  const [search, setSearch] = useLocalStorageState("yarn_search", []);
  const [quality, setQuality] = useLocalStorageState("yarn_quality", []);
  const [yarnCount, setYarnCount] = useLocalStorageState("yarn_count", []);
  const [speciality, setSpeciality] = useLocalStorageState("yarn_spac", []);
  const [orderby, setOrderby] = useLocalStorageState("yarn_orderby", "id desc");

  useEffect(() => {
    let mounted = true;

    async function loadBuyerPosts() {
      setLoading(true);

      const result = await getAllPosts({
        type: "buyer-post/getByCategoryId/3",
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

    async function loadYarn() {
      setLoading(true);

      const filters = ["status=1"];

      let apiOrder = orderby;

      if (orderby === "negotiable") {
        filters.push("negotiable=1");
        apiOrder = "id desc";
      }

      if (fiber.length > 0) {
        filters.push(
          `fiber IN(${fiber.map((item) => `'${item}'`).join(", ")})`,
        );
      }

      if (quality.length > 0) {
        filters.push(
          `quality IN(${quality.map((item) => `'${item}'`).join(", ")})`,
        );
      }

      if (yarnCount.length > 0) {
        filters.push(
          `yarn_count IN(${yarnCount.map((item) => `'${item}'`).join(", ")})`,
        );
      }

      if (speciality.length > 0) {
        filters.push(
          `specialty_yarns IN(${speciality.map((item) => `'${item}'`).join(", ")})`,
        );
      }

      if (origin) {
        filters.push(`origin='${origin}'`);
      }

      const result = await getAllPosts({
        type: "yarn",
        search,
        filter: filters.join(" AND "),
        top: 9,
        orderby: apiOrder,
      });

      if (!mounted) return;

      if (!result.error) {
        setYarn(result.data?.results || []);
        setMeta(result?.data?.meta || null);
      } else {
        setYarn([]);
        setMeta(null);
      }

      setLoading(false);
    }

    loadYarn();

    return () => {
      mounted = false;
    };
  }, [
    speciality,
    yarnCount,
    quality,
    fiber,
    orderby,
    search,
    origin,
    getAllPosts,
  ]);

  const handleReset = () => {
    setFiber("");
    setSearch("");
    setOrigin("");
    setQuality("");
    setYarnCount("");
    setSpeciality("");
    setOrderby("id desc");

    setResetSignal((n) => n + 1);
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-10">
        <div>
          <YarnFilter
            fiber={fiber}
            setFiber={setFiber}
            quality={quality}
            setQuality={setQuality}
            yarnCount={yarnCount}
            setYarnCount={setYarnCount}
            speciality={speciality}
            setSpeciality={setSpeciality}
            priceValue={orderby}
            onPricevalue={setOrderby}
          />
          <div className="bg-white mt-4 space-y-4">
            <p className="text-sm md:text-xl text-center font-bold pt-4 md:pt-6">
              Buyers Enquiry Preview
            </p>

            <QueryBuyer value={buyer} />
          </div>
        </div>

        <div>
          <div>
            <div className="flex flex-col lg:flex-row justify-between gap-6 md:gap-14">
              <div className="flex justify-between gap-10">
                <Navigation t2={"Yarn"} />
                <OriginDropDown value={origin} onChange={setOrigin} />
              </div>
              <div className="flex justify-between md:justify-end lg:justify-between gap-4">
                <ActionButton label={"Edit as a Supplier"} href={""} />
                <ActionButton label={"Upload yarn offers"} href={""} />
              </div>
            </div>
            <div className="flex flex-wrap gap-4 justify-between  mt-4">
              <Search resetSignal={resetSignal} onSearch={setSearch} />
              <Reset onReset={handleReset} />
              <Sort sorted={orderby} setSorted={setOrderby} />
            </div>
          </div>
          <div className="py-8">
            <YarnCard data={yarn} loading={loading} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Yarn;

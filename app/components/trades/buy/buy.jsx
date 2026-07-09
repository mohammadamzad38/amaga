"use client";

import Image from "next/image";
import Reset from "../../reset";
import Search from "../../search";
import { useEffect, useState } from "react";
import ActionButton from "../../actionButton";
import { useData } from "../../../../context/DataContext";
import useLocalStorageState from "../../../../lib/storage";
import SocialShare from "../../../home/socialShare/socialShare";

export default function Buy() {
  const { getAllPosts } = useData();

  const [meta, setMeta] = useState(null);
  const [signal, setSignal] = useState(0);
  const [buyers, setBuyers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useLocalStorageState("buyer_search", "");

  useEffect(() => {
    let mounted = true;

    async function loadBuyer() {
      setLoading(true);
      const result = await getAllPosts({
        search,
        top: 9,
        skip: 1,
        category: 0,
        orderby: "desc",
        type: "buyer-post/test/too",
      });

      if (!mounted) return;

      if (!result.error) {
        setBuyers(result.data?.results?.data || []);
        setMeta(result?.data?.meta || null);
      } else {
        setBuyers([]);
        setMeta(null);
      }

      setLoading(false);
    }

    loadBuyer();

    return () => {
      mounted = false;
    };
  }, [search, getAllPosts]);

  const handleReset = () => {
    setSearch("");

    setSignal((n) => n + 1);
  };

  return (
    <div>
      <h2 className="text-xl font-bold pb-8 md:pb-14">BUY ENQUIRY</h2>
      <div className="flex justify-between">
        <h2 className="flex gap-4 border-b-2 border-b-[#1DBF74] w-20 pl-2 font-semibold">
          ACTIVE <h3 className="text-[#1DBF74]">({buyers.length})</h3>
        </h2>
        <div className="mb-2">
          <ActionButton label={"Upload Buy"} href={""} />
        </div>
      </div>
      <div className="border-t border-gray-500 mb-10"></div>
      <div className="flex flex-col md:flex-row gap-5 justify-between pb-10">
        <h2 className="font-semibold">BUYER REQUESTS</h2>

        <div className="flex justify-between gap-6">
          <Search resetSignal={signal} value={search} onSearch={setSearch} />
          <Reset onReset={handleReset} />
        </div>
      </div>

      {loading ? (
        <div className="col-span-full flex justify-center items-center py-20">
          <p className="text-lg font-medium text-gray-500">Loading ......</p>
        </div>
      ) : (
        <div className="space-y-4 pb-10">
          {buyers.map((buyer) => (
            <div key={buyer.id} className="bg-white rounded-xl p-6">
              <div className="grid flex-col md:grid-cols-[2fr_5fr_2fr_1fr] gap-6 items-start">
                <div className="flex justify-between gap-12">
                  <div className="font-bold space-y-2 md:w-30">
                    <h2 className="mb-4">Date</h2>
                    <h4 className="text-sm font-semibold">
                      {new Date(buyer.created_at).toLocaleDateString("en-GB")}
                    </h4>
                  </div>

                  <div className="md:w-50">
                    <h2 className="mb-4 font-bold">Buyer</h2>
                    <Image
                      src={"/images/profile.jpeg"}
                      alt={buyer.username}
                      width={50}
                      height={50}
                      className="w-12 h-12 object-cover border"
                    />
                    <h3 className="font-semibold mt-1 md:mt-3">
                      {buyer.username}
                    </h3>
                  </div>
                </div>

                <div className="flex justify-between ">
                  <div>
                    <h2 className="mb-4 font-bold">Request</h2>
                    <h3 className="text-sm">{buyer.description}</h3>

                    <button className="border cursor-pointer border-gray-200 mt-4 px-5 py-1 text-sm bg-white hover:bg-gray-50 transition">
                      {buyer.tags_name}
                    </button>
                  </div>

                  <div>
                    <h2 className="mb-4 font-bold">Category</h2>
                    <p>{buyer.category_name}</p>
                  </div>
                </div>

                <div className="flex justify-between ">
                  <div>
                    <h2 className="mb-4 font-bold">Country</h2>
                    <p className="font-semibold">{buyer.country}</p>
                  </div>
                  <div>
                    <h2 className="mb-4 font-bold">Target Price</h2>
                    <p className="font-semibold">{buyer.price}</p>
                  </div>
                </div>

                <div className="flex md:flex-col justify-around gap-4 items-start">
                  <h2 className="font-bold">Action</h2>
                  <button className="bg-green-500 cursor-pointer hover:bg-green-600 text-white px-6 py-1 rounded-sm text-sm transition">
                    Contact
                  </button>

                  <div className="border  border-[#1DBF74] px-4">
                    <SocialShare />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

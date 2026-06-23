"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import Review from "../../components/review";
import { IoChevronDown } from "react-icons/io5";
import { useData } from "@/context/DataContext";
import { useSearchParams } from "next/navigation";
import SocialShare from "../socialShare/socialShare";

const Post = ({ title, type = "fiber", mode = "recent" }) => {
  const [select, setSelect] = useState(type);
  const { posts, getAllPosts } = useData();
  const searchParams = useSearchParams();
  const q = searchParams.get("q");

  const baseUrl = typeof window !== "undefined" ? window.location.origin : "";

  useEffect(() => {
    if (q) {
      const filter = `ref_no='${q}'`;
      getAllPosts(select, mode, filter);
    } else {
      getAllPosts(select, mode);
    }
  }, [select, mode, q, getAllPosts]);

  return (
    <div className="pb-20 pt-12.5">
      <div className="flex items-center justify-between pb-7.5">
        <p className="text-[24px] font-bold">{title}</p>

        <div className="relative w-30 md:w-50">
          <select
            value={select}
            onChange={(e) => setSelect(e.target.value)}
            className="w-full appearance-none border text-sm md:text-base border-gray-400 px-4 py-2 rounded-lg outline-none bg-white"
          >
            <option value="fiber">Fiber</option>
            <option value="machine">Machinery</option>
            <option value="yarn">Yarn</option>
            <option value="textile">Fabric</option>
            <option value="buyer-post">Buy</option>
            <option value="portfolio">Designer</option>
            <option value="consultant">Consultant</option>
            <option value="job">Job</option>
            <option value="garment">Garment</option>
            <option value="market-knowledge">Knowledge</option>
            <option value="logistic">Logistic</option>
          </select>

          <IoChevronDown className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-500 pointer-events-none" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {posts?.map((data) => (
          <div
            key={data.id}
            className="w-full max-w-sm  flex flex-col bg-[#F6F6F6] shadow-xl px-3.75 py-6.25"
          >
            <div className="flex justify-between items-center">
              <div>
                <div className="flex items-center gap-3">
                  <Image
                    src={"/icon/vector.jpg"}
                    alt={data.name || "alt"}
                    width={45}
                    height={45}
                    className="rounded-full object-cover w-8 h-8 "
                  />
                  <Link
                    href=""
                    className="cursor-pointer font-bold text-sm line-clamp-1"
                  >
                    {data.name || "Supplier"}
                  </Link>
                </div>
                <p className="text-xs leading-none ml-11 text-gray-500">
                  {data.postHour}
                </p>
              </div>
              <div>
                <button className="px-4 cursor-pointer py-2 text-white text-xs font-semibold rounded-md bg-[#1DBF74] ">
                  Follow
                </button>
              </div>
            </div>

            <div className="w-full h-60 overflow-hidden rounded-xl mt-8">
              <Image
                src={"/icon/adminlogin-logo.png"}
                alt="product"
                width={500}
                height={300}
              />
            </div>

            <div className="space-y-2 text-sm md:text-base font-bold mt-3">
              <p className="line-clamp-2">Ref No: {data.ref_no}</p>
              <p className="line-clamp-1">Grade: {data.grade}</p>
              <p className="line-clamp-1">Staple: {data.staple}</p>
              <p className="line-clamp-1">Origin: {data.origin}</p>
              <p className="line-clamp-1">Mic: {data.mic}</p>
              <p className="line-clamp-1">GPT: {data.gpt}</p>
              <p className="line-clamp-1">Comment: {data.comment}</p>
            </div>

            <div className="flex items-center justify-between text-sm mt-3 mb-8">
              <Review />

              <SocialShare
                url={`${baseUrl}/trade/${select}?q=${data.ref_no}`}
              />
            </div>

            <div className="flex justify-center items-center">
              <button className="mt-auto w-50 cursor-pointer bg-[#1DBF74] text-white font-bold py-2 rounded-3xl hover:bg-green-600 transition">
                Contact Supplier
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Post;

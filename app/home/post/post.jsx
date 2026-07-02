"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { IoChevronDown } from "react-icons/io5";

import { useData } from "@/context/DataContext";
import Review from "../../components/review";
import SocialShare from "../socialShare/socialShare";

const Post = ({ title, query = {} }) => {
  const {
    type = "fiber",
    mode = "recent",
    top = 4,
    skip = 0,
    search = "",
    filter,
    expand = "",
    orderby = "id desc",
  } = query;

  const { getAllPosts } = useData();

  const searchParams = useSearchParams();
  const q = searchParams.get("q");

  const [select, setSelect] = useState(type);
  const [posts, setPosts] = useState([]);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(false);

  const baseUrl = typeof window !== "undefined" ? window.location.origin : "";

  useEffect(() => {
    setSelect(
      type === "portfolio" && mode === "consultant" ? "consultant" : type,
    );
  }, [type, mode]);

  useEffect(() => {
    let mounted = true;

    async function loadPosts() {
      setLoading(true);

      const apiType = select === "consultant" ? "portfolio" : select;

      const result = await getAllPosts({
        type: apiType,
        mode,
        top,
        skip,
        search,
        expand,
        orderby,

        ...(q
          ? {
              filter: `ref_no='${q}'`,
            }
          : select === "consultant"
            ? {
                filter: "portfolio_type=2",
              }
            : filter !== undefined
              ? {
                  filter,
                }
              : {}),
      });

      if (!mounted) return;

      if (!result.error) {
        setPosts(result.data?.results || []);
        setMeta(result.data?.meta || null);
      } else {
        setPosts([]);
        setMeta(null);
      }

      setLoading(false);
    }

    loadPosts();

    return () => {
      mounted = false;
    };
  }, [
    select,
    mode,
    top,
    skip,
    search,
    filter,
    expand,
    orderby,
    q,
    getAllPosts,
  ]);

  return (
    <div className="pb-20 pt-12.5">
      <div className="flex items-center justify-between pb-7.5">
        <p className="text-[24px] font-bold">{title}</p>

        <div className="relative w-30 md:w-50">
          <select
            value={select}
            onChange={(e) => setSelect(e.target.value)}
            className="w-full appearance-none rounded-lg border border-gray-400 bg-white px-4 py-2 text-sm outline-none md:text-base"
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

          <IoChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      {loading ? (
        <div className="py-20 text-center">Loading...</div>
      ) : posts.length === 0 ? (
        <div className="py-20 text-center">No Data Found</div>
      ) : (
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {posts.map((data) => (
            <div
              key={data.id}
              className="flex w-full max-w-sm flex-col bg-[#F6F6F6] px-3.75 py-6.25 shadow-xl"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <Image
                      src="/icon/vector.jpg"
                      alt={data.name || "Supplier"}
                      width={45}
                      height={45}
                      className="h-8 w-8 rounded-full object-cover"
                    />

                    <Link
                      href=""
                      className="line-clamp-1 cursor-pointer text-sm font-bold"
                    >
                      {data.name || "Supplier"}
                    </Link>
                  </div>

                  <p className="ml-11 text-xs leading-none text-gray-500">
                    {data.postHour}
                  </p>
                </div>

                <button className="rounded-md bg-[#1DBF74] px-4 py-2 text-xs font-semibold text-white">
                  Follow
                </button>
              </div>

              <div className="mt-8 h-60 overflow-hidden rounded-xl">
                <Image
                  src="/icon/adminlogin-logo.png"
                  alt="product"
                  width={500}
                  height={300}
                />
              </div>

              <div className="mt-3 space-y-2 text-sm font-bold md:text-base">
                <p className="line-clamp-2">Ref No: {data.ref_no}</p>
                <p className="line-clamp-1">Grade: {data.grade}</p>
                <p className="line-clamp-1">Staple: {data.staple}</p>
                <p className="line-clamp-1">Origin: {data.origin}</p>
                <p className="line-clamp-1">Mic: {data.mic}</p>
                <p className="line-clamp-1">GPT: {data.gpt}</p>
                <p className="line-clamp-1">Comment: {data.comment}</p>
              </div>

              <div className="mb-8 mt-3 flex items-center justify-between text-sm">
                <Review />

                <SocialShare
                  url={`${baseUrl}/trade/${
                    select === "consultant" ? "portfolio" : select
                  }?q=${data.ref_no}`}
                />
              </div>

              <div className="flex justify-center">
                <button className="mt-auto w-auto rounded-3xl bg-[#1DBF74] px-4 py-2 text-sm font-bold text-white transition hover:bg-green-600">
                  Contact Supplier
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Post;

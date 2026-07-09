import Image from "next/image";
import Link from "next/link";
import React from "react";
import Review from "../../review";
import SocialShare from "../../../home/socialShare/socialShare";

const KnowledgeCard = ({ data, loading, className }) => {
  const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
  return (
    <div>
      {loading ? (
        <div className="py-20 text-center">Loading...</div>
      ) : data.length === 0 ? (
        <div className="py-20 text-center">No Data Found</div>
      ) : (
        <div
          className={`grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 ${className}`}
        >
          {data.map((data) => (
            <div
              key={data.id}
              className="flex w-full max-w-sm flex-col h-80 bg-[#F6F6F6] px-3.75 py-4 rounded-md shadow-xl"
            >
              <div className="mb-4 min-h-35 overflow-hidden rounded-xl">
                <Image
                  src="/icon/adminlogin-logo.png"
                  alt="product"
                  width={500}
                  height={300}
                  className="w-full h-35 object-cover"
                />
              </div>
              <p className="line-clamp-3 font-semibold text-xs h-20">
                {data.title}
              </p>
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

                  <p className="ml-11 text-xs leading-6 text-gray-500">
                    {new Date(data.created_at).toLocaleDateString("en-GB")}
                  </p>
                </div>

                <div className="flex gap-2 items-center">
                  <button className="rounded-md text-[#1DBF74] px-4 py-1 text-xs font-semibold border">
                    Follow
                  </button>
                  <SocialShare />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default KnowledgeCard;

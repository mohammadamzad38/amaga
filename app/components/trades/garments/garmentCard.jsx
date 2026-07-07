import Image from "next/image";
import Link from "next/link";
import React from "react";
import Review from "../../review";
import SocialShare from "../../../home/socialShare/socialShare";

const GarmentsCard = ({ data, loading }) => {
  const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
  return (
    <div>
      {loading ? (
        <div className="py-20 text-center">Loading...</div>
      ) : data.length === 0 ? (
        <div className="py-20 text-center">No Data Found</div>
      ) : (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data.map((data) => (
            <div
              key={data.id}
              className="flex w-full max-w-sm flex-col bg-[#F6F6F6] rounded-sm px-3.75 py-4.25 shadow-xl"
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

                  <p className="ml-11 text-xs leading-none text-gray-500">1d</p>
                </div>

                <button className="rounded-full leading-0 px-4 text-[#1DBF74] py-3 text-xs font-semibold border">
                  Follow
                </button>
              </div>

              <div className="mt-4 h-35 overflow-hidden rounded-xl">
                <Image
                  src="/icon/adminlogin-logo.png"
                  alt="product"
                  width={500}
                  height={300}
                  className="w-full h-35 object-cover"
                />
              </div>

              <div className="mt-3 space-y-2 text-sm font-semibold ">
                <p className="line-clamp-3 leading-7 h-20 font-normal">
                  {data.description}{" "}
                </p>
                <p className="line-clamp-2 pt-2">Ref No: {data.ref_no}</p>
                <p className="line-clamp-1">Category: {data.category}</p>
                <p className="line-clamp-1 text-[#1DBF74]">
                  Price: {data.price}
                </p>
              </div>

              <div className="mb-5 mt-3 flex items-center justify-between text-sm">
                <Review />

                {/* <SocialShare
                  url={`${baseUrl}/trade/${
                    select === "consultant" ? "portfolio" : select
                  }?q=${data.ref_no}`}
                /> */}
              </div>

              <div className="flex justify-center">
                <button className="mt-auto w-auto rounded-3xl bg-[#1DBF74] px-4 py-2 cursor-pointer text-xs font-bold text-white transition hover:bg-green-600">
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

export default GarmentsCard;

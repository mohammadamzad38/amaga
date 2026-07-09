import Image from "next/image";
import Link from "next/link";
import React from "react";
import Review from "../../review";
import SocialShare from "../../../home/socialShare/socialShare";

const SupplyCard = ({ cardData, loading }) => {
  const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
  return (
    <div>
      {loading ? (
        <div className="py-20 text-center">Loading...</div>
      ) : cardData.length === 0 ? (
        <div className="py-20 text-center">No Data Found</div>
      ) : (
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {cardData.map((data) => (
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
                      className="line-clamp-1 text-[#1DBF74] hover:text-[#5B7EA6] cursor-pointer text-sm font-bold"
                    >
                      {"Directory"}
                    </Link>
                  </div>

                  <p className="ml-11 text-xs leading-none text-gray-500">
                    {new Date(data.created_at).toLocaleDateString("en-GB")}
                  </p>
                </div>
              </div>

              <div className="mt-3 space-y-2 text-xs font-semibold md:text-sm">
                <p className="line-clamp-2">
                  <span>Name:</span> {data.name}
                </p>
                <p className="line-clamp-2">
                  Company Name: {data.company_name}
                </p>
                <p className="line-clamp-2">Email: {data.email}</p>
                <p className="line-clamp-2">Phone: {data.phone}</p>
                <p className="line-clamp-2">Address: {data.address}</p>
                <p className="line-clamp-2">Country: {data.country}</p>
                <p className="line-clamp-2">Comment: {data.comments}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SupplyCard;

import Link from "next/link";
import Image from "next/image";
import React from "react";

const QueryBuyer = ({ value }) => {
  return (
    <div>
      {value.map((item, idx) => (
        <Link
          key={idx}
          href="/trade/buy"
          className="block shadow p-4 hover:shadow-lg transition h-full"
        >
          <div className="flex overflow-hidden gap-4">
            <div className="flex gap-2">
              <Image
                alt={item.username}
                width={50}
                height={50}
                src="/images/profile.jpeg"
                className="rounded-full h-10 w-10"
              />

              <div className="flex-1 text-xs">
                <p className="font-semibold line-clamp-1">{item.username}</p>

                <p className="text-gray-500">
                  {new Date(item.created_at).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>

            <div>
              <div className="flex text-[#1DBF74] gap-2 text-xs">
                <p>Target Price:</p>
                <p>{item.price}</p>
              </div>

              <div className="flex gap-2 text-xs">
                <p className="text-gray-500">Quantity:</p>
                <p>{item.quantity}</p>
              </div>
            </div>
          </div>

          <p className="mt-2 text-xs text-gray-600 line-clamp-2">
            {item.description}
          </p>
        </Link>
      ))}
    </div>
  );
};

export default QueryBuyer;

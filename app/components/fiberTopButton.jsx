"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

const FiberTopButton = () => {
  const pathname = usePathname();

  // normalize active state
  const isFiberActive =
    pathname === "/trade/fiber" || pathname.startsWith("/trade/fiber-");

  const isIndexActive = pathname === "/trade/index-and-chart";

  return (
    <div className="flex gap-6 items-center mb-6">
      <div className="flex gap-10">
        {/* FIBER BUTTON */}
        <Link
          href="/trade/fiber"
          className={`relative w-20 md:w-25 lg:w-26 h-20 md:h-25 lg:h-26 rounded-full border-4 border-white overflow-hidden group ${
            isFiberActive ? "bg-[#FFF685]" : "bg-white"
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center opacity-0"
            style={{
              backgroundImage: "url('/chain/background.png')",
            }}
          />

          <div className="absolute inset-0 bg-[#FFF685] opacity-0 group-hover:opacity-90 transition" />

          <span className="relative z-10 flex items-center justify-center h-full text-xs md:text-base font-bold">
            Fiber
          </span>
        </Link>

        {/* INDEX BUTTON */}
        <Link
          href="/trade/index-and-chart"
          className={`relative w-20 md:w-25 lg:w-26 h-20 md:h-25 lg:h-26 rounded-full border-4 border-white overflow-hidden group ${
            isIndexActive ? "bg-[#FFF685]" : "bg-white"
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center opacity-0"
            style={{
              backgroundImage: "url('/chain/background.png')",
            }}
          />

          <div className="absolute inset-0 bg-[#FFF685] opacity-0 group-hover:opacity-90 transition" />

          <span className="relative z-10 flex items-center justify-center h-full text-xs md:text-base font-bold text-center">
            Indices & Charts
          </span>
        </Link>
      </div>
    </div>
  );
};

export default FiberTopButton;

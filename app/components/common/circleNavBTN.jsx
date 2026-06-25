"use client";

import Link from "next/link";

const CircleNavButton = ({
  href,
  label,
  active = false,
  backgroundImage = "/chain/background.png",
}) => {
  return (
    <Link
      href={href}
      className={`relative w-20 md:w-25 lg:w-26 h-20 md:h-25 lg:h-26 rounded-full border-4 border-white overflow-hidden group ${
        active ? "bg-[#FFF685]" : "bg-white"
      }`}
    >
      <div
        className="absolute inset-0 bg-cover bg-center opacity-0 group-hover:opacity-100 transition"
        style={{
          backgroundImage: `url('${backgroundImage}')`,
        }}
      />

      <div className="absolute inset-0 bg-[#FFF685] opacity-0 group-hover:opacity-90 transition" />

      <span className="relative z-10 flex items-center justify-center h-full text-xs md:text-base font-bold text-center px-2">
        {label}
      </span>
    </Link>
  );
};

export default CircleNavButton;

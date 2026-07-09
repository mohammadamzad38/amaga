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
      className={`relative w-17 lg:w-20 h-17 lg:h-20 p-3 rounded-full border-4 border-white overflow-hidden group ${
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

      <span className="relative z-10 flex items-center justify-center h-full text-xs font-semibold md:font-bold text-center px-2">
        {label}
      </span>
    </Link>
  );
};

export default CircleNavButton;

"use client";

import Link from "next/link";

const CircleBTN = ({
  href,
  label,
  active = false,
  activeImage = "/images/active-sustain.png",
}) => {
  return (
    <Link
      href={href}
      className="relative w-17 lg:w-20 h-17 lg:h-20 p-3 rounded-full border-4 border-white overflow-hidden group bg-white"
    >
      <div
        className={`absolute inset-0 bg-cover bg-center transition-opacity ${
          active ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}
        style={{
          backgroundImage: `url('${activeImage}')`,
        }}
      />

      <span className="relative z-10 flex items-center justify-center h-full text-xs font-semibold md:font-bold text-center px-2">
        {label}
      </span>
    </Link>
  );
};

export default CircleBTN;

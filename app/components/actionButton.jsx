"use client";

import Link from "next/link";
import { FaLink } from "react-icons/fa6";

export default function ActionLink({ label, href }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 px-4 py-2 rounded-2xl text-[13px] font-semibold text-white bg-green-500 hover:bg-green-600 transition whitespace-nowrap"
    >
      <FaLink className="text-sm" />
      {label}
    </Link>
  );
}

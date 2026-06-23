import React from "react";
import Link from "next/link";
import { HiOutlineHome } from "react-icons/hi2";

const Navigation = ({ t2 }) => {
  return (
    <div className="flex items-center gap-2 text-sm ">
      <span>
        <HiOutlineHome size={25} />
      </span>
      <span>/</span>
      <Link href="/" className="font-bold">
        Home
      </Link>
      <span>/</span>
      <span className="font-semibold">{t2}</span>
    </div>
  );
};

export default Navigation;

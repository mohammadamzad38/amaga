"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const CategoryNav = () => {
  const pathName = usePathname();

  if (pathName === "/") return null;

  const links = [
    { label: "Fiber", value: "trade/fiber" },
    { label: "Machinery", value: "trade/machine" },
    { label: "Yarn", value: "trade/yarn" },
    { label: "Fabric", value: "trade/fabric" },
    { label: "Buy", value: "trade/buyer-post" },
    { label: "Designer", value: "trade/design" },
    { label: "Consultant", value: "trade/consultant" },
    { label: "Job", value: "trade/job" },
    { label: "Garment", value: "trade/garment" },
    { label: "Knowledge", value: "trade/market-knowledge" },
    { label: "Logistic", value: "trade/logistic" },
  ];

  return (
    <nav className="w-full flex flex-wrap md:flex-row gap-4 p-4 mt-1 bg-[#ECECEC]">
      {links.map((item, idx) => {
        const path = `/${item.value}`;
        const isActive = pathName?.startsWith(path);

        return (
          <Link
            key={idx}
            href={path}
            className={`text-sm lg:text-xl text-center cursor-pointer md:py-4 font-bold mx-auto transition-colors ${
              isActive
                ? "text-green-600 border-b-2"
                : "text-black hover:text-green-600"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
      <Link className="w-15 h-15" href={"/sustainable"}>
        <Image
          src="/images/grouplogo.png"
          alt="Sustainable"
          width={500}
          height={500}
        />
      </Link>
    </nav> 
  );
};

export default CategoryNav;

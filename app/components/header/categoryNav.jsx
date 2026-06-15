"use client";
import { useAuth } from "@/context/authContext";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const CategoryNav = () => {
  const { user } = useAuth();
  const router = useRouter();
  const pathName = usePathname();

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

  console.log(user);
  const handleClick = (path) => {
    if (!user?.token) {
      router?.push("/login");
      return;
    }

    router?.push(path);
  };

  return (
    <nav className="w-full flex gap-4 p-4 mt-1 bg-[#ECECEC]">
      {links.map((item, idx) => {
        const path = `/${item?.value}`;
        const isActive = pathName?.startsWith(path);

        return (
          <Link
            key={idx}
            role="button"
            href={path}
            onClick={handleClick}
            className={`text-xl text-center cursor-pointer leading-0 py-4 font-bold w-full mx-auto  transition-colors ${
              isActive
                ? "text-green-600 border-b-2"
                : "text-black hover:text-green-600"
            }`}
          >
            {item?.label}
          </Link>
        );
      })}
    </nav>
  );
};

export default CategoryNav;

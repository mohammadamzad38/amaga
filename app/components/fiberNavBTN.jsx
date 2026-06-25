"use client";

import { usePathname } from "next/navigation";
import CircleNavButton from "./common/circleNavBTN";

const FiberNavBTN = () => {
  const pathname = usePathname();

  const buttons = [
    {
      label: "Fiber",
      href: "/trade/fiber",
      active:
        pathname === "/trade/fiber" || pathname.startsWith("/trade/fiber-"),
    },
    {
      label: "Supply Directory",
      href: "/trade/supply-chain",
      active: pathname === "/trade/supply-chain",
    },
    {
      label: "Indices & Charts",
      href: "/trade/index-and-chart",
      active: pathname === "/trade/index-and-chart",
    },
  ];

  return (
    <div className="flex gap-6 items-center mb-6">
      <div className="flex gap-10">
        {buttons.map((button) => (
          <CircleNavButton
            key={button.href}
            href={button.href}
            label={button.label}
            active={button.active}
          />
        ))}
      </div>
    </div>
  );
};

export default FiberNavBTN;

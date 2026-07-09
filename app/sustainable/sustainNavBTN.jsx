"use client";

import { usePathname } from "next/navigation";
import CircleNavButton from "../components/common/circleNavBTN";

const SustainNavBTN = () => {
  const pathname = usePathname();

  const buttons = [
    {
      label: "BCI Cotton",
      href: "sustainable/bci-fiber",
      active: pathname === "sustainable/bci-fiber",
    },
    {
      label: "Organic Cotton",
      href: "sustainable/cotton-fiber",
      active: pathname === "sustainable/cotton-fiber",
    },
    {
      label: "Fairtade Cotton",
      href: "sustainable/fairtade-cotton",
      active: pathname === "sustainable/fairtade-cotton",
    },
    {
      label: "Pre Owned Garment",
      href: "sustainable/garments",
      active: pathname === "sustainable/garments",
    },
    {
      label: "Organic & Sustainable Garment",
      href: "sustainable/market-knowledge",
      active: pathname === "sustainable/market-knowledge",
    },
  ];

  return (
    <div className="flex gap-6 items-center mb-6">
      <div className="flex flex-wrap justify-center items-center w-full gap-10">
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

export default SustainNavBTN;

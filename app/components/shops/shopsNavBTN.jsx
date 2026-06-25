"use client";

import { usePathname } from "next/navigation";
import CircleNavButton from "../common/circleNavBTN";

const ShopNavBTN = () => {
  const pathname = usePathname();

  const buttons = [
    {
      label: "Shop",
      href: "/shop/shop-link",
      active: pathname === "/shop/shop-link",
    },
    {
      label: "Retail",
      href: "/shop/mall-product",
      active: pathname === "/shop/mall-product",
    },
    {
      label: "Bulk Order",
      href: "/shop/bulk-order",
      active: pathname === "/shop/bulk-order",
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

export default ShopNavBTN;

"use client";

import { usePathname } from "next/navigation";
import CircleBTN from "./circleBTN";

const SecondaryBTN = () => {
  const pathname = usePathname();

  const buttons = [
    {
      label: "Fiber",
      href: "cotton-fiber",
      active: pathname === "/sustainable/cotton-fiber",
    },
    {
      label: "Knowledge",
      href: "cotton-knowledge",
      active: pathname === "/sustainable/cotton-knowledge",
    },
    {
      label: "Directory",
      href: "cotton-directory",
      active: pathname === "/sustainable/cotton-directory",
    },
  ];

  return (
    <div className="flex gap-6 items-center mb-6">
      <div className="flex flex-wrap gap-10">
        {buttons.map((button) => (
          <CircleBTN
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

export default SecondaryBTN;

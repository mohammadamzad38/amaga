"use client";

import { usePathname } from "next/navigation";
import CircleBTN from "./circleBTN";

const PrimaryBTN = () => {
  const pathname = usePathname();

  const buttons = [
    {
      label: "Fiber",
      href: "bci-fiber",
      active: pathname === "/sustainable/bci-fiber",
    },
    {
      label: "Knowledge",
      href: "bci-knowledge",
      active: pathname === "/sustainable/bci-knowledge",
    },
    {
      label: "Directory",
      href: "bci-directory",
      active: pathname === "/sustainable/bci-directory",
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

export default PrimaryBTN;

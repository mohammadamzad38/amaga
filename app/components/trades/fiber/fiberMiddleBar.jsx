"use client";

import Link from "next/link";
import Navigation from "../../navigation";
import { usePathname } from "next/navigation";
import ActionButton from "../../actionButton";

export default function FiberMiddleBar() {
  const pathname = usePathname();

  return (
    <>
      <div className="flex items-center justify-between flex-wrap gap-4 mt-6">
        <div className="flex items-center gap-4 flex-wrap">
          <Navigation t2="Fiber" />

          <Link
            href="/trade/fiber"
            className={`border rounded-full px-3 py-1 font-semibold text-sm transition ${
              pathname === "/trade/fiber"
                ? "bg-[#1DBF74] text-white"
                : "text-[#1DBF74]"
            }`}
          >
            Cotton Fiber
          </Link>

          <Link
            href="/trade/fiber-natural"
            className={`border rounded-full px-3 py-1 font-semibold text-sm transition ${
              pathname === "/trade/fiber-natural"
                ? "bg-[#1DBF74] text-white"
                : "text-[#1DBF74]"
            }`}
          >
            Natural Fiber
          </Link>

          <Link
            href="/trade/fiber-man-made"
            className={`border rounded-full px-3 py-1 font-semibold text-sm transition ${
              pathname === "/trade/fiber-man-made"
                ? "bg-[#1DBF74] text-white"
                : "text-[#1DBF74]"
            }`}
          >
            Man-Made Fiber
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <ActionButton
            href="/trade/upload/supplier"
            label="Edit as a supplier"
          />
          <ActionButton
            href="/trade/upload/machinary"
            label="Upload Fiber Offers"
          />
        </div>
      </div>
    </>
  );
}

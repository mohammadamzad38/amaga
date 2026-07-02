"use client";

import { useState } from "react";

const SUPPLY_CHAIN_OPTIONS = [
  { value: 1, label: "Grower" },
  { value: 2, label: "Agent" },
  { value: 3, label: "Broker" },
  { value: 4, label: "Merchant" },
  { value: 5, label: "BCI" },
  { value: 6, label: "CMIA" },
  { value: 7, label: "Fairtrade" },
  { value: 8, label: "Ginner" },
  { value: 9, label: "Man-Made Fiber" },
  { value: 10, label: "Natural Fiber" },
  { value: 11, label: "Sustainable programs" },
  { value: 12, label: "Shipping & Logistics" },
  { value: 13, label: "Organic" },
  { value: 14, label: "Machine Supplies" },
  { value: 15, label: "Agricultural Supplies" },
  { value: 16, label: "Designers" },
  { value: 17, label: "Consultant" },
  { value: 18, label: "Garments" },
  { value: 19, label: "Spinners" },
  { value: 20, label: "Textile" },
  { value: 21, label: "Other" },
];

export default function SupplyBTN({ value, onSelect }) {
  const numericValue = value ? Number(value) : null;

  return (
    <div className="flex flex-wrap justify-center gap-6 p-6">
      {SUPPLY_CHAIN_OPTIONS.map((item) => {
        const isActive = numericValue === item.value;

        return (
          <button
            key={item.value}
            type="button"
            onClick={() => onSelect(item.value)}
            className="group cursor-pointer flex flex-col items-center gap-2"
          >
            <div
              className={`
    flex h-20 w-20 items-center border-4 border-white justify-center rounded-full
    bg-cover bg-center
    text-center shadow-md ring-1 ring-black/5
    ${isActive ? "ring-[#FFF685]" : ""}
  `}
              style={{
                backgroundImage: isActive
                  ? "linear-gradient(rgba(255,246,133,0.75), rgba(255,246,133,0.75)), url('/images/bg.png')"
                  : "url('/images/bg.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                border: "2px solid white",
              }}
            >
              <span
                className={`px-2 text-xs font-medium leading-tight ${
                  isActive ? "text-gray-900" : "text-gray-700"
                }`}
              >
                {item.label}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}

"use client";

import React from "react";

const options = [
  { label: "Price low to high", value: "low_to_high" },
  { label: "Price high to low", value: "high_to_low" },
  { label: "Price Negotiable", value: "negotiable" },
];

export default function PriceFilter({ value, onChange }) {
  return (
    <div className="bg-white p-4 ">
      <h2 className="text-sm font-semibold mb-3">Price Filter</h2>

      <div className="space-y-2">
        {options.map((item) => (
          <label
            key={item.value}
            className="flex items-center gap-2 cursor-pointer text-sm"
          >
            <input
              type="radio"
              name="priceFilter"
              value={item.value}
              checked={value === item.value}
              onChange={() => onChange(item.value)}
              className="w-4 h-4"
            />
            {item.label}
          </label>
        ))}
      </div>
    </div>
  );
}

"use client";

import { useEffect, useMemo, useState } from "react";
import { FaChevronDown, FaSearch } from "react-icons/fa";

export default function OriginDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState(value || "");
  const [options, setOptions] = useState([]);

  // Fetch countries
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch(
          "https://countriesnow.space/api/v0.1/countries/positions",
        );

        const json = await res.json();

        const countries =
          json?.data?.map((item) => item.name).filter(Boolean) || [];

        setOptions([...new Set(countries)].sort());
      } catch (err) {
        console.error("Failed to load countries", err);
      }
    };

    fetchCountries();
  }, []);

  // Filter logic
  const filtered = useMemo(() => {
    return options.filter((item) =>
      item.toLowerCase().includes(input.toLowerCase()),
    );
  }, [input, options]);

  const handleSelect = (item) => {
    onChange(item);
    setInput(item);
    setOpen(false);
  };

  return (
    <div className="flex flex-col gap-1 w-full max-w-30 relative">
      {/* INPUT */}
      <div className="relative">
        <input
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder="Origin"
          className="w-full border border-gray-300 rounded px-3 py-2 pr-10 text-sm outline-none"
        />

        {/* ICON */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
          {open ? <FaSearch size={14} /> : <FaChevronDown size={14} />}
        </div>
      </div>

      {/* DROPDOWN */}
      {open && (
        <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded shadow-md z-50 max-h-48 overflow-y-auto">
          {filtered.length > 0 ? (
            filtered.map((country) => (
              <div
                key={country}
                onClick={() => handleSelect(country)}
                className="px-3 py-2 text-xs cursor-pointer hover:bg-green-100"
              >
                {country}
              </div>
            ))
          ) : (
            <div className="px-3 py-2 text-xs text-gray-500">
              No results found
            </div>
          )}
        </div>
      )}

      {/* OUTSIDE CLICK */}
      {open && <div className="fixed inset-0" onClick={() => setOpen(false)} />}
    </div>
  );
}

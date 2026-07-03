"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { FaChevronDown, FaSearch } from "react-icons/fa";

export default function OriginDropdown({
  value = "",
  onChange,
  placeholder = "Origin",
}) {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [search, setSearch] = useState("");
  const [options, setOptions] = useState([]);

  const inputRef = useRef(null);

  // Load countries only once
  useEffect(() => {
    async function fetchCountries() {
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
    }

    fetchCountries();
  }, []);

  const filtered = useMemo(() => {
    if (!search.trim()) return options;

    return options.filter((country) =>
      country.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search, options]);

  const handleOpen = () => {
    setEditing(true);
    setSearch("");
    setOpen(true);

    requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
  };

  const handleSelect = (country) => {
    onChange?.(country);

    setOpen(false);
    setEditing(false);
    setSearch("");
  };

  return (
    <div className="relative w-full max-w-36">
      <div className="relative">
        <input
          ref={inputRef}
          value={editing ? search : value}
          readOnly={!editing}
          placeholder={placeholder}
          onClick={() => {
            if (!editing) handleOpen();
          }}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 pr-10 text-sm outline-none bg-white cursor-pointer"
        />

        <button
          type="button"
          onClick={() => {
            if (open) {
              setOpen(false);
              setEditing(false);
              setSearch("");
            } else {
              handleOpen();
            }
          }}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
        >
          {editing ? <FaSearch size={14} /> : <FaChevronDown size={14} />}
        </button>
      </div>

      {open && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => {
              setOpen(false);
              setEditing(false);
              setSearch("");
            }}
          />

          <div className="absolute left-0 top-full mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-50 max-h-56 overflow-y-auto">
            {filtered.length ? (
              filtered.map((country) => (
                <div
                  key={country}
                  onClick={() => handleSelect(country)}
                  className={`px-3 py-2 text-sm cursor-pointer hover:bg-green-100 ${
                    value === country ? "bg-green-100 font-semibold" : ""
                  }`}
                >
                  {country}
                </div>
              ))
            ) : (
              <div className="px-3 py-2 text-sm text-gray-500">
                No results found
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { PiMagnifyingGlassBold } from "react-icons/pi";

export default function SearchInput({
  onSearch,
  resetSignal,
  className = "",
  placeholder = "Search",
  value: externalValue = "",
}) {
  const [value, setValue] = useState(externalValue);

  useEffect(() => {
    setValue(externalValue);
  }, [externalValue]);

  useEffect(() => {
    if (resetSignal !== undefined) setValue("");
  }, [resetSignal]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch?.(value);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex items-stretch w-full max-w-xs h-10 bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm focus-within:border-gray-300 ${className}`}
    >
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className="flex-1 min-w-0 bg-transparent outline-none border-none px-4 text-sm text-gray-700 placeholder-gray-400"
      />
      <span className="w-px my-2 bg-gray-200" aria-hidden="true" />
      <button
        type="submit"
        aria-label="Submit search"
        className="w-12 flex items-center cursor-pointer justify-center text-gray-400 hover:text-gray-600 transition-colors"
      >
        <PiMagnifyingGlassBold size={18} />
      </button>
    </form>
  );
}

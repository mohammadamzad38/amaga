"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";

export default function CategoryDropdown({
  options,
  value,
  onChange,
  placeholder = "Category",
}) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(value || "");
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });
  const buttonRef = useRef(null);

  useEffect(() => {
    setSelected(value || "");
  }, [value]);

  useEffect(() => {
    if (open && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setCoords({
        top: rect.bottom + window.scrollY + 4, // 4px gap below button
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  }, [open]);

  // Reposition on scroll/resize while open
  useEffect(() => {
    if (!open) return;
    const updatePosition = () => {
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        setCoords({
          top: rect.bottom + window.scrollY + 4,
          left: rect.left + window.scrollX,
          width: rect.width,
        });
      }
    };
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);
    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [open]);

  const handleSelect = (item) => {
    onChange(item);
    setSelected(item);
    setOpen(false);
  };

  return (
    <div className="flex flex-col gap-1 w-full max-w-36 relative">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white flex items-center justify-between"
      >
        <span>{selected || placeholder}</span>
        {open ? <FaAngleUp size={14} /> : <FaAngleDown size={14} />}
      </button>

      {open &&
        createPortal(
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setOpen(false)}
            />
            <div
              style={{
                position: "absolute",
                top: coords.top,
                left: coords.left,
                width: coords.width,
              }}
              className="bg-white border border-gray-300 rounded shadow-md z-50 max-h-48 overflow-y-auto"
            >
              {options.map((item) => (
                <div
                  key={item}
                  onClick={() => handleSelect(item)}
                  className={`px-3 py-2 text-sm cursor-pointer hover:bg-green-100 ${
                    selected === item ? "bg-green-100 font-semibold" : ""
                  }`}
                >
                  {item}
                </div>
              ))}
            </div>
          </>,
          document.body,
        )}
    </div>
  );
}

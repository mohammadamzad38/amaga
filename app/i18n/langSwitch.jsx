"use client";

import { useEffect, useRef, useState } from "react";
import { IoChevronDown } from "react-icons/io5";
import translate from "./translate";
import LANGUAGES from "./languages";

export default function LanguageSwitcher() {
  const wrapperRef = useRef(null);

  const [open, setOpen] = useState(false);

  const [selected, setSelected] = useState(LANGUAGES[0]);

  useEffect(() => {
    const current = LANGUAGES.find((item) => item.code === translate.current());

    if (current) {
      setSelected(current);
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (!wrapperRef.current?.contains(event.target)) {
        setOpen(false);
      }
    }

    function handleEscape(event) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  async function handleSelect(language) {
    if (language.code === selected.code) {
      setOpen(false);
      return;
    }

    setSelected(language);
    setOpen(false);

    await translate.change(language.code);
  }

  return (
    <div ref={wrapperRef} className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm"
      >
        <img
          src={selected.flag}
          alt={selected.name}
          width={20}
          height={20}
          loading="lazy"
        />

        <span>{selected.name}</span>

        <IoChevronDown
          className={`transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 max-h-72 w-60 overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-xl">
          {LANGUAGES.filter((item) => item.code !== selected.code).map(
            (language) => (
              <button
                key={language.code}
                type="button"
                onClick={() => handleSelect(language)}
                className="flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-gray-100"
              >
                <img
                  src={language.flag}
                  alt={language.name}
                  width={20}
                  height={20}
                  loading="lazy"
                />

                <span>{language.name}</span>
              </button>
            ),
          )}
        </div>
      )}
    </div>
  );
}

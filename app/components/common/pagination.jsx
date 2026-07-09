"use client";

import React from "react";
import { GrFormNextLink } from "react-icons/gr";

const Pagination = ({ meta, onPageChange }) => {
  if (!meta || meta.pageCount <= 1) return null;

  const { currentPage, pageCount } = meta;

  const pages = [];

  if (pageCount <= 7) {
    for (let i = 1; i <= pageCount; i++) {
      pages.push(i);
    }
  } else {
    if (currentPage <= 4) {
      pages.push(1, 2, 3, 4, 5, "...", pageCount);
    } else if (currentPage >= pageCount - 3) {
      pages.push(
        1,
        "...",
        pageCount - 4,
        pageCount - 3,
        pageCount - 2,
        pageCount - 1,
        pageCount,
      );
    } else {
      pages.push(
        1,
        "...",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "...",
        pageCount,
      );
    }
  }

  return (
    <div className="flex justify-center items-center gap-2 mt-8 flex-wrap">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-2 mr-3 py-2 rounded-md border cursor-pointer font-bold hover:text-[#1DBF74] hover:border-[#1DBF74] text-xs disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100"
      >
        Previous
      </button>

      {pages.map((page, index) =>
        page === "..." ? (
          <span key={`ellipsis-${index}`} className="px-2">
            ...
          </span>
        ) : (
          <button
            key={`page-${page}`}
            onClick={() => onPageChange(page)}
            className={`w-auto p-2 cursor-pointer font-semibold hover:border-[#1DBF74] rounded-md border border-gray-300 text-xs transition ${
              page === currentPage
                ? "bg-[#1DBF74] border-[#1DBF74] text-white"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            {page}
          </button>
        ),
      )}

      <button
        disabled={currentPage === pageCount}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-2 flex gap-2 ml-3 items-center text-xs font-bold cursor-pointer hover:border-[#1DBF74] hover:text-[#1DBF74] py-2 leading-none rounded-md border border-gray-400 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100"
      >
        Next <GrFormNextLink />
      </button>
    </div>
  );
};

export default Pagination;

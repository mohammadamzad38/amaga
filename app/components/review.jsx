"use client";

import { useState } from "react";
import { FaStar } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

const Review = (val) => {
  const [review, setReview] = useState("");
  const [hovered, setHovered] = useState(0);
  const [selected, setSelected] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleStarClick = () => {
    setSelected(val);
    setModalOpen(true);
    setSubmitted(false);
    setReview("");
  };

  const handleSubmit = () => {
    if (!review.trim()) return;
    console.log({ rating: selected, review });
    setSubmitted(true);
    setTimeout(() => setModalOpen(false), 1800);
  };

  return (
    <>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((val) => (
          <span
            key={val}
            className={`cursor-pointer transition-colors duration-150 select-none
                 ${val <= (hovered || selected) ? "text-[#1DBF74]" : "text-gray-400"}`}
            onMouseEnter={() => setHovered(val)}
            onMouseLeave={() => setHovered(0)}
            onClick={() => handleStarClick(val)}
          >
            <FaStar size={20} />
          </span>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm">
            <div className="flex justify-between items-center mb-3">
              <p className="font-semibold text-gray-800">
                Leave a Rating & Review{" "}
              </p>
              <button
                onClick={() => setModalOpen(false)}
                className="text-gray-400 hover:text-red-600 cursor-pointer hover:bg-red-200 rounded-lg px-2 py-1 text-lg leading-none"
              >
                <IoClose />
              </button>
            </div>

            <div className="flex gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((val) => (
                <span
                  key={val}
                  className={`text-2xl ${val <= selected ? "text-[#1DBF74]" : "text-gray-400"}`}
                >
                  <FaStar size={20} />
                </span>
              ))}
            </div>

            <textarea
              rows={4}
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Share your experience..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none resize-none"
            />

            {submitted ? (
              <p className="text-center text-blue-600 text-sm mt-3">
                ✓ Review submitted! Thank you.
              </p>
            ) : (
              <div className="flex justify-end mt-3">
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 cursor-pointer text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Submit review
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Review;

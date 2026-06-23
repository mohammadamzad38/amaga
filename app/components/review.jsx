"use client";

import { useState } from "react";
import { FaStar } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { MdEdit, MdDelete } from "react-icons/md";

const Review = () => {
  const [review, setReview] = useState("");
  const [hovered, setHovered] = useState(0);
  const [selected, setSelected] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalHovered, setModalHovered] = useState(0);
  const [modalSelected, setModalSelected] = useState(0);
  const [savedReview, setSavedReview] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const handleStarClick = (val) => {
    if (savedReview) {
      setViewModalOpen(true);
      return;
    }
    setSelected(val);
    setModalSelected(val);
    setModalHovered(0);
    setModalOpen(true);
    setSubmitted(false);
    setReview("");
  };

  const handleSubmit = () => {
    if (!review.trim() || !modalSelected) return;
    setSavedReview({ rating: modalSelected, text: review });
    setSelected(modalSelected);
    setSubmitted(true);
    setTimeout(() => {
      setModalOpen(false);
      setEditMode(false);
    }, 1800);
  };

  const handleEdit = () => {
    setReview(savedReview.text);
    setModalSelected(savedReview.rating);
    setModalHovered(0);
    setSubmitted(false);
    setEditMode(true);
    setViewModalOpen(false);
    setModalOpen(true);
  };

  const handleDelete = () => {
    setSavedReview(null);
    setSelected(0);
    setHovered(0);
    setViewModalOpen(false);
  };

  return (
    <>
      {/* Card Stars */}
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((val) => (
          <span
            key={val}
            className={`cursor-pointer transition-colors duration-150 select-none ${
              val <= (hovered || selected) ? "text-[#1DBF74]" : "text-gray-400"
            }`}
            onMouseEnter={() => setHovered(val)}
            onMouseLeave={() => setHovered(0)}
            onClick={() => handleStarClick(val)}
          >
            <FaStar size={20} />
          </span>
        ))}
      </div>

      {/* Write / Edit Review Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm">
            <div className="flex justify-between items-center mb-3">
              <p className="font-semibold text-gray-800">
                {editMode ? "Edit Your Review" : "Leave a Rating & Review"}
              </p>
              <button
                onClick={() => {
                  setModalOpen(false);
                  setEditMode(false);
                }}
                className="text-gray-400 hover:text-red-600 cursor-pointer hover:bg-red-200 rounded-lg px-2 py-1 text-lg leading-none"
              >
                <IoClose />
              </button>
            </div>

            <div className="flex gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((val) => (
                <span
                  key={val}
                  className={`cursor-pointer transition-colors duration-150 select-none ${
                    val <= (modalHovered || modalSelected)
                      ? "text-[#1DBF74]"
                      : "text-gray-400"
                  }`}
                  onMouseEnter={() => setModalHovered(val)}
                  onMouseLeave={() => setModalHovered(0)}
                  onClick={() => setModalSelected(val)}
                >
                  <FaStar size={24} />
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
              <p className="text-center text-green-600 text-sm mt-3">
                ✓ Review {editMode ? "updated" : "submitted"}! Thank you.
              </p>
            ) : (
              <div className="flex justify-end mt-3">
                <button
                  onClick={handleSubmit}
                  disabled={!modalSelected}
                  className="px-4 py-2 cursor-pointer text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {editMode ? "Update review" : "Submit review"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* View Review Modal */}
      {viewModalOpen && savedReview && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm">
            <div className="flex justify-between items-center mb-3">
              <p className="font-semibold text-gray-800">Your Review</p>
              <button
                onClick={() => setViewModalOpen(false)}
                className="text-gray-400 hover:text-red-600 cursor-pointer hover:bg-red-200 rounded-lg px-2 py-1 text-lg leading-none"
              >
                <IoClose />
              </button>
            </div>

            {/* Stars */}
            <div className="flex gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((val) => (
                <span
                  key={val}
                  className={
                    val <= savedReview.rating
                      ? "text-[#1DBF74]"
                      : "text-gray-300"
                  }
                >
                  <FaStar size={24} />
                </span>
              ))}
            </div>

            {/* Review text */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-3 text-sm text-gray-700 min-h-20">
              {savedReview.text}
            </div>

            {/* Edit & Delete */}
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={handleEdit}
                className="flex items-center gap-1 px-3 py-2 text-sm border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 cursor-pointer"
              >
                <MdEdit size={16} />
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="flex items-center gap-1 px-3 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 cursor-pointer"
              >
                <MdDelete size={16} />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Review;

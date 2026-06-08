"use client";

import { useEffect, useState } from "react";
import { IoMdPersonAdd } from "react-icons/io";

const InviteModal = () => {
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    document.documentElement.style.overflow = openModal ? "hidden" : "auto";

    return () => {
      document.documentElement.style.overflow = "auto";
    };
  }, [openModal]);

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  return (
    <div>
      <button className="cursor-pointer" onClick={handleOpen}>
        <IoMdPersonAdd size={25} />
      </button>

      {openModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={handleClose}
        >
          <div
            className="bg-white p-6 rounded-lg w-[90%] max-w-md shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-bold mb-4">Invite People</h2>

            <input
              type="email"
              placeholder="Enter email"
              className="w-full border p-2 rounded mb-4 outline-none"
            />

            <div className="flex justify-center gap-3">
              <button
                onClick={handleClose}
                className="px-4 py-1 font-bold text-white bg-red-400 rounded cursor-pointer"
              >
                Cancel
              </button>

              <button className="px-4 py-1 font-bold bg-green-500 text-white rounded cursor-pointer">
                Send Invitation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InviteModal;

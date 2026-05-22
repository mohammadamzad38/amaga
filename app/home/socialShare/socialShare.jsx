"use client";

import { useState } from "react";
import { BiShareAlt } from "react-icons/bi";
import { MdContentCopy } from "react-icons/md";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa";

const SocialShare = () => {
  const [showShare, setShowShare] = useState(false);

  const handleCopy = async () => {
    // await navigator.clipboard.writeText(window.location.href);
    // alert("Link copied!");
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowShare(!showShare)}
        className="flex items-center gap-2 text-[#1DBF74] cursor-pointer"
      >
        <BiShareAlt size={20} className="text-[#1DBF74]" />
      </button>

      {showShare && (
        <div className="absolute right-0 mt-3 w-18 py-4 rounded-xl bg-white shadow-2xl  z-50">
          <div className="flex flex-col gap-2 items-center justify-between">
            <button className="w-10 cursor-pointer h-10 rounded-full bg-blue-100 hover:bg-blue-200 flex items-center justify-center transition">
              <FaFacebookF className="text-blue-600" />
            </button>

            <button className="w-10 cursor-pointer h-10 rounded-full bg-sky-100 hover:bg-sky-200 flex items-center justify-center transition">
              <FaTwitter className="text-sky-500" />
            </button>

            <button className="w-10 cursor-pointer h-10 rounded-full bg-blue-100 hover:bg-blue-200 flex items-center justify-center transition">
              <FaLinkedinIn className="text-blue-700" />
            </button>

            <button className="w-10 cursor-pointer h-10 rounded-full bg-green-100 hover:bg-green-200 flex items-center justify-center transition">
              <FaWhatsapp className="text-green-600" />
            </button>
            <button
              onClick={handleCopy}
              className="w-10 cursor-pointer h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition"
            >
              <MdContentCopy className="text-gray-700" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SocialShare;

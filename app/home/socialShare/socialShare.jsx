"use client";

import { useEffect, useRef, useState } from "react";
import { BiShareAlt } from "react-icons/bi";
import { MdContentCopy } from "react-icons/md";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa";
import toast from "react-hot-toast";

const SocialShare = ({ title, url }) => {
  const ref = useRef(null);
  const [showShare, setShowShare] = useState(false);

  const shareUrl = url;

  const platforms = [
    {
      icon: <FaFacebookF className="text-blue-600" />,
      bg: "bg-blue-100 hover:bg-blue-200",
      link: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    },
    {
      icon: <FaTwitter className="text-sky-500" />,
      bg: "bg-sky-100 hover:bg-sky-200",
      link: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`,
    },
    {
      icon: <FaLinkedinIn className="text-blue-700" />,
      bg: "bg-blue-100 hover:bg-blue-200",
      link: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    },
    {
      icon: <FaWhatsapp className="text-green-600" />,
      bg: "bg-green-100 hover:bg-green-200",
      link: `https://api.whatsapp.com/send?text=${encodeURIComponent(title + " " + shareUrl)}`,
    },
  ];

  const handleShare = (link) => {
    window.open(link, "_blank", "noopener, noreferrers");
    setShowShare(false);
  };
  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareUrl); //blank
    toast.success("Link copied!");
    setShowShare(false);
  };

  useEffect(() => {
    const handleClickOutSide = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setShowShare(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutSide);
    return () => document.removeEventListener("mousedown", handleClickOutSide);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setShowShare(!showShare)}
        className="flex items-center gap-2 text-[#1DBF74] cursor-pointer"
      >
        <BiShareAlt size={20} className="text-[#1DBF74]" />
      </button>

      {showShare && (
        <div className="absolute right-0 mt-3 w-18 py-4 rounded-xl bg-white shadow-2xl z-50">
          <div className="flex flex-col gap-2 items-center justify-between">
            {platforms.map((p, i) => (
              <button
                key={i}
                onClick={() => handleShare(p.link)}
                className={`w-10 cursor-pointer h-10 rounded-full flex items-center justify-center transition ${p.bg}`}
              >
                {p.icon}
              </button>
            ))}
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

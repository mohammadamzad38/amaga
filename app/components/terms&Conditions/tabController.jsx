"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import Conditions from "./conditions";
import Privacy from "./privacy";
import Faq from "./faq";
import { FaMailBulk } from "react-icons/fa";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { FaQuestionCircle } from "react-icons/fa";

const TABS = [
  {
    id: "terms-conditions",
    label: "Terms & Conditions",
    icon: <FaMailBulk size={20} />,
  },
  {
    id: "privacy-policy",
    label: "Privacy Policy",
    icon: <MdOutlinePrivacyTip size={20} />,
  },
  { id: "faq", label: "FAQ", icon: <FaQuestionCircle size={20} /> },
];

const TabController = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const tab = searchParams.get("tab") || "terms-conditions";

  // Default to first tab if no tab param exists
  useEffect(() => {
    if (!searchParams.get("tab")) {
      router.replace(`/help?tab=terms-conditions`, { scroll: false });
    }
  }, [searchParams, router]);

  const changeTab = (newTab) => {
    router.replace(`/help?tab=${newTab}`, { scroll: false });
  };

  // Scroll to top on tab change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [tab]);

  return (
    <div className="transition-opacity duration-700 ease-in-out px-5 lg:px-0 max-w-7xl mx-auto pt-10">
      {/* Tab Bar */}
      <div className="flex gap-1 border-b border-gray-200">
        {TABS.map(({ id, label, icon }) => (
          <button
            key={id}
            onClick={() => changeTab(id)}
            className={`flex items-center gap-2 px-4 cursor-pointer py-2 text-lg font-medium transition-colors
              ${
                tab === id
                  ? "border-b border-[#1DBF74] text-[#1DBF74]"
                  : "text-gray-500 hover:text-[#1DBF74] hover:border-b hover:border-[#1DBF74]"
              }`}
          >
            {icon}
            {label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {tab === "terms-conditions" && (
        <Conditions onNext={() => changeTab("privacy-policy")} />
      )}
      {tab === "privacy-policy" && <Privacy onNext={() => changeTab("faq")} />}
      {tab === "faq" && <Faq />}
    </div>
  );
};

export default TabController;

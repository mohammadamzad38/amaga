"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { MdSend } from "react-icons/md";
import { HiOutlineMailOpen } from "react-icons/hi";
import { IoCloseCircleOutline } from "react-icons/io5";

const Footer = () => {
  const [contact, setContact] = useState(false);
  const socialList = [
    {
      name: "FACEBOOK",
      path: "https://www.facebook.com/ITagamaglobal?mibextid=ZbWKwL",
    },
    {
      name: "TWITTER",
      path: "https://www.youtube.com/channel/UCk_j_80SzjZYoPUfYAkB-Vw",
    },
    { name: "INSTAGRAM", path: "/" },
    {
      name: "LINKEDIN",
      path: "https://www.linkedin.com/in/it-agama-275545202/",
    },
  ];

  const year = new Date().getFullYear();

  const navLinks = [
    { name: "About Us", path: "/about-us" },
    { name: "Contact Us", path: "/contact-us" },
    { name: "Terms & Conditions", path: "/help?tab=terms-conditions" },
    { name: "Privacy Policy", path: "/help?tab=privacy-policy" },
  ];

  const resourceLinks = [
    { name: "Job Marketplace", path: "/trade/job" },
    { name: "Supplier Directory", path: "/trade/supply-chain" },
    { name: "Consultant Library", path: "/trade/consultant" },
    { name: "Knowledge", path: "/trade/market-knowledge" },
  ];
  return (
    <div>
      <div className="border-b-2 border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_2fr] lg:grid-cols-[3fr_1fr_1fr_2fr] items-center px-5 md:px-10 py-10 md:py-12.5 gap-3 lg:gap-6">
          <div>
            <Image
              width={500}
              height={60}
              src={"/images/company-logo.png"}
              alt="It Agama Logo"
              className="w-60 h-full object-cover mb-7.5 lg:mb-10"
            />
            <p className="text-sm font-semibold text-gray-600 tracking-[6px] pb-1.75">
              CONTACT
            </p>
            <a
              href="mailto:marketing@itagama.com"
              className="text-[#073347] font-bold text-xl hover:underline leading-[32.43px] pb-2.5"
            >
              marketing@itagama.com
            </a>
          </div>

          <div className="flex flex-col">
            <p className="text-[18px] font-semibold pb-2.25 text-[#1C2F41]">
              Navigation
            </p>
            {navLinks.map((item, idx) =>
              item.name === "Contact Us" ? (
                <button
                  key={idx}
                  onClick={() => setContact(true)}
                  className="text-sm leading-5 py-1.25 text-gray-500 text-left cursor-pointer"
                >
                  {item.name}
                </button>
              ) : (
                <Link
                  className="text-sm leading-5 py-1.25 text-gray-500"
                  href={item.path}
                  key={idx}
                >
                  {item.name}
                </Link>
              ),
            )}
          </div>
          <div className="flex flex-col">
            <p className="text-[18px] font-semibold pb-2.25 text-[#1C2F41]">
              Resources
            </p>
            {resourceLinks.map((item, idx) => (
              <Link
                className="text-sm leading-5 py-1.25 text-gray-500"
                href={item.path}
                key={idx}
              >
                {item.name}
              </Link>
            ))}
          </div>
          {contact && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
              <div className="bg-white rounded-xl shadow-lg w-full max-w-lg relative p-6">
                {/* Close Button */}
                <button
                  onClick={() => setContact(false)}
                  className="absolute top-4 cursor-pointer hover:text-red-400 right-4 text-gray-500 hover:text-black text-xl"
                >
                  <IoCloseCircleOutline size={25} />
                </button>

                <h2 className="text-xl font-semibold text-[#073347] mb-2">
                  Contact IT Agama
                </h2>
                <div className="border-b-2 border-gray-200 mb-4"></div>
                <div className="space-y-3 text-gray-700">
                  <p>
                    If you have any questions or need help, please email us at
                    ....
                  </p>

                  <a
                    className="flex items-center gap-2 hover:text-[#1DBF74] font-semibold border text-lg justify-center hover:border-[#1DBF74] w-[60%]  rounded-sm px-4 py-2"
                    href="mailto:marketing@itagama.com"
                  >
                    <HiOutlineMailOpen size={20} />
                    marketing@itagama.com
                  </a>
                </div>
              </div>
            </div>
          )}
          <div className="flex flex-col">
            <p className="text-[18px] font-semibold pb-2.25 text-[#1C2F41]">
              Stay up to Date
            </p>
            <p className="text-sm leading-5 py-1.25 text-gray-500 mb-6 lg:mb-10">
              Stay Informed On How You Can Make a Difference
            </p>
            <form className="flex justify-between items-center p-2 lg:p-3 text-base bg-[#EEFDFF] shadow-sm border-[#DDF5F9] rounded-lg">
              <input
                type="email"
                placeholder="Email Address"
                className="outline-none"
              />
              <button className="bg-[#1DBF74] text-white cursor-pointer p-2 rounded-sm">
                <MdSend fontSize={20} />
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="flex flex-col text-center md:flex-row justify-between leading-5 gap-4 lg:leading-8  px-5 md:px-10 py-7.5 lg:py-8">
        <p className="text-[13px] font-medium">
          Copyright @ {year}, Itagama.com or its affiliates. All rights
          reserved.
        </p>
        <div className="flex gap-3 lg:gap-5 text-xs md:text-base justify-center items-center font-medium md:font-semibold text-[#073347]">
          {socialList.map((item, idx) => (
            <Link key={idx} href={item.path}>
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;

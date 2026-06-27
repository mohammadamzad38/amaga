"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import InviteModal from "../inviteModal";
import { IoMenu } from "react-icons/io5";
import { IoMdMail } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import AccountCenter from "./accountCenter";
import { AiOutlineShop } from "react-icons/ai";
import { useAuth } from "@/context/authContext";
import LangSwitch from "../../i18n/langSwitch";

const Header = () => {
  const { user } = useAuth();
  const [showMenu, setShowMenu] = useState(false);

  const navList = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about-us" },
    { name: "Help", path: "/help" },
  ];

  return (
    <div>
      <div className="flex flex-col md:flex-row fixed top-0 left-0 z-40 w-full bg-white justify-around lg:justify-between items-center px-5 lg:px-10 py-2 gap-3 md:gap-4">
        <div className="flex justify-between w-full lg:w-auto">
          <Link href={"/"}>
            <Image
              width={500}
              height={60}
              src={"/images/company-logo.png"}
              alt="It Agama Logo"
              className="w-48 lg:w-60 h-full object-cover "
            />
          </Link>
          <div className="block md:hidden">
            <AccountCenter />
          </div>
        </div>

        <div className="hidden lg:block">
          <Link
            href={"/shop/shop-link"}
            className="flex cursor-pointer items-center gap-4 border py-2.5 px-4 outline-[#1DBF74] text-[15px] font-bold rounded-sm text-[#1DBF74]"
          >
            <AiOutlineShop size={20} />
            Visit Online Mall
          </Link>
        </div>

        <div className="hidden lg:block">
          <div className="flex gap-5 text-lg md:text-sm lg:text-xl font-bold">
            {navList.map((nav, idx) => (
              <Link
                className="active:border-[#1DBF74] active:text-[#1DBF74] border hover:text-[#1DBF74]  px-5 rounded-[30px] "
                key={idx}
                href={nav.path}
              >
                {nav.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="hidden md:block">
          {/* profile // Account center component*/}
          <AccountCenter />
        </div>

        <div className="block lg:hidden w-full md:w-[5%]">
          <div className="flex justify-between items-center w-full">
            <div className="block md:hidden w-[50%]">
              <div className="flex justify-between w-full">
                <InviteModal />
                <IoMdMail size={25} />
              </div>
            </div>

            <div>
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="cursor-pointer"
              >
                <IoMenu size={35} className="text-[#1DBF74]" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {showMenu && (
        <div
          className="bg-black/40 inset-0 z-50 fixed backdrop-blur-xs"
          onClick={() => setShowMenu(false)}
        >
          <div
            className="w-[80%] md:w-[60%] bg-white p-5 h-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-end justify-end">
              <button
                onClick={() => setShowMenu(false)}
                className="cursor-pointer border rounded-full hover:text-red-800"
              >
                <IoClose size={30} />
              </button>
            </div>

            <div className="space-y-5">
              <Link
                href={"/shop/shop-link"}
                className="flex items-center mt-2 cursor-pointer gap-4 border py-2.5 px-4 outline-[#1DBF74] text-[15px] font-bold rounded-sm text-[#1DBF74]"
              >
                <AiOutlineShop size={25} />
                Visit Online Mall
              </Link>

              <div className="flex flex-col gap-3 lg:gap-5 text-sm md:text-lg lg:text-xl font-bold ">
                {navList.map((nav, idx) => (
                  <Link
                    className="active:border-[#1DBF74] border-b hover:text-[#1DBF74] py-1.2 px-5 leading-[31.50px]"
                    key={idx}
                    href={nav.path}
                    onClick={() => setShowMenu(false)}
                  >
                    {nav.name}
                  </Link>
                ))}
              </div>

              {user ? (
                <div className="flex justify-end top-0">
                  <LangSwitch />
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <Link
                    onClick={() => setShowMenu(false)}
                    href="/login"
                    className="text-[18px] text-center hover:border hover:text-[#1DBF74] cursor-pointer font-bold px-5 py-2.5 rounded-sm "
                  >
                    Log in
                  </Link>
                  <button
                    onClick={() => setShowMenu(false)}
                    className="text-[16px] px-7 py-2.5 rounded-sm cursor-pointer bg-[#1DBF74] font-bold text-white"
                  >
                    Get Started
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;

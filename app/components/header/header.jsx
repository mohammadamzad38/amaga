"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { IoMenu } from "react-icons/io5";
import { IoMdMail } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { AiOutlineShop } from "react-icons/ai";
import { IoMdPersonAdd } from "react-icons/io";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const navList = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about-us" },
    { name: "Help", path: "/help" },
  ];

  return (
    <div>
      <div className="flex flex-col md:flex-row fixed top-0 left-0 z-40 w-full bg-white justify-between items-center px-5 lg:px-10 py-3 gap-3 md:gap-0">
        <Link href={"/"}>
          <Image
            width={500}
            height={60}
            src={"/images/company-logo.png"}
            alt="It Agama Logo"
            className="w-45 lg:w-60 h-full object-cover "
          />
        </Link>

        <div className="hidden lg:block">
          <button className="flex cursor-pointer items-center gap-4 border py-2.5 px-4 outline-[#1DBF74] text-[15px] font-bold rounded-sm text-[#1DBF74]">
            <AiOutlineShop size={25} />
            Visit Online Mall
          </button>
        </div>
        <div className="hidden lg:block">
          <div className="flex gap-5 font-bold">
            {navList.map((nav, idx) => (
              <Link
                className="active:border-[#1DBF74] active:text-[#1DBF74] border hover:text-[#1DBF74] py-1.2 px-5 leading-[31.50px] rounded-[30px] "
                key={idx}
                href={nav.path}
              >
                {nav.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="hidden lg:block">
          <div className="flex gap-4">
            <Link
              href="/login"
              className="text-[18px] cursor-pointer font-bold px-5 py-2.5 rounded-sm "
            >
              Log in
            </Link>
            <button className="text-[16px] px-7 cursor-pointer py-2.5 rounded-sm bg-[#1DBF74] font-bold text-white">
              Get Started
            </button>
          </div>
        </div>

        <div className="block lg:hidden w-full md:w-[50%]">
          <div className="flex justify-between items-center w-full">
            <div className="flex justify-between w-[50%]">
              <IoMdPersonAdd size={25} />
              <IoMdMail size={25} />
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
        <div className="bg-black/40 inset-0 z-50 fixed backdrop-blur-xs">
          <div className="w-[80%] md:w-[60%] bg-white p-5 h-auto">
            <div className="flex items-end justify-end">
              <button
                onClick={() => setShowMenu(false)}
                className="cursor-pointer border rounded-full hover:text-red-800"
              >
                <IoClose size={30} />
              </button>
            </div>

            <div className="space-y-5">
              <button className="flex items-center cursor-pointer gap-4 border py-2.5 px-4 outline-[#1DBF74] text-[15px] font-bold rounded-sm text-[#1DBF74]">
                <AiOutlineShop size={25} />
                Visit Online Mall
              </button>

              <div className="flex flex-col gap-3 lg:gap-5 text-[18px] lg:text-xl font-bold ">
                {navList.map((nav, idx) => (
                  <Link
                    className="active:border-[#1DBF74] border-b hover:text-[#1DBF74] py-1.2 px-5 leading-[31.50px]"
                    key={idx}
                    href={nav.path}
                  >
                    {nav.name}
                  </Link>
                ))}
              </div>

              <div className="flex flex-col gap-4">
                <Link href="/login"  className="text-[18px] text-center hover:border hover:text-[#1DBF74] cursor-pointer font-bold px-5 py-2.5 rounded-sm ">
                  Log in
                </Link >
                <button className="text-[16px] px-7 py-2.5 rounded-sm cursor-pointer bg-[#1DBF74] font-bold text-white">
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;

"use client";
import Link from "next/link";
import Image from "next/image";
import { IoMail } from "react-icons/io5";
import InviteModal from "../inviteModal";
import { useAuth } from "@/context/authContext";
import { useState } from "react";

const AccountCenter = () => {
  const { user, logout } = useAuth();
  const [showModal, setShowModal] = useState(false);
  return (
    <div>
      {user ? (
        <div className="flex items-center gap-16">
          <div className="hidden md:flex gap-16 lg:gap-6">
            <InviteModal />
            <button>
              <IoMail size={25} />
            </button>
          </div>
          <div className="hidden lg:block">language option</div>
          <button
            onClick={() => setShowModal(true)}
            className="cursor-pointer flex justify-end border rounded-full h-11.25 w-11.25"
          >
            <Image
              src={"" || "/icon/vector.jpg"}
              width={50}
              height={50}
              alt=""
              className="rounded-full w-full"
            />
          </button>
          {showModal && (
           <div
  className="fixed inset-0 z-40"
  onClick={() => setShowModal(false)}
>
  <div
    className="fixed top-10 right-10 md:right-24 lg:right-16 flex flex-col items-start text-sm bg-white p-5 space-y-2 rounded-lg w-50 h-44 shadow-xl border border-gray-50 z-50"
    onClick={(e) => e.stopPropagation()}
  >
    <button>My Account</button>
    <button>My Profile</button>
    <button>News Feed</button>
    <button>Change Password</button>
    <button onClick={logout} className="cursor-pointer">
      Logout
    </button>
  </div>
</div>
          )}
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default AccountCenter;

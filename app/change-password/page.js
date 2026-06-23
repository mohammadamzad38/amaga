import Image from "next/image";
import React from "react";

const Page = () => {
  return (
    <div className="py-20 flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white border border-gray-300 rounded-xl p-6 shadow-sm">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Image
            width={400}
            height={400}
            src="/images/company-logo.png"
            alt="Adminlogin Logo"
            className="h-15 w-full object-contain"
          />
        </div>

        {/* Heading */}
        <h2 className="text-base lg:text-xl font-semibold text-gray-900 mb-2">
          Change Password
        </h2>

        <p className="text-gray-600 text-sm mb-6">
          It&apos;s a good idea to use a strong password that you&apos;re not
          using elsewhere
        </p>

        {/* Form */}
        <form className="space-y-4">
          <input
            type="password"
            placeholder="Current password"
            className="w-full px-4 py-3 border border-gray-400 rounded-lg outline-none focus:ring-2 focus:ring-green-400"
          />

          <input
            type="password"
            placeholder="New password"
            className="w-full px-4 py-3 border border-gray-400 rounded-lg outline-none focus:ring-2 focus:ring-green-400"
          />

          <input
            type="password"
            placeholder="Confirm new Password"
            className="w-full px-4 py-3 border border-gray-400 rounded-lg outline-none focus:ring-2 focus:ring-green-400"
          />

          <button
            type="submit"
            className="w-full cursor-pointer bg-[#1DBF74] hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;

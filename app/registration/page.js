"use client";

import Link from "next/link";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";

import { IoEyeOutline } from "react-icons/io5";
import { VscEyeClosed } from "react-icons/vsc";
import { IoLogoFacebook } from "react-icons/io5";
import { RiBuilding2Line } from "react-icons/ri";
import { useAuth } from "../../context/authContext";
import {
  MdOutlineMail,
  MdLockOutline,
  MdDriveFileRenameOutline,
} from "react-icons/md";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Page = () => {
  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { loading, register, signInWithGoogle, signinWithFacebook } = useAuth();

  const router = useRouter();

  const clearError = () => {
    setTimeout(() => {
      setErrorMessage("");
    }, 3000);
  };

  const handleRegistration = async (e) => {
    e.preventDefault();

    setErrorMessage("");

    const form = e.target;
    const first_name = form.firstName.value;
    const last_name = form.lastName.value;
    const company_name = form.company.value;
    const email = form.email.value;
    const password = form.password.value;
    const termExcept = form.terms?.checked;

    if (!termExcept) {
      setErrorMessage("You must accept terms and privacy policy");

      clearError();

      return;
    }

    const result = await register({
      email,
      company_name,
      password,
      last_name,
      first_name,
    });

    if (result.error) {
      const msg =
        typeof result.error === "object"
          ? Object.values(result.error).flat().join(",")
          : result.error;
      setErrorMessage(msg);

      clearError();
      return;
    }

    toast.success(
      "Registration succeeded! Please check your email to continue.",
    );
    form.reset();
    setShow(false);
  };

  const handleGooglePopup = async () => {
    const { error } = await signInWithGoogle();

    if (error) {
      toast.error(error);
      return;
    }

    toast.success("Login successful!");
    router.push("/");
  };

  const handleFacebookPopup = async () => {
    const { error } = await signinWithFacebook();

    if (error) {
      toast.error(error);
      return;
    }

    toast.success("Login successful!");
    router.push("/");
  };
  return (
    <div className="mt-10 mx-auto max-w-lg w-full border-2 border-gray-100 rounded-[10px] shadow-sm">
      <div className="p-4 ">
        <p className="text-lg font-medium text-[#1DBF74] text-center mb-4">
          SIGN UP
        </p>
        <p className="text-[32px] font-bold text-center">Create New Account</p>

        <div className="flex flex-col md:flex-row justify-center gap-10 w-full mt-8">
          <button
            onClick={handleGooglePopup}
            className="flex gap-3 cursor-pointer items-center font-bold text-sm text-black/70 border border-gray-300 rounded-[6px] p-[16px]"
          >
            <FcGoogle size={20} />
            Login with Google
          </button>
          <button
            onClick={handleFacebookPopup}
            className="flex gap-3 cursor-pointer items-center font-bold text-sm text-black/70 border border-gray-300 rounded-[6px] p-[16px]"
          >
            <IoLogoFacebook size={20} className="text-[#0064E0]" />
            Login with Facebook
          </button>
        </div>
        <div className="flex gap-4 w-full items-center my-8">
          <div className="border-b border-gray-100 w-[50%]"></div>
          <p className="font-semibold text-gray-500 text-sm">Or</p>
          <div className="border-b border-gray-100 w-[50%]"></div>
        </div>

        <form onSubmit={handleRegistration}>
          <div className="flex flex-col mb-6">
            <label className="font-semibold mb-2">First Name</label>

            <div className="relative w-full flex">
              <MdDriveFileRenameOutline className="absolute left-4 top-6.5 -translate-y-1/2 text-gray-300 text-xl" />

              <input
                required
                className="h-12 w-full text-gray-400 rounded-md pl-12 pr-4 outline-none border border-gray-200 bg-white"
                placeholder="First Name"
                name="firstName"
                type="text"
              />
            </div>
          </div>

          <div className="flex flex-col mb-6">
            <label className="font-semibold mb-2">Last Name</label>

            <div className="relative w-full flex">
              <MdDriveFileRenameOutline className="absolute left-4 top-6.5 -translate-y-1/2 text-gray-300 text-xl" />

              <input
                required
                className="h-12 w-full text-gray-400 rounded-md pl-12 pr-4 outline-none border border-gray-200 bg-white"
                placeholder="Last Name"
                name="lastName"
                type="text"
              />
            </div>
          </div>

          <div className="flex flex-col mb-6">
            <label className="font-semibold mb-2">Company</label>

            <div className="relative w-full flex">
              <RiBuilding2Line className="absolute left-4 top-6.5 -translate-y-1/2 text-gray-300 text-xl" />

              <input
                required
                className="h-12 w-full text-gray-400 rounded-md pl-12 pr-4 outline-none border border-gray-200 bg-white"
                placeholder="Company Name"
                name="company"
                type="text"
              />
            </div>
          </div>

          <div className="flex flex-col mb-6">
            <label className="font-semibold mb-2">Email address</label>

            <div className="relative w-full flex">
              <MdOutlineMail className="absolute left-4 top-6.5 -translate-y-1/2 text-gray-300 text-xl" />

              <input
                required
                className="h-12 w-full text-gray-400 rounded-md pl-12 pr-4 outline-none border border-gray-200 bg-white"
                placeholder="Email"
                name="email"
                type="email"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label className="font-semibold mb-2">Password</label>

            <div className="relative w-full flex">
              <MdLockOutline className="absolute left-4 top-6.5 -translate-y-1/2 text-gray-300 text-xl" />

              <input
                required
                className="h-12 w-full text-gray-400 rounded-md pl-12 pr-4 outline-none border border-gray-200 bg-white"
                placeholder="Password"
                name="password"
                type={show ? "text" : "password"}
              />
              <button
                type="button"
                className="absolute right-4 cursor-pointer bottom-4"
                onClick={() => setShow(!show)}
              >
                {show ? <IoEyeOutline /> : <VscEyeClosed />}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3 ">
            <input
              type="checkbox"
              name="terms"
              className="accent-green-600 h-4 w-4 cursor-pointer text-white"
            />

            <p>I agree to the</p>
            <Link
              className="text-[#1DBF74] outline-none hover:underline hover:text-sky-500 flex items-base justify-end my-6"
              href={"/help"}
            >
              terms of use and privacy policy
            </Link>
          </div>
          {errorMessage && (
            <p className="text-red-500 text-sm mb-4 font-medium">
              {errorMessage}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="text-white py-3 cursor-pointer font-bold border bg-[#1DBF74] w-full rounded-sm disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? "Loading..." : "Create Account"}
          </button>
        </form>
        <p className="font-semibold text-lg text-center mt-8 mb-4">
          Already have an account?
          <Link
            href={"/login"}
            className="text-[#1DBF74] ml-2 hover:text-sky-500 hover:underline"
          >
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Page;

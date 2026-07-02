"use client";

import Link from "next/link";
import toast from "react-hot-toast";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineMail } from "react-icons/md";
import { MdLockOutline } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";
import { VscEyeClosed } from "react-icons/vsc";
import { IoLogoFacebook } from "react-icons/io5";
import { useAuth } from "../../context/authContext";
import { useRouter, useSearchParams } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const searchPerams = useSearchParams();
  const [show, setShow] = useState(false);
  const redirect = searchPerams.get("redirect");
  const [errorMessage, setErrorMessage] = useState("");
  const { loading, logIn, signInWithGoogle, signinWithFacebook } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    const { error } = await logIn({
      email,
      password,
    });

    if (error) {
      setErrorMessage(error);
      return;
    }

    toast.success("Login successful!");

    const redirectPath = redirect || "/";

    router.replace(redirectPath);
  };

  const handleGooglePopup = async () => {
    const { error } = await signInWithGoogle();

    if (error) {
      toast.error(error);
      return;
    }

    toast.success("Login successful!");
    if (redirect) {
      router.push(redirect);
    } else {
      router.push("/");
    }
  };

  const handleFacebookPopup = async () => {
    const { error } = await signinWithFacebook();

    if (error) {
      toast.error(error);
    }

    toast.success("Login successful!");
    if (redirect) {
      router.push(redirect);
    } else {
      router.push("/");
    }
  };

  return (
    <div className="mt-10 mx-auto max-w-lg w-full border-2 border-gray-100 rounded-[10px] shadow-sm">
      <div className="p-4 ">
        <p className="text-lg font-medium text-[#1DBF74] text-center mb-4">
          SIGN IN
        </p>
        <p className="text-[32px] font-bold text-center">Welcome Back!</p>

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

        <form onSubmit={handleLogin}>
          <div className="flex flex-col mb-6">
            <label className="font-semibold mb-2">Email address</label>

            <div className="relative w-full flex">
              <MdOutlineMail className="absolute left-4 top-6.5 -translate-y-1/2 text-gray-300 text-xl" />

              <input
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
          {errorMessage && (
            <p className="text-red-500 text-sm mb-4 font-medium">
              {errorMessage}
            </p>
          )}
          <Link
            className="text-[#1DBF74] outline-none font-bold hover:underline hover:text-sky-500 flex items-base justify-end my-6"
            href={""}
          >
            Forgot your password
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="text-white py-3 cursor-pointer font-bold border bg-[#1DBF74] w-full rounded-sm disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>
        <p className="font-semibold text-lg text-center mt-8 mb-4">
          Don't have an account?
          <Link
            href={"/registration"}
            className="text-[#1DBF74] ml-2 hover:text-sky-500 hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Page;

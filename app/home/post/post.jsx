"use client";

import Image from "next/image";
import { useState } from "react";
import { IoChevronDown } from "react-icons/io5";
import postData from "../../jsonData/recentPost";
// import { IoShareSocialOutline } from "react-icons/io5";
import SocialShare from "../socialShare/socialShare";

const Post = ({ title }) => {
  const [machine, setMachine] = useState();
  return (
    <div className="pb-20 pt-12.5">
      <div className="flex items-center justify-between pb-7.5">
        <p className="text-[24px] font-bold">{title}</p>

        <div className="relative w-30 md:w-50">
          <select
            value={machine}
            onChange={(e) => setMachine(e.target.value)}
            className="w-full appearance-none border text-sm md:text-base border-gray-400 px-4 py-2 rounded-lg outline-none bg-white"
          >
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
            <option value="option4">Option 4</option>
          </select>

          <IoChevronDown className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-500 pointer-events-none" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {postData.slice(0, 4).map((data, idx) => (
          <div
            key={idx}
            className="w-full max-w-sm  flex flex-col bg-[#F6F6F6] shadow-xl px-3.75 py-6.25"
          >
            <div className="flex justify-between items-center">
              <div>
                <div className="flex items-center gap-3">
                  <Image
                    src={data.profilePicture}
                    alt={data.name}
                    width={45}
                    height={45}
                    className="rounded-full object-cover w-8 h-8 "
                  />
                  <button className="cursor-pointer font-bold text-sm line-clamp-1">
                    {data.name}
                  </button>
                </div>
                <p className="text-xs leading-none ml-11 text-gray-500">
                  {data.postHour}
                </p>
              </div>
              <div>
                <button className="px-4 cursor-pointer py-2 text-white text-xs font-semibold rounded-md bg-[#1DBF74] ">
                  Follow
                </button>
              </div>
            </div>

            <div className="w-full h-60 overflow-hidden rounded-xl mt-8">
              <Image
                src={data.image}
                alt="product"
                width={500}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-2 text-sm md:text-base font-bold mt-3">
              <p className="line-clamp-1">Fiber: {data.fiber}</p>
              <p className="line-clamp-1">Origin: {data.origin}</p>
              <p className="line-clamp-1">Price: ${data.price}</p>
              <p className="line-clamp-1">Qty: {data.quantity}</p>
              <p className="line-clamp-1">Yarn: {data.yarn_count}</p>
              <p className="line-clamp-1">Quality: {data.quality}</p>
              <p className="line-clamp-1">Price: {data.price}</p>
            </div>

            <div className="flex items-center justify-between text-sm mt-3 mb-8">
              <p className="text-yellow-500 font-semibold">
                ⭐ {data.review} Reviews
              </p>

              {/* <button className="flex cursor-pointer font-bold text-[#1DBF74] items-center gap-2">
                <IoShareSocialOutline size={20} />
              </button> */}
              <SocialShare />
            </div>

            <div className="flex justify-center items-center">
              <button className="mt-auto w-50 cursor-pointer bg-[#1DBF74] text-white font-bold py-2 rounded-3xl hover:bg-green-600 transition">
                Contact Supplier
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Post;

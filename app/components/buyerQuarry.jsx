"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { GrFormPrevious } from "react-icons/gr";
import { MdOutlineNavigateNext } from "react-icons/md";
import "swiper/css";

const buyer = [
  {
    image: "/images/profile.jpeg",
    name: "Mohammad Amzad ",
    price: "30",
    qn: "200",
    qry: "I dont know What?",
    date: "03/02/2021",
  },
  {
    image: "/images/profile.jpeg",
    name: "Kon Amzad",
    price: "10",
    qn: "100",
    qry: "What should i dont know What?",
    date: "11/02/2021",
  },
  {
    image: "/images/profile.jpeg",
    name: "Kon Amzad",
    price: "10",
    qn: "100",
    qry: "What should i dont know What?",
    date: "11/02/2021",
  },
  {
    image: "/images/profile.jpeg",
    name: "Kon Amzad",
    price: "10",
    qn: "100",
    qry: "What should i dont know What?",
    date: "11/02/2021",
  },
  {
    image: "/images/profile.jpeg",
    name: "Kon Amzad",
    price: "10",
    qn: "100",
    qry: "What should i dont know What?",
    date: "11/02/2021",
  },
];

const BuyerQuarry = () => {
  const swiperRef = useRef(null);

  return (
    <div className="max-w-sm lg:max-w-3xl space-y-4">
      {/* BUTTONS */}
      <div className="flex gap-2">
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="bg-white rounded-full p-2 shadow cursor-pointer hover:text-[#1DBF74]"
        >
          <GrFormPrevious size={20} />
        </button>

        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="bg-white rounded-full p-2 shadow cursor-pointer hover:text-[#1DBF74]"
        >
          <MdOutlineNavigateNext size={20} />
        </button>
      </div>

      <div className="flex gap-4">
        {/* LEFT CARD */}
        <div className="w-20 bg-white p-4 rounded-lg shadow  flex flex-col justify-center">
          <p className="text-xl font-bold text-green-500">{buyer.length}</p>
          <p className="text-sm text-gray-500 mt-2">Buy available</p>
        </div>

        {/* SWIPER */}
        <div className="flex-1 min-w-0">
          <Swiper
            spaceBetween={16}
            slidesPerView={1}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            loop={true}
            breakpoints={{
              640: { slidesPerView: 1 },
              1024: { slidesPerView: 2 },
            }}
          >
            {buyer.map((item, idx) => (
              <SwiperSlide key={idx}>
                <Link
                  href="/trade/buy"
                  className="block bg-white rounded-xl shadow p-4 hover:shadow-lg transition h-full"
                >
                  <div className="flex overflow-hidden gap-4">
                    <div className="flex gap-2">
                      <Image
                        alt={item.name}
                        width={50}
                        height={50}
                        src={item.image}
                        className="rounded-full h-10 w-10"
                      />

                      <div className="flex-1 text-xs">
                        <p className="font-semibold line-clamp-1">
                          {item.name}
                        </p>
                        <p className="text-gray-500">{item.date}</p>
                      </div>
                    </div>

                    <div>
                      <div className="flex text-[#1DBF74] gap-2 text-xs">
                        <p>Target Price:</p>
                        <p>{item.price}</p>
                      </div>

                      <div className="flex gap-2 text-xs">
                        <p className="text-gray-500">Quantity:</p>
                        <p>{item.qn}</p>
                      </div>
                    </div>
                  </div>

                  <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                    {item.qry}
                  </p>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default BuyerQuarry;

"use client";

import "swiper/css";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

const QuerryCard = ({ value, className, swiperRef }) => {
  return (
    <div className={`w-full overflow-hidden ${className}`}>
      <Swiper
        spaceBetween={16}
        slidesPerView={1}
        onSwiper={(swiper) => {
          if (swiperRef) swiperRef.current = swiper;
        }}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 1,
          },
          1024: {
            slidesPerView: 2,
          },
        }}
      >
        {value.map((item) => (
          <SwiperSlide key={item.id} className="h-auto">
            <Link
              href="/trade/buy"
              className="block h-full w-full bg-white rounded-xl shadow p-4 hover:shadow-lg transition"
            >
              <div className="flex justify-between gap-4">
                <div className="flex gap-2 min-w-0">
                  <Image
                    src="/images/profile.jpeg"
                    alt={item.username}
                    width={50}
                    height={50}
                    className="w-10 h-10 rounded-full flex-shrink-0"
                  />

                  <div className="min-w-0">
                    <p className="font-semibold text-sm truncate">
                      {item.username}
                    </p>

                    <p className="text-xs text-gray-500">
                      {new Date(item.created_at).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                <div className="text-xs text-right flex-shrink-0">
                  <div className="flex gap-1 justify-end text-[#1DBF74]">
                    <span>Target:</span>
                    <span>{item.price}</span>
                  </div>

                  <div className="flex gap-1 justify-end">
                    <span className="text-gray-500">Qty:</span>
                    <span>{item.quantity}</span>
                  </div>
                </div>
              </div>

              <p className="mt-3 text-sm text-gray-600 line-clamp-2">
                {item.description}
              </p>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default QuerryCard;

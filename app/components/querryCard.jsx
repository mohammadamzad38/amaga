import "swiper/css";
import Link from "next/link";
import Image from "next/image";
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

const QuerryCard = ({ value, className }) => {
  const swiperRef = useRef(null);
  return (
    <div className={className}>
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
        {value.map((item, idx) => (
          <SwiperSlide key={idx}>
            <Link
              href="/trade/buy"
              className="block bg-white rounded-xl shadow p-4 hover:shadow-lg transition h-full"
            >
              <div className="flex overflow-hidden gap-4">
                <div className="flex gap-2">
                  <Image
                    alt={item.username}
                    width={50}
                    height={50}
                    src={"/images/profile.jpeg"}
                    className="rounded-full h-10 w-10"
                  />

                  <div className="flex-1 text-xs">
                    <p className="font-semibold line-clamp-1">
                      {item.username}
                    </p>
                    <p className="text-gray-500">
                      {new Date(item.created_at).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                <div>
                  <div className="flex text-[#1DBF74] gap-2 text-xs">
                    <p>Target Price:</p>
                    <p>{item.price}</p>
                  </div>

                  <div className="flex gap-2 text-xs">
                    <p className="text-gray-500">Quantity:</p>
                    <p>{item.quantity}</p>
                  </div>
                </div>
              </div>

              <p className="mt-2 text-sm text-gray-600 line-clamp-2">
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

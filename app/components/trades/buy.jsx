"use client";

import Reset from "../reset";
import Search from "../search";
import Image from "next/image";
import ActionButton from "../actionButton";
import SocialShare from "../../home/socialShare/socialShare";

export default function Buy() {
  const buyers = [
    {
      id: 1,
      date: "19-01-2026",
      buyer: "Yousif Mohammed",
      image: "/images/profile.jpeg",
      request: "Good Cotton Needed",
      type: "Cotton Fiber",
      category: "Fiber",
      country: "Uzbekistan",
      price: "$0.8",
    },
    {
      id: 2,
      date: "20-01-2026",
      buyer: "Ahmed Ali",
      image: "/images/profile.jpeg",
      request: "Polyester Fiber Required",
      type: "Polyester",
      category: "Fiber",
      country: "Bangladesh",
      price: "$1.2",
    },
    {
      id: 3,
      date: "21-01-2026",
      buyer: "John Smith",
      image: "/images/profile.jpeg",
      request: "Need Premium Cotton",
      type: "Cotton Fiber",
      category: "Fiber",
      country: "USA",
      price: "$1.0",
    },
    {
      id: 4,
      date: "22-01-2026",
      buyer: "Mohammed Saeed",
      image: "/images/profile.jpeg",
      request: "Viscose Fiber Inquiry",
      type: "Viscose",
      category: "Fiber",
      country: "UAE",
      price: "$1.5",
    },
    {
      id: 5,
      date: "23-01-2026",
      buyer: "David Miller",
      image: "/images/profile.jpeg",
      request: "Looking For Jute Fiber",
      type: "Jute",
      category: "Fiber",
      country: "Germany",
      price: "$0.9",
    },
    {
      id: 6,
      date: "24-01-2026",
      buyer: "Rahman Karim",
      image: "/images/profile.jpeg",
      request: "Organic Cotton Needed",
      type: "Organic Cotton",
      category: "Yarn",
      country: "Bangladesh",
      price: "$1.3",
    },
    {
      id: 7,
      date: "25-01-2026",
      buyer: "Michael Johnson",
      image: "/images/profile.jpeg",
      request: "Need Yarn Supplier",
      type: "OE Yarn",
      category: "Yarn",
      country: "Canada",
      price: "$1.7",
    },
    {
      id: 8,
      date: "26-01-2026",
      buyer: "Ali Hassan",
      image: "/images/profile.jpeg",
      request: "Compact Yarn Required",
      type: "Compact Yarn",
      category: "Yarn",
      country: "Pakistan",
      price: "$1.4",
    },
    {
      id: 9,
      date: "27-01-2026",
      buyer: "Fatima Noor",
      image: "/images/profile.jpeg",
      request: "Need Viscose Yarn",
      type: "Viscose Yarn",
      category: "Yarn",
      country: "Turkey",
      price: "$1.6",
    },
    {
      id: 10,
      date: "28-01-2026",
      buyer: "Robert Wilson",
      image: "/images/profile.jpeg",
      request: "Looking For Cotton Supplier",
      type: "Cotton Fiber",
      category: "Fiber",
      country: "UK",
      price: "$1.1",
    },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold pb-8 md:pb-14">BUY ENQUIRY</h2>
      <div className="flex justify-between">
        <h2 className="border-b-2 border-b-[#1DBF74] w-20 pl-2 font-semibold">
          ACTIVE
        </h2>
        <div className="mb-2">
          <ActionButton label={"Upload Buy"} href={""} />
        </div>
      </div>
      <div className="border-t-1 border-gray-500 mb-10"></div>
      <div className="flex flex-col md:flex-row gap-5 justify-between pb-10">
        <h2 className="font-semibold">BUYER REQUESTS</h2>

        <div className="flex justify-between gap-6">
          <Search />
          <Reset />
        </div>
      </div>

      <div className="space-y-4 pb-10">
        {buyers.map((buyer) => (
          <div key={buyer.id} className="bg-white rounded-xl p-6">
            <div className="grid flex-col md:grid-cols-[2fr_5fr_2fr_1fr] gap-6 items-start">
              {/* 11111111 */}
              <div className="flex justify-between gap-12">
                <div className="font-bold space-y-2 md:w-30">
                  <h2 className="mb-4">Date</h2>
                  <h4 className="text-sm font-semibold">{buyer.date}</h4>
                </div>

                <div className="md:w-50">
                  <h2 className="mb-4 font-bold">Buyer</h2>
                  <Image
                    src={buyer.image}
                    alt={buyer.buyer}
                    width={50}
                    height={50}
                    className="w-12 h-12 object-cover border"
                  />
                  <h3 className="font-semibold mt-1 md:mt-3">{buyer.buyer}</h3>
                </div>
              </div>

              {/* 2222222222222 */}
              <div className="flex justify-between ">
                <div>
                  <h2 className="mb-4 font-bold">Request</h2>
                  <h3 className="text-sm">{buyer.request}</h3>

                  <button className="border cursor-pointer border-gray-200 mt-4 px-5 py-1 text-sm bg-white hover:bg-gray-50 transition">
                    {buyer.type}
                  </button>
                </div>

                <div>
                  <h2 className="mb-4 font-bold">Category</h2>
                  <p>{buyer.category}</p>
                </div>
              </div>

              {/* 33333333333333 */}
              <div className="flex justify-between ">
                <div>
                  <h2 className="mb-4 font-bold">Country</h2>
                  <p className="font-semibold">{buyer.country}</p>
                </div>
                <div>
                  <h2 className="mb-4 font-bold">Target Price</h2>
                  <p className="font-semibold">{buyer.price}</p>
                </div>
              </div>

              {/* 444444444444444 */}

              <div className="flex md:flex-col justify-around gap-4 items-start">
                <h2 className="font-bold">Action</h2>
                <button className="bg-green-500 cursor-pointer hover:bg-green-600 text-white px-6 py-1 rounded-sm text-sm transition">
                  Contact
                </button>

                <div className="border  border-[#1DBF74] px-4">
                  <SocialShare />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

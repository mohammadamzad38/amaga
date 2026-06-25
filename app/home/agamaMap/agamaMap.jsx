"use client";
import { IoClose } from "react-icons/io5";

import Image from "next/image";
import { useState } from "react";
import { PiInfoDuotone } from "react-icons/pi";

const VIEW_W = 900;
const VIEW_H = 800;

const nodes = [
  {
    name: "Machine",
    color: "#d0a4dd",
    desc: "Machine related information goes here.",
    line: "M490 370 L320 280 L270 150",
    circleX: 270,
    circleY: 150,
    labelX: 250,
    labelY: 100,
  },
  {
    name: "Garments",
    color: "#ff7676",
    desc: "Garments related information goes here.",
    line: "M440 330 L410 240 L460 125",
    circleX: 459,
    circleY: 120,
    labelX: 440,
    labelY: 75,
  },
  {
    name: "Consultant",
    color: "#77bce8",
    desc: "Consultant related information goes here.",
    line: "M460 370 L480 240 L600 140",
    circleX: 600,
    circleY: 140,
    labelX: 610,
    labelY: 85,
    glow: true,
  },
  {
    name: "Yarn",
    color: "#a8b7e9",
    desc: "Yarn related information goes here.",
    line: "M430 405 L545 250 L680 250",
    circleX: 690,
    circleY: 250,
    labelX: 750,
    labelY: 240,
  },
  {
    name: "Buy",
    color: "#86dcb2",
    desc: "Buy related information goes here.",
    line: "M520 340 L580 330 L710 400",
    circleX: 720,
    circleY: 410,
    labelX: 770,
    labelY: 410,
  },
  {
    name: "Fabric",
    color: "#9eb8ef",
    desc: "Fabric related information goes here.",
    line: "M450 360 L590 420 L640 570",
    circleX: 645,
    circleY: 580,
    labelX: 650,
    labelY: 610,
  },
  {
    name: "Designer",
    color: "#f2b466",
    desc: "Designer related information goes here.",
    line: "M450 340 L510 470 L420 630",
    circleX: 426,
    circleY: 620,
    labelX: 410,
    labelY: 645,
  },
  {
    name: "Knowledge",
    color: "#9e9e9e",
    desc: "Knowledge related information goes here.",
    line: "M450 310 L430 465 L250 575",
    circleX: 250,
    circleY: 575,
    labelX: 170,
    labelY: 560,
  },
  {
    name: "Fiber",
    color: "#cdb6df",
    desc: "Fiber related information goes here.",
    line: "M470 330 L360 440 L200 430",
    circleX: 190,
    circleY: 430,
    labelX: 130,
    labelY: 415,
  },
  {
    name: "Logistic",
    color: "#9c9c9c",
    desc: "Logistic related information goes here.",
    line: "M460 350 L320 380 L200 300",
    circleX: 190,
    circleY: 290,
    labelX: 120,
    labelY: 270,
  },
];

export default function AgamaMap() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [openNode, setOpenNode] = useState(null);

  return (
    <>
      <div className="py-20">
        <h2 className="mb-12 text-center text-5xl font-bold">ITAGAMA Map</h2>

        <div
          className="relative mx-auto w-full max-w-[900px]"
          style={{ aspectRatio: `${VIEW_W}/${VIEW_H}` }}
        >
          <svg
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            className="absolute inset-0 h-full w-full"
          >
            <defs>
              <filter
                id="consultantGlow"
                x="-80%"
                y="-80%"
                width="260%"
                height="260%"
              >
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Lines */}
            {nodes.map((item, i) => (
              <path
                key={i}
                d={item.line}
                stroke={item.color}
                strokeWidth="6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity={activeIndex === null || activeIndex === i ? 1 : 0.55}
                className="transition-all duration-300"
              />
            ))}

            {/* Circles */}
            {nodes.map((item, i) => (
              <circle
                key={i}
                cx={item.circleX}
                cy={item.circleY}
                r={15}
                fill={item.color}
                opacity={activeIndex === null || activeIndex === i ? 1 : 95}
                filter={
                  item.glow || activeIndex === i
                    ? "url(#consultantGlow)"
                    : undefined
                }
                className="transition-all duration-300"
              />
            ))}

            {/* Center box */}
            <foreignObject x="370" y="290" width="160" height="120">
              <div className="flex h-full w-full items-center justify-center rounded-xl border-2 border-green-500 bg-white shadow-md">
                <Image
                  src="/steps/center.png"
                  alt="Agama"
                  width={120}
                  height={100}
                  className="w-auto h-auto object-contain"
                />
              </div>
            </foreignObject>
          </svg>

          {/* Labels */}
          {nodes.map((item, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setOpenNode(item)}
              onMouseEnter={() => setActiveIndex(i)}
              onMouseLeave={() => setActiveIndex(null)}
              className={`absolute -translate-x-1/2 flex items-center gap-2 transition-all duration-300
    ${
      activeIndex === i
        ? "bg-white cursor-pointer scale-105 text-black"
        : "text-gray-500 hover:bg-gray-50"
    }
    ${activeIndex === null || activeIndex === i ? "opacity-100" : "opacity-70"}
  `}
              style={{
                left: `${(item.labelX / VIEW_W) * 100}%`,
                top: `${(item.labelY / VIEW_H) * 100}%`,
              }}
            >
              <span className="font-bold whitespace-nowrap">{item.name}</span>

              <PiInfoDuotone size={16} className="text-gray-400" />
            </button>
          ))}
        </div>
      </div>

      {/* Modal */}
      {openNode && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setOpenNode(null)}
        >
          <div
            className="relative w-full max-w-lg rounded-xl bg-white p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpenNode(null)}
              className="absolute right-5 cursor-pointer border rounded-full text-gray-500 top-5 text-xl text-black-400 transition hover:text-red-500"
            >
              <IoClose />
            </button>

            <h3 className="font-semibold">{openNode.name}</h3>
            <div className="border-b border-gray-300 my-2"></div>
            <p className="leading-8 text-gray-600">{openNode.desc}</p>
          </div>
        </div>
      )}
    </>
  );
}

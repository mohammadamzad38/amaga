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
    line: "M490 370 L320 285 L270 150",
    circleX: 275,
    circleY: 160,
    labelX: 255,
    labelY: 105,
  },
  {
    name: "Garments",
    color: "#ff7676",
    desc: "Garments related information goes here.",
    line: "M420 300 L390 240 L430 135",
    circleX: 430,
    circleY: 130,
    labelX: 440,
    labelY: 75,
  },
  {
    name: "Consultant",
    color: "#77bce8",
    desc: "Consultant related information goes here.",
    line: "M460 330 L475 240 L565 160",
    circleX: 570,
    circleY: 155,
    labelX: 600,
    labelY: 95,
    glow: true,
  },
  {
    name: "Yarn",
    color: "#a8b7e9",
    desc: "Yarn related information goes here.",
    line: "M436 410 L540 250 L660 260",
    circleX: 670,
    circleY: 260,
    labelX: 740,
    labelY: 245,
  },
  {
    name: "Buy",
    color: "#86dcb2",
    desc: "Buy related information goes here.",
    line: "M520 340 L580 320 L680 390",
    circleX: 690,
    circleY: 400,
    labelX: 760,
    labelY: 410,
  },
  {
    name: "Fabric",
    color: "#9eb8ef",
    desc: "Fabric related information goes here.",
    line: "M420 350 L580 420 L620 520",
    circleX: 625,
    circleY: 530,
    labelX: 640,
    labelY: 565,
  },
  {
    name: "Designer",
    color: "#f2b466",
    desc: "Designer related information goes here.",
    line: "M430 315 L500 455 L470 570",
    circleX: 465,
    circleY: 580,
    labelX: 470,
    labelY: 620,
  },
  {
    name: "Knowledge",
    color: "#9e9e9e",
    desc: "Knowledge related information goes here.",
    line: "M450 320 L430 460 L330 540",
    circleX: 325,
    circleY: 540,
    labelX: 250,
    labelY: 560,
  },
  {
    name: "Fiber",
    color: "#cdb6df",
    desc: "Fiber related information goes here.",
    line: "M470 330 L360 440 L220 440",
    circleX: 210,
    circleY: 440,
    labelX: 140,
    labelY: 430,
  },
  {
    name: "Logistic",
    color: "#9c9c9c",
    desc: "Logistic related information goes here.",
    line: "M460 350 L320 380 L210 310",
    circleX: 200,
    circleY: 300,
    labelX: 130,
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
          className="relative mx-auto w-full max-w-225"
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

"use client";

import Image from "next/image";
import { PiInfoDuotone } from "react-icons/pi";

const VIEW_W = 900;
const VIEW_H = 800;

const nodes = [
  {
    name: "Machine",
    color: "#d0a4dd",
    line: "M430 360 L320 260 L300 160",
    circleX: 300,
    circleY: 160,
    labelX: 250,
    labelY: 115,
  },
  {
    name: "Garments",
    color: "#ff7676",
    line: "M450 350 L430 290 L480 130",
    circleX: 480,
    circleY: 130,
    labelX: 470,
    labelY: 90,
  },
  {
    name: "Consultant",
    color: "#77bce8",
    line: "M450 350 L500 280 L630 180",
    circleX: 630,
    circleY: 180,
    labelX: 640,
    labelY: 140,
    glow: true,
  },
  {
    name: "Yarn",
    color: "#a8b7e9",
    line: "M450 350 L560 310 L710 330",
    circleX: 710,
    circleY: 330,
    labelX: 745,
    labelY: 335,
  },
  {
    name: "Buy",
    color: "#86dcb2",
    line: "M450 350 L590 390 L700 480",
    circleX: 700,
    circleY: 480,
    labelX: 740,
    labelY: 490,
  },
  {
    name: "Fabric",
    color: "#9eb8ef",
    line: "M450 350 L580 470 L610 620",
    circleX: 610,
    circleY: 620,
    labelX: 610,
    labelY: 700,
  },
  {
    name: "Designer",
    color: "#f2b466",
    line: "M450 350 L520 510 L460 650",
    circleX: 460,
    circleY: 650,
    labelX: 405,
    labelY: 720,
  },
  {
    name: "Knowledge",
    color: "#9e9e9e",
    line: "M450 350 L430 520 L320 580",
    circleX: 320,
    circleY: 580,
    labelX: 210,
    labelY: 590,
  },
  {
    name: "Fiber",
    color: "#cdb6df",
    line: "M450 350 L370 420 L230 400",
    circleX: 230,
    circleY: 400,
    labelX: 120,
    labelY: 405,
  },
  {
    name: "Logistic",
    color: "#9c9c9c",
    line: "M450 350 L330 360 L230 330",
    circleX: 230,
    circleY: 330,
    labelX: 100,
    labelY: 335,
  },
];

export default function AgamaMap() {
  return (
    <div className="py-20 bg-[#f4f4f4]">
      <h2 className="text-center text-5xl font-bold mb-12">ITAGAMA Map</h2>

      <div
        className="relative mx-auto w-full max-w-[900px]"
        style={{ aspectRatio: `${VIEW_W} / ${VIEW_H}` }}
      >
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          className="absolute inset-0 w-full h-full"
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

          {nodes.map((item, i) => (
            <path
              key={`line-${i}`}
              d={item.line}
              stroke={item.color}
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}

          {nodes.map((item, i) => (
            <circle
              key={`circle-${i}`}
              cx={item.circleX}
              cy={item.circleY}
              r="22"
              fill={item.color}
              filter={item.glow ? "url(#consultantGlow)" : undefined}
            />
          ))}

          <foreignObject x="370" y="290" width="160" height="120">
            <div className="bg-white border-2 border-green-500 rounded-xl flex items-center justify-center h-full w-full shadow-sm">
              <Image src="/logo.png" alt="Agama" width={120} height={70} />
            </div>
          </foreignObject>
        </svg>

        {nodes.map((item, i) => (
          <div
            key={`label-${i}`}
            className="absolute flex items-center gap-1 font-bold text-gray-500 whitespace-nowrap pointer-events-none -translate-x-1/2"
            style={{
              left: `${(item.labelX / VIEW_W) * 100}%`,
              top: `${(item.labelY / VIEW_H) * 100}%`,
            }}
          >
            {item.name}
            <PiInfoDuotone className="text-gray-400" />
          </div>
        ))}
      </div>
    </div>
  );
}

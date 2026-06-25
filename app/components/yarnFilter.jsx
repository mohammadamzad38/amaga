"use client";

import PriceFilter from "./priceFilter";

const fiberOptions = [
  "Jute",
  "Cotton",
  "Polyester",
  "Millange",
  "Viscose",
  "Others",
];

const qualityOptions = [
  "100% Cotton OE",
  "100% Cotton CM",
  "100% Cotton MVS CM",
  "Combed Compact",
  "CM",
  "OE",
  "CD",
  "CD SIRO",
  "OE CVC 80 Cotton, 20 Poly",
  "CMP",
  "TCd (65:35)",
  "OE 100% Virgin Cotton",
  "100% Viscose Ring",
  "100% Viscose MVS",
  "100% Polyester",
  "OE A Grade",
  "CSY",
  "100% Cotton Open End",
  "TCm (65% Po:35% Co) Ring",
  "TCp (65% Po:35% Co) Compact",
  "CVCp (60%Co:40%Po) Compact",
  "TR (65% Po:35% Ra) Ring",
  "Others",
];

const yarnCountOptions = [
  "Ne 10/1",
  "Ne 20/1",
  "Ne 26/1",
  "Ne 30/1",
  "Ne 32/1",
  "Ne 40/1",
  "Ne 46/1",
  "Ne 50/1",
  "Ne 60/1",
  "Others",
];

const specialityOptions = [
  "Conventional",
  "Organic",
  "BCI",
  "Contamination controlled",
  "CMIA",
  "Fairtrade",
  "Others",
];

const CheckboxGroup = ({ title, options, selected, onChange }) => {
  const handleToggle = (item) => {
    const updated = selected.includes(item)
      ? selected.filter((i) => i !== item)
      : [...selected, item];

    onChange(updated);
  };

  return (
    <div className="bg-white p-4">
      <h2 className="text-sm font-semibold mb-3">{title}</h2>

      <div className="space-y-2 max-h-[120px] overflow-y-auto">
        {options.map((item) => (
          <label
            key={item}
            className="flex items-center gap-2 text-sm cursor-pointer"
          >
            <input
              type="checkbox"
              checked={selected.includes(item)}
              onChange={() => handleToggle(item)}
              className="w-4 h-4 accent-green-500"
            />
            <span>{item}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default function YarnFilter({
  fiber = [],
  setFiber = () => {},

  quality = [],
  setQuality = () => {},

  yarnCount = [],
  setYarnCount = () => {},

  speciality = [],
  setSpeciality = () => {},
}) {
  return (
    <div>
      <CheckboxGroup
        title="Fiber"
        options={fiberOptions}
        selected={fiber}
        onChange={setFiber}
      />

      <div className="bg-white p-4">
        <PriceFilter />
      </div>

      <CheckboxGroup
        title="Quality"
        options={qualityOptions}
        selected={quality}
        onChange={setQuality}
      />

      <CheckboxGroup
        title="Yarn Count"
        options={yarnCountOptions}
        selected={yarnCount}
        onChange={setYarnCount}
      />

      <CheckboxGroup
        title="Speciality Yarns"
        options={specialityOptions}
        selected={speciality}
        onChange={setSpeciality}
      />
    </div>
  );
}

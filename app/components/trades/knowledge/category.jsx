import React from "react";

const categoriesList = [
  { label: "Fabric Cutting Pattern", value: 59 },
  { label: "Knit Print Design", value: 60 },
  { label: "Woven Print Design", value: 61 },
  { label: "Fashion", value: 62 },
  { label: "Children", value: 63 },
  { label: "Ladies", value: 64 },
  { label: "Men", value: 65 },
  { label: "Sports", value: 66 },
  { label: "Undergarment", value: 67 },
  { label: "Traditional", value: 68 },
  { label: "Accounting", value: 69 },
  { label: "Garments", value: 70 },
  { label: "Embroidery Design", value: 71 },
  { label: "T-shirt Prints", value: 72 },
  { label: "Others", value: 73 },
];

const Category = ({ handleCategory, category }) => {
  return (
    <div className="bg-white p-4">
      <h2 className="text-sm font-semibold mb-3">CATEGORIES</h2>

      <div className="space-y-2 max-h-50 overflow-y-auto">
        {categoriesList.map((item) => (
          <label
            key={item.value}
            className="flex items-center max-w-lg gap-2 text-xs cursor-pointer"
          >
            <input
              type="checkbox"
              checked={category.includes(item.value)}
              onChange={() => handleCategory(item.value)}
              className="accent-green-500 w- h-4"
            />
            {item.label}
          </label>
        ))}
      </div>
    </div>
  );
};

export default Category;

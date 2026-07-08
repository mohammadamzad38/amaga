import React from "react";

const categoriesList = [
  { label: "Cotton", value: 19 },
  { label: "Fiber", value: 20 },
  { label: "Yarn", value: 21 },
  { label: "Machinery", value: 81 },
  { label: "Science", value: 22 },
  { label: "Finance", value: 23 },
  { label: "Markets", value: 24 },
  { label: "Garments", value: 25 },
  { label: "News", value: 26 },
  { label: "Sustainable", value: 27 },
  { label: "Organic", value: 28 },
  { label: "BCI", value: 29 },
  { label: "Ginning", value: 30 },
  { label: "Fashion", value: 31 },
  { label: "Logistics", value: 32 },
  { label: "Innovation", value: 33 },
  { label: "Trade Rules", value: 34 },
  { label: "Textile Science", value: 35 },
  { label: "Climate", value: 88 },
  { label: "Arts and culture", value: 83 },
  { label: "Sports", value: 84 },
  { label: "Commodities", value: 85 },
  { label: "Entertainment", value: 86 },
  { label: "Health and Fitness", value: 87 },
  { label: "Other", value: 36 },
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

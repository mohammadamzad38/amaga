import React from "react";

const categoriesList = [
  "Outwear",
  "Pants/Botoms",
  "Fabric",
  "Basic Knit",
  "Undergarment",
  "Design Story/Concept",
  "Headwear",
  "T-shirt",
  "Pre-owned",
  "Others",
];

const Category = ({ category = [], setCategory }) => {
  const handleCategory = (item) => {
    if (category.includes(item)) {
      setCategory(category.filter((i) => i !== item));
    } else {
      setCategory([...category, item]);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {categoriesList.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => handleCategory(item)}
          className={`px-4 py-2 rounded-full cursor-pointer text-xs font-semibold border transition ${
            category.includes(item)
              ? "bg-[#1DBF74] text-white"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default Category;

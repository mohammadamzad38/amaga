import React from "react";

const ContentType = ({ setContentType, contentType }) => {
  const articleTypes = [
    { label: "All", value: "" },
    { label: "Article", value: "2" },
    { label: "Blog", value: "1" },
  ];

  return (
    <div className="flex gap-4 items-center justify-center">
      {articleTypes.map((item) => (
        <label
          key={item.value || "all"}
          className="flex items-center gap-2 text-xs cursor-pointer"
        >
          <input
            type="radio"
            name="contentType"
            value={item.value}
            checked={contentType === item.value}
            onChange={(e) => setContentType(e.target.value)}
            className="w-4 h-4"
          />
          {item.label}
        </label>
      ))}
    </div>
  );
};

export default ContentType;

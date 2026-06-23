"use client";

const Sort = ({ sorted, setSorted }) => {
  return (
    <div className="flex gap-3 items-center  justify-between">
      <div className="flex  items-center gap-2">
        <p>Sort By</p>
        <select
          value={sorted}
          onChange={(e) => setSorted(e.target.value)}
          className="px-3 text-sm py-2 bg-white shadow outline-none rounded-md"
        >
          <option value="new">New to Old</option>
          <option value="old">Old to New</option>
        </select>
      </div>
    </div>
  );
};

export default Sort;

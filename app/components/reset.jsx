"use client";

import { GrPowerReset } from "react-icons/gr";

const Reset = ({ onReset }) => {
  return (
    <div>
      <button
        onClick={onReset}
        className="px-4 cursor-pointer flex items-center gap-2 py-2 bg-white shadow rounded-md"
      >
        <GrPowerReset size={15} />
        Reset
      </button>
    </div>
  );
};

export default Reset;

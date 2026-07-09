import React from "react";
import SustainNavBTN from "./sustainNavBTN";

const Page = () => {
  return (
    <div>
      <div
        className="min-h-screen w-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/bg-sustain.jpg')" }}
      >
        <div className="p-15">
          <SustainNavBTN />
        </div>
      </div>
    </div>
  );
};

export default Page;

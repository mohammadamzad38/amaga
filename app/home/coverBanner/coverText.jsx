import { PiTrademark } from "react-icons/pi";

const CoverText = () => {
  return (
    <div>
      <div className="text-[30px] md:text-[50px] font-bold mb-2.5 text-center pt-14">
        <p className="flex gap-2 justify-center">
          Micro-Platform
          <span>
            <PiTrademark />
          </span>
        </p>
        <p> for The Textile World.</p>
      </div>
      <p className="mb-4 text-[#4f4f4f] text-center mx-auto w-[70%] lg:w-[60%]">
        A platform for transparency, price discovery, connecting direct,
        consultant’s access, designer’s access, market knowledge & information.
      </p>
    </div>
  );
};

export default CoverText;

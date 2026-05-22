import Image from "next/image";
// import { FaShareAlt } from "react-icons/fa";
import sallerData from "../../jsonData/saller";
import SocialShare from "../socialShare/socialShare";

const Saller = () => {
  return (
    <div className="pt-12.5 pb-20">
      <p className="text-[24px] font-bold pb-7.5">Top Retailers</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {sallerData.map((item, idx) => (
          <div
            key={idx}
            className="w-full max-w-sm bg-[#F6F6F6] rounded-lg mx-auto  p-4 flex flex-col gap-4"
          >
            <div
              className="w-full h-60 
            rounded-xl overflow-hidden"
            >
              <Image
                src={item.image}
                alt={item.name}
                width={500}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <p className="font-bold text-lg">{item.name}</p>
                <a
                  href={item.webUrl}
                  target="_blank"
                  className="text-sm text-blue-500 hover:underline"
                >
                  {item.webUrl}
                </a>
              </div>

              {/* <button className="p-2 rounded-full hover:bg-gray-100 transition">
                <FaShareAlt className="text-gray-600" />
              </button> */}
              <SocialShare />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Saller;

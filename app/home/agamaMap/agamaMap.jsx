import Image from "next/image";
import { PiInfoDuotone } from "react-icons/pi";

const AgamaMap = () => {
  const mapList = [
    { name: "Fiber", image: "/steps/1_.png", rotate: "10deg" },
    { name: "Machinery", image: "/steps/2_.png", rotate: "0deg" },
    { name: "Yarn", image: "/steps/3_.png", rotate: "5deg" },
    { name: "Fabric", image: "/steps/4_.png", rotate: "25deg" },
    { name: "Buy", image: "/steps/5_.png", rotate: "-30deg" },
    { name: "Design", image: "/steps/6_.png", rotate: "40deg" },
    { name: "Consultant", image: "/steps/8_.png", rotate: "20deg" },
    { name: "Garment", image: "/steps/9_.png", rotate: "50deg" },
    { name: "Knowledge", image: "/steps/10_.png", rotate: "60deg" },
  ];

  return (
    <div className="pt-20 pb-25">
      <p className="text-center font-bold text-[32px] pb-12">ITAGAMA Map</p>

      {/* <div>
        <div className="absolute">
          <div className="relative top-0 left-0">
            <button className="flex gap-3 cursor-pointer text-[26px] text-gray-400 hover:text-black font-bold">
              Garments
              <PiInfoDuotone className="" />
            </button>
          </div>

          <div className="">
            <Image
              src="/steps/1_.png"
              alt={"item.name"}
              width={220}
              height={220}
              className="object-contain w-100 h-100"
            />
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default AgamaMap;

import Image from "next/image";
import Link from "next/link";
import { PiLinkBold } from "react-icons/pi";

const QuickAccess = () => {
  const itemList = [
    { name: "Fiber", path: "/trade/fiber", image: "/chain/chain-item-two.png" },
    { name: "Machinery", path: "/machinery", image: "/chain/machine.png" },
    {
      name: "Yarn",
      path: "/trade/yarn",
      image: "/chain/chain-item-three.png",
    },
    {
      name: "Fabric",
      path: "/trade/fabric",
      image: "/chain/chain-item-one.png",
    },
    { name: "Buy", path: "/trade/buy", image: "/chain/shopping.png" },
    { name: "Design", path: "/trade/design", image: "/chain/blueprint.png" },
    {
      name: "Consultant",
      path: "/trade/consultant",
      image: "/chain/consultant.png",
    },
    { name: "Garment", path: "/trade/garment", image: "/chain/clothes.png" },
    {
      name: "Knowledge",
      path: "/trade/knowledge",
      image: "/chain/knowledge.png",
    },
    { name: "Logistic", path: "/trade/logistic", image: "/chain/box.png" },
  ];

  return (
    <div>
      <p className="text-xl font-semibold text-[#4f4f4f]">Quick Access</p>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-flow-col auto-cols-fr items-center gap-5 py-5 mb-8">
        {itemList.map((item, idx) => (
          <div key={idx}>
            <div className="flex justify-center">
              <div className="relative w-18 h-18 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#004cff] animate-[spin_10s_linear_infinite]"></div>

                <Link
                  href={item.path}
                  className="relative w-14 h-14 rounded-full border-4 border-[#b8b3b444] cursor-pointer overflow-hidden flex items-center justify-center shadow-[inset_0_4px_10px_rgba(255,255,255,0.9),0_15px_35px_rgba(0,0,0,0.25)] z-10 bg-cover bg-center bg-no-repeat group"
                  style={{
                    backgroundImage: "url('/chain/background.png')",
                  }}
                >
                  <div className="absolute inset-0 bg-[#b8b3b333] group-hover:bg-[#fff685] transition-all duration-300"></div>

                  <Image
                    src={item.image}
                    alt={item.name}
                    width={50}
                    height={50}
                    className="object-contain w-8 h-8 z-10"
                  />
                </Link>
              </div>
            </div>

            <p className="flex gap-2 items-center justify-center text-center font-bold text-xl mt-5">
              <PiLinkBold size={20} className="text-[#6596AF] font-bold" />
              {item.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickAccess;

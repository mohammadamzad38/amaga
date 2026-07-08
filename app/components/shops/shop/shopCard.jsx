import Image from "next/image";
import SocialShare from "@/app/home/socialShare/socialShare";

const ShopCard = ({ shopData, loading, title }) => {
  return (
    <div className="pt-12.5 pb-20">
      <p className="text-[24px] font-bold pb-7.5">{title}</p>
      {loading ? (
        <div className="col-span-full flex justify-center items-center py-20">
          <p className="text-lg font-medium text-gray-500">Loading ......</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {shopData.map((item, idx) => (
            <div
              key={idx}
              className="w-full max-w-sm bg-[#F6F6F6] rounded-lg mx-auto  p-4 flex flex-col gap-4"
            >
              <div
                className="w-full h-60 
            rounded-xl overflow-hidden"
              >
                <Image
                  src={"/images/company-logo.png"}
                  alt={item.id || "Web url"}
                  width={500}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex w-[80%] flex-col">
                  <a
                    href={item.url}
                    target="_blank"
                    className="text-sm line-clamp-1 overflow-hidden text-[#1DBF74] hover:text-blue-500 hover:underline"
                  >
                    {item.url}
                  </a>
                </div>

                <SocialShare />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShopCard;

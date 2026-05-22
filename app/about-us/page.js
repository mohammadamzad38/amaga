import Image from "next/image";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

const points = [
  "Micro-PlatformTM for The Textile World.",
  "A Platform for Transparency.",
  "Price Discovery.",
  "Connecting Direct.",
  "Consultant’s access.",
  "Designer’s access.",
  "Global access to Local Advisors and Support Network.",
  "Access to Design Story Boards & Marketing ideas.",
  "Market Knowledge & Information.",
  "Industry commentators an open platform.",
  "Open to Change send us your suggestions and we will try to incorporate into the platform.",
  "Integrating a Complex Market Place.",
  "ITagama - Still not sure ! Watch the video below.",
];

const About = () => {
  return (
    <div className="w-full">
      <div className="flex flex-col items-center pt-12">
        <Image
          src="/images/company-logo.png"
          alt="logo"
          width={160}
          height={60}
        />
      </div>

      <div className="max-w-3xl mx-auto mt-12 px-6 space-y-4">
        {points.map((item, idx) => (
          <div key={idx} className="flex items-start gap-3">
            <IoIosCheckmarkCircleOutline
              className="text-[#1DBF74] mt-1"
              size={20}
            />
            <p className="text-gray-700 text-[16px]">{item}</p>
          </div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto mt-14 px-6 pb-16">
        <div className="rounded-xl overflow-hidden shadow-lg">
          <div className="w-full h-112">
            <iframe
              className="w-full h-full rounded-xl"
              src="https://www.youtube.com/embed/S_VDQfd7m9c"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

import Link from "next/link";
import Image from "next/image";
import { MdSend } from "react-icons/md";

const Footer = () => {
  const socialList = [
    {
      name: "FACEBOOK",
      path: "https://www.facebook.com/ITagamaglobal?mibextid=ZbWKwL",
    },
    {
      name: "TWITTER",
      path: "https://www.youtube.com/channel/UCk_j_80SzjZYoPUfYAkB-Vw",
    },
    { name: "INSTAGRAM", path: "/" },
    {
      name: "LINKEDIN",
      path: "https://www.linkedin.com/in/it-agama-275545202/",
    },
  ];
  const year = new Date().getFullYear();
  const navLinks = [
    { name: "About Us", path: "/about-us" },
    { name: "Contact Us", path: "/contact-us" },
    { name: "Terms & Conditions", path: "/help?tab=terms-conditions" },
    { name: "Privacy Policy", path: "/help?tab=privacy-policy" },
  ];

  const resourceLinks = [
    { name: "Job Marketplace", path: "/job-resources" },
    { name: "Supplier Directory", path: "/supplier-directory" },
    { name: "Consultant Library", path: "/consultant-library" },
    { name: "Knowledge", path: "/knowledge" },
  ];
  return (
    <div>
      <div className="border-b-2 border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_2fr] lg:grid-cols-[3fr_1fr_1fr_2fr] items-center px-5 md:px-10 py-10 md:py-12.5 gap-3 lg:gap-6">
          <div>
            <Image
              width={500}
              height={60}
              src={"/images/company-logo.png"}
              alt="It Agama Logo"
              className="w-60 h-full object-cover mb-7.5 lg:mb-10"
            />
            <p className="text-sm font-semibold text-gray-600 tracking-[6px] pb-1.75">
              CONTACT
            </p>
            <a
              href="mailto:marketing@itagama.com"
              className="text-[#073347] font-bold text-xl hover:underline leading-[32.43px] pb-2.5"
            >
              marketing@itagama.com
            </a>
          </div>

          <div className="flex flex-col">
            <p className="text-[18px] font-semibold pb-2.25 text-[#1C2F41]">
              Navigation
            </p>
            {navLinks.map((item, idx) => (
              <Link
                className="text-sm leading-5 py-1.25 text-gray-500"
                href={item.path}
                key={idx}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="flex flex-col">
            <p className="text-[18px] font-semibold pb-2.25 text-[#1C2F41]">
              Resources
            </p>
            {resourceLinks.map((item, idx) => (
              <Link
                className="text-sm leading-5 py-1.25 text-gray-500"
                href={item.path}
                key={idx}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="flex flex-col">
            <p className="text-[18px] font-semibold pb-2.25 text-[#1C2F41]">
              Stay up to Date
            </p>
            <p className="text-sm leading-5 py-1.25 text-gray-500 mb-6 lg:mb-10">
              Stay Informed On How You Can Make a Difference
            </p>
            <form className="flex justify-between items-center p-2 lg:p-3 text-base bg-[#EEFDFF] shadow-sm border-[#DDF5F9] rounded-lg">
              <input
                type="email"
                placeholder="Email Address"
                className="outline-none"
              />
              <button className="bg-[#1DBF74] text-white cursor-pointer p-2 rounded-sm">
                <MdSend fontSize={20} />
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="flex flex-col text-center md:flex-row justify-between leading-5 gap-4 lg:leading-8  px-5 md:px-10 py-7.5 lg:py-8">
        <p className="text-[13px] font-medium">
          Copyright @ {year}, Itagama.com or its affiliates. All rights
          reserved.
        </p>
        <div className="flex gap-3 lg:gap-5 text-xs md:text-base justify-center items-center font-medium md:font-semibold text-[#073347]">
          {socialList.map((item, idx) => (
            <Link key={idx} href={item.path}>
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;

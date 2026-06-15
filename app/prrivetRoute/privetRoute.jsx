"use client";

import { usePathname } from "next/navigation";
import CategoryNav from "../components/header/categoryNav";

const PrivetRoute = ({ children }) => {
  const pathName = usePathname();
  const isHideNav = pathName === "/";
  return (
    <>
      {!isHideNav && <CategoryNav />}
      {children}
    </>
  );
};

export default PrivetRoute;

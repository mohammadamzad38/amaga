"use client";

import { useAuth } from "@/context/authContext";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import CategoryNav from "../components/header/categoryNav";

const protectedRoutes = ["/trade", "/dashboard", "/profile"];

const PrivateRoute = ({ children }) => {
  const { token } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const isProtected = protectedRoutes.some((path) => pathname.startsWith(path));

  useEffect(() => {
    if (isProtected && !token) {
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [token, pathname, isProtected, router]);

  return (
    <>
      {pathname !== "/" && <CategoryNav />}

      {children}
    </>
  );
};

export default PrivateRoute;

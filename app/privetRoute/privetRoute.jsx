"use client";

import { useAuth } from "@/context/authContext";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import CategoryNav from "../components/header/categoryNav";

const protectedRoutes = [
  "/trade",
  "/sustainable",
  "/shop",
  "/dashboard",
  "/profile",
];

const PrivateRoute = ({ children }) => {
  const { token, isInitialized } = useAuth();

  const pathname = usePathname();
  const router = useRouter();

  const isProtected = protectedRoutes.some((path) => pathname.startsWith(path));

  useEffect(() => {
    // Wait until auth is restored from localStorage
    if (!isInitialized) return;

    if (isProtected && !token) {
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [isInitialized, token, pathname, isProtected, router]);

  if (!isInitialized) {
    return null; // অথবা Loading...
  }

  return (
    <>
      {pathname !== "/" && <CategoryNav />}
      {children}
    </>
  );
};

export default PrivateRoute;

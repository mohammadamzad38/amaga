import { Geist, Geist_Mono } from "next/font/google";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import "./globals.css";
import { AuthProvider } from "@/context/authContext";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title:
    "Micro-Platform™ for The Textile World- B2B Textile Sourcing Platform - ITagama",
  description:
    "Social media-based textile platform - B2B textile sourcing platform - Connect textile professionals globally - ITagama",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col pt-30 md:pt-17 lg:pt-20">
        <AuthProvider>
          <Suspense
            fallback={
              <div className="min-h-screen flex items-center justify-center">
                Loading.........
              </div>
            }
          >
            <Header />
            <Toaster position="top-center" />
            <main className="flex-1">{children}</main>
          </Suspense>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}

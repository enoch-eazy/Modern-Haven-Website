"use client";
import React, { ReactNode, useContext, useEffect, useState } from "react";
import Image from "next/image";
// import Navbar from "./shared/TopBar";
import images from "../../public/images";
import { Toaster } from "sonner";
import Navbar from "./shared/Navbar";
import Footer from "./shared/Footer";
type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  const [loaderIsVisible, setLoaderIsVisible] = useState(true);
  const iswindow = typeof window !== "undefined" ? true : false;

  useEffect(() => {
    if (typeof window !== "undefined") {
      setLoaderIsVisible(false);
    }
  }, [iswindow]);

  return (
    <div>
      {!loaderIsVisible && (
        <div>
          <Toaster
            position="bottom-center"
            richColors
            closeButton
            toastOptions={{
              duration: 3000,
              unstyled: false,
            }}
          />
          <div className="flex flex-col min-h-screen w-full justify-between">
            <Navbar />
            <div>{children}</div>
            <Footer />
          </div>
        </div>
      )}
      {loaderIsVisible && (
        <div className="w-[100vw] h-[100vh] min-h-[100vh] grid place-items-center bg-white">
          <div className="w-44 h-40 border-white border">
            <Image
              width={100}
              height={100}
              src={images.logo}
              alt="logo"
              className="w-full h-full border-none object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}

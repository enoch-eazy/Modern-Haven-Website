"use client"

import { sectionPadding } from "@/app/styles/styles";
import images from "@/public/images";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function HeroSection() {
   
    const ImageCarousel = [
        {
            id: 1,
            image: images.hero,
            alt: "hero",
        },
        {
            id: 2,
            image: images.hero2,
            alt: "hero",
        },
        {
            id: 3,
            image: images.hero3,
            alt: "hero",
        },
        {
            id: 4,
            image: images.hero4,
            alt: "hero",
        },
        {
            id: 5,
            image: images.hero5,
            alt: "hero",
        },
        {
            id: 6,
            image: images.hero6,
            alt: "hero",
        },

    ]
    const [currentImage, setCurrentImage] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) => prev + 1 % ImageCarousel.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [currentImage]);

    return (
        <section className={`mb-10 relative`}>
            {/* Overlay */}
            <div className="absolute top-0 left-0 w-full h-full bg-white/60"></div>
            {/* Image */}
            <Image src={ImageCarousel[currentImage].image} alt={ImageCarousel[currentImage].alt} width={100} height={100} className="w-full md:h-[450px] object-cover object-[50%_10%]" />  
            <div className="text-white absolute top-0 left-0 w-full h-full flex flex-col gap-4 items-center justify-center"> 
                <h2 className="text-6xl font-bold">Your <span className="text-[#FFD700]">Cozy Era</span></h2>
                <p className="text-2xl text-white w-[25%] text-center">Get peak comfy-chic with new winter essentials</p>
                <Link href="/shop">
                <button className="hover:text-[#FFD700] hover:bg-black/80 transition-all duration-300 bg-black text-white px-10 py-2 rounded-md cursor-pointer">
                    Shop Now
                </button>
                </Link>
                </div>    

        </section>
    )
}
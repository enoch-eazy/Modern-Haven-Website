"use client"
import Button from "@/app/ui/button";
import images from "@/public/images";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function HeroSection() {
   
    const ImageCarousel = [
        {
            image: images?.hero,
            alt: "hero 1",
        },
        {
            image: images?.hero2,
            alt: "hero 2",
        },
        {
            image: images?.hero3,
            alt: "hero 3",
        },
        {
            image: images?.hero4,
            alt: "hero 4",
        },
        {
            image: images?.hero5,
            alt: "hero 5",
        },
        {
            image: images?.hero6,
            alt: "hero 6",
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
            <div className="absolute top-0 left-0 w-full h-full bg-black/60"></div>
            {/* Image */}
            <Image key={currentImage} src={ImageCarousel[currentImage].image} alt={ImageCarousel[currentImage].alt} width={100} height={100} className="w-full md:h-[450px] object-cover object-[50%_10%]" /> 
            {/* {ImageCarousel.map((image, index) => (
                <Image key={index} src={image.image} alt={image.alt} width={100} height={100} className="w-full md:h-[450px] object-cover object-[50%_10%]" />
            ))} */}

            <div className="text-white absolute top-0 left-0 w-full h-full flex flex-col gap-4 items-center justify-center"> 
                <h2 className="text-6xl font-bold">Your <span className="text-[#FFD700]">Cozy Era</span></h2>
                <p className="text-2xl text-white w-[25%] text-center">Get peak comfy-chic with new winter essentials</p>
                <Link href="/shop">
                    <Button >
                        Shop Now
                    </Button>
                </Link>
                </div>    

        </section>
    )
}
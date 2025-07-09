"use client"
import images from "@/public/images";
import { sectionPadding } from "../styles/styles";
import Button from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function AboutOverview() {
    const ImageList = [
        {
            Image: images.aboutUS_Img1,
            alt: "About Us Image 1"
        },
        {
            Image: images.aboutUs_Img2,
            alt: "About Us Image 2"
        },
        {
            Image: images.aboutUs_Img3,
            alt: "About Us Image 3"
        },
    ]
    const [currentImage, setCurrentImage] = useState(0)
    useEffect(() => {
        const interval = setInterval((prev) => {
            setCurrentImage((prev) => (prev + 1) % ImageList.length)
        }, 3000);
        return  () => clearInterval(interval)
    }, []);
    return (
       <section className={`${sectionPadding} py-0 md:py-20`}>
        <h1 className="text-2xl font-bold text-center text-[#0F2B22] md:mb-12 mb-8" >About Modern Haven Fashion</h1>
        <div className="flex flex-col gap-4 md:flex-row md:justify-between">
            <div className="order-2 md:order-1 flex flex-col gap-6 w-full md:w-[450px] justify-center">
                <h2 className="md:text-3xl text-xl font-bold">
                    Elevating Fashion Experiences with <span className="text-[#FFD700]">Modern Haven Fashion</span>
                </h2>
                <p className="md:text-base text-sm text-gray-500">
                Modern Haven Fashion is a leading lifestyle brand dedicated to Men’s Wear, Women’s Wear, and Kids’ Fashion & Gadgets. We believe in providing exceptional style with a focus on quality, comfort, and timeless design. With years of fashion experience and a deep understanding of modern trends, our team works tirelessly to ensure every shopping experience is smooth, inspiring, and aligned with your unique style. Whether you’re shopping for yourself, your family, or finding the perfect gift, Modern Haven Fashion is here to guide your style journey every step of the way.
                </p>
                <Link href={"/contact"}>
                <Button className="md:w-32 w-full">
                    Get in Touch
                </Button>
                </Link>
            </div>

            {/* Image Contents  */}
            <div className="order-1 md:order-2 w-full p-1 md:w-1/2 relative flex flex-row">
            {/* Desktop View  */}
                <div className="hidden md:block">
                    {/* 1st Image */}
                    <div className=" w-full h-full z-10">
                        <Image src={images.aboutUS_Img1} priority quality={100}  alt="About Modern Haven" className="object-cover w-[350px] h-[450px] rounded-l-4xl" />
                    </div>
                    {/* 2nd Image */}
                    <div className="absolute top-0 right-0 -translate-y-10 z-30">
                        <Image src={images.aboutUs_Img2} priority quality={100}  alt="About Modern Haven" className="object-cover w-[320px] h-[300px] rounded-4xl" />
                    </div>
                    {/* 3rd Image */}
                    <div 
                    className="absolute bottom-0 right-0 z-20 translate-y-8 translate-x-10">
                        <Image src={images.aboutUs_Img3} priority quality={100} alt="About Modern Haven" className="object-top object-cover w-[200px] md:w-[250px] h-[300px] rounded-4xl" />
                    </div>
                </div>

            {/* Mobile View */}
                <div className="md:hidden block">
                <Image 
                    key={currentImage} 
                    priority
                    quality={100}
                    src={ImageList[currentImage].Image} alt={ImageList[currentImage].alt}  
                    className="w-full h-fit object-cover object-top rounded-4xl" 
                /> 
                </div>
            </div>
        </div>

       </section>
    )
}
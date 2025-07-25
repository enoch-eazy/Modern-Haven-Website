import images from "@/public/images";
import Image from "next/image";
import { sectionPadding } from "../styles/styles";

export default function AboutHeroSection () {
    return (
        <div className={` mb-10 relative`}>
            {/* Overlay */}
            <div className="absolute top-0 left-0 w-full h-full bg-black/60"></div>
            {/* Image */}
            <Image 
            priority
            quality={100}
            src={images.AboutHero_Img1}  alt="About Us" className="w-full md:h-[585px] object-cover object-top" /> 
            {/* {ImageCarousel.map((image, index) => (
                <Image key={index} src={image.image} alt={image.alt} width={100} height={100} className="w-full md:h-[450px] object-cover object-[50%_10%]" />
            ))} */}
            <div className={` ${sectionPadding} text-white absolute top-0 left-0 w-full h-full flex flex-col gap-4 justify-center`}> 
                    <h2 
                    className="text-2xl md:text-6xl font-bold text-center md:text-left md:mt-0 mt-10">
                        About Modern Haven
                    </h2>
                    <p 
                    className="text-sm md:text-lg text-gray-200 w-full md:w-[55%] text-center md:text-left">
                        <span className="text-base md:text-2xl font-bold">
                            Discover the Heart of Modern Haven
                        </span><br />
                        We’re more than just a store — we’re a lifestyle. Built for families who love fashion and tech, Modern Haven brings you style, comfort, and quality all in one place.
                    </p>
                    {/* Please fill out the form below and we'll get back to you as soon as possible. */}
            </div>  
        </div>
    )
}
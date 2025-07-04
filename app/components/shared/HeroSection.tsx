import { ImageCarouselProps } from "@/app/components/models/ImagesList";
import Button from "@/app/ui/button"
import Image from "next/image";
import Link from "next/link"
import { useEffect, useState } from "react";

interface HeroSectionProps {
    plaintitle: string;
    highlightedtitle: string;
    description: string;
    image: ImageCarouselProps[];
}

const HeroSection: React.FC<HeroSectionProps> = ({plaintitle, highlightedtitle, description, image}) => {
    const [currentImage, setCurrentImage] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % image.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);
    return (
        <section className={`mb-10 relative`}>
            {/* Overlay */}
            <div className="absolute top-0 left-0 w-full h-full bg-black/60"></div>
            {/* Image */}
            <Image 
            key={currentImage} 
            priority
            quality={100}
            src={image[currentImage].image} alt={image[currentImage].alt} width={100} height={100} className="w-full md:h-[450px] object-cover object-[50%_10%]" /> 
            {/* {ImageCarousel.map((image, index) => (
                <Image key={index} src={image.image} alt={image.alt} width={100} height={100} className="w-full md:h-[450px] object-cover object-[50%_10%]" />
            ))} */}
            <div className="text-white absolute top-0 left-0 w-full h-full flex flex-col gap-4 items-center justify-center"> 
                <h2 className="text-6xl font-bold">{plaintitle} <span className="text-[#FFD700]">{highlightedtitle}</span></h2>
                <p className="text-2xl text-white w-[25%] text-center">{description}</p>
                <Link href="/shop">
                    <Button >
                        Shop Now
                    </Button>
                </Link>
                </div>    
        </section>
    )
}
export default HeroSection;
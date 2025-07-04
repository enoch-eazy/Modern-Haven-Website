
import { ImageMenCarousel } from "@/app/components/models/ImagesList";
import HeroSection from "../shared/HeroSection";

export default function HeroSectionHome() {
    return (
        <HeroSection 
        plaintitle="Your" 
        highlightedtitle="Cozy Era" 
        description="Get peak comfy-chic with new winter essentials" 
        image={ImageMenCarousel} />
    )
}
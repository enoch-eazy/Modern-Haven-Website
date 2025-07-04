
import { ImageMenCarousel } from "@/app/components/models/ImagesList";
import HeroSection from "../shared/HeroSection";

export default function HeroSectionHome() {
    return (
        <HeroSection 
        plaintitle="Welcome to Your" 
        highlightedtitle="Style Haven"
        description="Shop fashion-forward looks and family gadgets, all curated for you." 
        image={ImageMenCarousel} />
    )
}
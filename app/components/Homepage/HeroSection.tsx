import { ImageMenCarousel } from "@/app/components/models/ImagesList";
import images from "@/public/images";
import HeroSection from "../shared/HeroSection";

const homeSlides = [
    { id: 100, image: images.Playstation, alt: "Gaming console and controllers" },
    ...ImageMenCarousel.slice(0, 3),
    { id: 101, image: images.WomenHero_Img1, alt: "Women's fashion" },
];

export default function HeroSectionHome() {
    return (
        <HeroSection
            eyebrow="Gadgets · Fashion · Family"
            plaintitle="Tech and style,"
            highlightedtitle="one haven."
            description="From consoles and smart watches to everyday fashion for men, women, and kids. Everything the modern family needs in one cart."
            image={homeSlides}
            primaryCta={{ label: "Shop all products", href: "/shop" }}
            secondaryCta={{ label: "Browse gadgets", href: "/shop?category=gadgets" }}
        />
    );
}

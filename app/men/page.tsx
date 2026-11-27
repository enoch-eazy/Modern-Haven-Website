import type { Metadata } from "next";
import images from "@/public/images";
import HomeNavbar from "../components/shared/HomeNavbar";
import AboutCard from "../components/Homepage/AboutCard";
import HeroSection from "../components/shared/HeroSection";
import { ImageMenCarousel } from "../components/models/ImagesList";
import CategorySection from "../components/Homepage/CategorySection";
import { CategoryItemMen } from "../components/models/Category";
import HeroBanner from "../components/shared/HeroBanner";

export const metadata: Metadata = { title: "Men" };

export default function Men() {
    return (
        <>
            <HomeNavbar />
            <HeroSection
                eyebrow="Men"
                plaintitle="Your"
                highlightedtitle="cozy era"
                description="Peak comfy-chic with new essentials, plus the watches and gadgets to match."
                image={ImageMenCarousel}
                primaryCta={{ label: "Shop men's clothing", href: "/shop?category=clothing&audience=men" }}
                secondaryCta={{ label: "Men's gadgets", href: "/shop?category=gadgets&audience=men" }}
            />
            <CategorySection sectionTitle="Shop men's categories" categoryItem={CategoryItemMen} />
            <AboutCard
                sectionTitle="Men's fashion at Modern Haven"
                image={images.aboutImage}
                paragraph1="Fashion isn't just about trends. It's about presence and everyday confidence. Our collection brings together classic silhouettes, contemporary cuts, and smart essentials for every man's lifestyle: crisp shirts, rugged shoes, cosy knits, and watches that finish the look."
                paragraph2="Modern men want versatility, from the office to the weekend without trading comfort for style. Whether you're into minimalism or layering textures and tones, we've got pieces that let you express yourself with ease."
                order="right"
            />
            <HeroBanner />
        </>
    );
}

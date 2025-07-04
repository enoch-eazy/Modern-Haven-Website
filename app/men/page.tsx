"use client"
import HomeNavbar from "../components/shared/HomeNavbar";
import AboutCard from "../components/Homepage/AboutCard";
import images from "@/public/images";
import HeroSection from "../components/shared/HeroSection";
import { ImageMenCarousel } from "../components/models/ImagesList";
import TestimonialSection from "../components/Homepage/TestimonialSection";
import { TestimonialsMale } from "../components/models/Testimonial";
import CategorySection from "../components/Homepage/CategorySection";
import { CategoryItemMen } from "../components/models/Category";
import HeroBanner from "../components/shared/HeroBanner";

export default function Men() {
    
    return (
        <main>
            <HomeNavbar />
            <HeroSection 
            plaintitle="Your" 
            highlightedtitle="Cozy Era" 
            description="Get peak comfy-chic with new winter essentials" 
            image={ImageMenCarousel} />
            <AboutCard 
            sectionTitle="About Men's fashion" 
            image={images.aboutImage} 
            paragraph1="At Modern Haven, we believe fashion is not just about trends—it’s about personal presence and everyday excellence. Our curated collection brings together classic silhouettes, contemporary cuts, and smart essentials that speak to every man’s lifestyle. From premium shirts to rugged boots, casual joggers to sophisticated watches, we deliver the look that lets you lead with style—wherever life takes you" 
            paragraph2="Men’s fashion is a timeless blend of confidence, function, and style. From tailored suits to relaxed streetwear, modern men seek versatility in their wardrobes—an ability to move seamlessly from the boardroom to the weekend without compromising comfort or appearance. Whether you're embracing minimalism or layering textures and tones, today’s fashion empowers men to express their identity with poise." />
            <CategorySection sectionTitle="Category" categoryItem={CategoryItemMen} />
            <TestimonialSection sectionTitle="Testimonials" testimonials={TestimonialsMale} />
            <HeroBanner /> 
        </main>

    )
}
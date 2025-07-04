"use client"
import HomeNavbar from "../components/shared/HomeNavbar";
import AboutCard from "../components/Homepage/AboutCard";
import images from "@/public/images";
import HeroSection from "../components/shared/HeroSection";
import { ImageKidsCarousel } from "../components/models/ImagesList";
import TestimonialSection from "../components/Homepage/TestimonialSection";
import { TestimonialsKids, TestimonialsMale } from "../components/models/Testimonial";
import CategorySection from "../components/Homepage/CategorySection";
import { CategoryItemKids } from "../components/models/Category";
import HeroBanner from "../components/shared/HeroBanner";

export default function Kids() {
    
    return (
        <main>
            <HomeNavbar />
            <HeroSection 
            plaintitle="Your" 
            highlightedtitle="Cozy Era" 
            description="Get peak comfy-chic with new winter essentials" 
            image={ImageKidsCarousel} />
            <AboutCard 
            sectionTitle="About Kids's fashion" 
            image={images.aboutKid_Img} 
            paragraph1="At Modern Haven, we believe style starts young. Our Kids and Teenage Fashion collection is designed to help the next generation express their individuality with confidence and comfort. Whether it’s playful prints for toddlers or trendy streetwear for teens, we offer a wide range of outfits that blend style, durability, and fun." 
            paragraph2="From school days to weekend adventures, our fashion pieces are made to fit every moment of growing up. We carefully curate clothing and accessories that celebrate youth culture, keeping your young ones looking fresh, feeling confident, and ready to take on the world — one outfit at a time." />
            <CategorySection sectionTitle="Category" categoryItem={CategoryItemKids} />
            <TestimonialSection sectionTitle="Testimonials" testimonials={TestimonialsKids} />
            <HeroBanner /> 
        </main>

    )
}
"use client"
import HomeNavbar from "../components/shared/HomeNavbar";
import AboutCard from "../components/Homepage/AboutCard";
import images from "@/public/images";
import HeroSection from "../components/shared/HeroSection";
import { ImageWomenCarousel } from "../components/models/ImagesList";
import TestimonialSection from "../components/Homepage/TestimonialSection";
import { TestimonialsWomen } from "../components/models/Testimonial";
import CategorySection from "../components/Homepage/CategorySection";
import { CategoryItemWomen } from "../components/models/Category";
import HeroBanner from "../components/shared/HeroBanner";

export default function Women() {
    
    return (
        <main>
            <HomeNavbar />
            <HeroSection 
            plaintitle="Your" 
            highlightedtitle="Cozy Era" 
            description="Get peak comfy-chic with new winter essentials" 
            image={ImageWomenCarousel} />
            <AboutCard 
            sectionTitle="About Women's fashion" 
            image={images.WomenFashion} 
            paragraph1="At Modern Haven, women’s fashion is more than just clothing — it’s a statement of strength, elegance, and individuality. Our collection is carefully curated to empower women in every walk of life, offering timeless pieces and contemporary styles that fit workdays, weekends, and everything in between." 
            paragraph2="From flowing dresses and sharp blazers to everyday essentials and standout accessories, we blend comfort with sophistication. Whether you’re redefining your style or elevating your wardrobe, we bring you fashion that speaks your language — bold, graceful, and uniquely you." />
            <CategorySection sectionTitle="Category" categoryItem={CategoryItemWomen} />
            <TestimonialSection sectionTitle="Testimonials" testimonials={TestimonialsWomen} />
            <HeroBanner /> 
        </main>

    )
}
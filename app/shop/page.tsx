"use client"

import HomeNavbar from "../components/Homepage/HomeNavbar"
import HeroSection from "../components/shared/HeroSection"
import AboutSection from "../components/Homepage/AboutSection"
import Category from "../components/Homepage/Category"
import Testimonial from "../components/Homepage/Testimonial"
import HeroBanner from "../components/shared/HeroBanner"
import { ImageMenCarousel } from "../components/models/ImagesList"

export default function ShopPage() {
    return (
        <main>
            <HomeNavbar />
            <HeroSection 
            plaintitle="Your" 
            highlightedtitle="Cozy Era" 
            description="Get peak comfy-chic with new winter essentials" 
            image={ImageMenCarousel} />
            <AboutSection />
            <Category />
            <Testimonial />
            <HeroBanner />
        </main>
    )
}
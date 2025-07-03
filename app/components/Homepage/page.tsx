"use client"

import HomeNavbar from "./HomeNavbar";
import HeroSection from "./HeroSection";
import Category from "./Category";
import AboutSection from "./AboutSection";
import Testimonial from "./Testimonial";
import HeroBanner from "../shared/HeroBanner";

export default function HomePage() {
    return (
        <main>
            <HomeNavbar />
            <HeroSection />
            <AboutSection />
            <Category />
            <Testimonial />
            <HeroBanner />
        </main>
    )
}
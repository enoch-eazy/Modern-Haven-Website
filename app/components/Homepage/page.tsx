"use client"

import HomeNavbar from "../shared/HomeNavbar";
import HeroSection from "./HeroSection";
import Category from "./Category";
import AboutSection from "./AboutSection";
import Testimonial from "./Testimonial";
import HeroBanner from "../shared/HeroBanner";
import NewArrivals from "./NewArrivals";

export default function HomePage() {
    return (
        <main>
            {/* <HomeNavbar /> */}
            <div className="mt-10"></div>
            <HeroSection />
            <AboutSection />
            <Category />
            <NewArrivals />
            <Testimonial />
            <HeroBanner />
        </main>
    )
}
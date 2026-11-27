import type { Metadata } from "next";
import AboutHeroSection from "../components/about/AboutHeroSection";
import AboutOverview from "../components/about/AboutOverview";
import CoreValues from "../components/about/CoreValues";
import CategorySection from "../components/Homepage/CategorySection";
import { CategoryItem } from "../components/models/Category";
import HeroBanner from "../components/shared/HeroBanner";

export const metadata: Metadata = { title: "About us" };

export default function AboutPage() {
    return (
        <>
            <AboutHeroSection />
            <AboutOverview />
            <CoreValues />
            <CategorySection sectionTitle="Shop by category" categoryItem={CategoryItem} />
            <HeroBanner />
        </>
    );
}

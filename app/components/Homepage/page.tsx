import { sectionPadding } from "@/app/styles/styles";
import HomeNavbar from "./HomeNavbar";
import HeroSection from "./HeroSection";
import Category from "./Category";
import AboutSection from "./AboutSection";
import Testimonial from "./Testimonial";

export default function HomePage() {
    return (
        <main>
            <HomeNavbar />
            <HeroSection />
            <AboutSection />
            <Category />
            <Testimonial />
        </main>
    )
}
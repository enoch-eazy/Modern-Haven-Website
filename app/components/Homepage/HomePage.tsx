import HeroSection from "./HeroSection";
import ValueProps from "./ValueProps";
import Departments from "./Departments";
import FeaturedProducts from "./FeaturedProducts";
import AboutSection from "./AboutSection";
import Category from "./Category";
import NewArrivals from "./NewArrivals";
import HeroBanner from "../shared/HeroBanner";

export default function HomePage() {
    return (
        <>
            <HeroSection />
            <ValueProps />
            <Departments />
            <FeaturedProducts />
            <NewArrivals />
            <AboutSection />
            <Category />
            <HeroBanner />
        </>
    );
}

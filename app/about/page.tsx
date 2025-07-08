import Category from "../components/Homepage/Category";
import { AboutImage } from "../components/models/ImagesList";
import HeroSection from "../components/shared/HeroSection";
import AboutOverview from "./AboutOverview";
import CallToAction from "./CallToAction";
import CoreValues from "./CoreValues";
import OurPromise from "./OurPromise";

export default function AbouutPage() {
    return (
        <div>
            <HeroSection 
            plaintitle="About Modern Haven"
            description="Fashion and tech for the modern family."
            image={AboutImage}
            />
            <AboutOverview />
            <CoreValues />
            <Category />
            <OurPromise />
            <CallToAction />

        </div>
    )
}
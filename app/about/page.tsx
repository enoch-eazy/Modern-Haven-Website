import Category from "../components/Homepage/Category";
import { AboutImage } from "../components/models/ImagesList";
import HeroSection from "../components/shared/HeroSection";
import { sectionPadding } from "../styles/styles";
import AboutOverview from "./AboutOverview";
import CallToAction from "./CallToAction";
import CoreValues from "./CoreValues";
import OurPromise from "./OurPromise";

import AboutHeroSection from "./AboutHeroSection";
import { motion } from "framer-motion"

const sectionVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  };
export default function AbouutPage() {
    return (
        <main>
             {/* <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionVariants}>
                
            </motion.div> */}
            <AboutHeroSection />
            <AboutOverview />
            <CoreValues />
            {/* <Category /> */}
            <OurPromise />
            <CallToAction />
        
        </main>
    )
}
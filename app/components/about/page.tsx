import Category from "../Homepage/Category";
import { AboutImage } from "../models/ImagesList";
import HeroSection from "../shared/HeroSection";
import { sectionPadding } from "../../styles/styles";
import AboutOverview from "./AboutOverview";
import CallToAction from "./CallToAction";
import CoreValues from "./CoreValues";
import OurPromise from "./OurPromise";

import AboutHeroSection from "./AboutHeroSection";
import { motion } from "framer-motion"
import CategorySection from "../Homepage/CategorySection";
import { CategoryItem } from "../models/Category";

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
            <CategorySection sectionTitle="Shop by Category" categoryItem={CategoryItem} />
            {/* <OurPromise />
            <CallToAction /> */}
        
        </main>
    )
}
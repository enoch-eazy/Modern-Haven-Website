import AboutHeroSection from "../components/about/AboutHeroSection";
import AboutOverview from "../components/about/AboutOverview";
import CoreValues from "../components/about/CoreValues";
import CategorySection from "../components/Homepage/CategorySection";
import { CategoryItem } from "../components/models/Category";


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
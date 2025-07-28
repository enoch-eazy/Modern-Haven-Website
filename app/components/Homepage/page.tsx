"use client"

import { motion } from "framer-motion";
import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
import Category from "./Category";
import NewArrivals from "./NewArrivals";
import Testimonial from "./Testimonial";
import HeroBanner from "../shared/HeroBanner";

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};
export default function HomePage() {
  return (
    <main>
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionVariants}>
        <HeroSection />
      </motion.div>
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionVariants}>
        <AboutSection />
      </motion.div>
      {/* <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionVariants}> */}
        <Category />
      {/* </motion.div> */}
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionVariants}>
        <NewArrivals />
      </motion.div>
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionVariants}>
        <Testimonial />
      </motion.div>
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionVariants}>
        <HeroBanner />
      </motion.div>
    </main>
  );
}
import images from "@/public/images";
import AboutCard from "./AboutCard";
import React from "react";

const AboutSection: React.FC = () => {
    return (
        <section>
            <AboutCard 
            sectionTitle="About Modern Haven" 
            image={images.AboutModern_Img} 
            paragraph1="Modern Haven is where fashion meets lifestyle for the modern family. We bring together curated collections of men’s and women’s wear, stylish accessories, and fun gadgets for kids and teens—all in one seamless shopping experience. Whether you're upgrading your wardrobe, finding the perfect gift, or discovering the latest tech toys, Modern Haven helps you shop smart, live stylishly, and enjoy life’s little moments." 
            paragraph2="Our passion is creating a space where style, quality, and family values come together effortlessly. From timeless fashion essentials to playful gadgets, we believe shopping should be easy, inspiring, and inclusive. Welcome to Modern Haven — your trusted destination for fashion and lifestyle for every member of the family." />
        </section>
    )
}
export default AboutSection;
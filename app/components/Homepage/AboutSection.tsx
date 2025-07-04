import images from "@/public/images";
import AboutCard from "./AboutCard";
import React from "react";

const AboutSection: React.FC = () => {
    return (
        <section>
            <AboutCard sectionTitle="About Men's fashion" image={images.aboutImage} paragraph1="Men’s fashion is a timeless blend of confidence, function, and style. From tailored suits to relaxed streetwear, modern men seek versatility in their wardrobes—an ability to move seamlessly from the boardroom to the weekend without compromising comfort or appearance. Whether you're embracing minimalism or layering textures and tones, today’s fashion empowers men to express their identity with poise." paragraph2="At Modern Haven, we believe fashion is not just about trends—it’s about personal presence and everyday excellence. Our curated collection brings together classic silhouettes, contemporary cuts, and smart essentials that speak to every man’s lifestyle. From premium shirts to rugged boots, casual joggers to sophisticated watches, we deliver the look that lets you lead with style—wherever life takes you." />
        </section>
    )
}
export default AboutSection;
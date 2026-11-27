import images from "@/public/images";
import AboutCard from "./AboutCard";

export default function AboutSection() {
    return (
        <AboutCard
            sectionTitle="About Modern Haven"
            image={images.AboutModern_Img}
            paragraph1="Modern Haven is where tech meets style for the modern family. We bring together gadgets, from gaming consoles and controllers to watches and fitness gear, alongside curated clothing for men, women, kids, and teens. Upgrading your wardrobe, finding the perfect gift, or grabbing the latest gadget? It's all in one place."
            paragraph2="We're a small, growing Lagos shop, and we pick every product with care. Shopping should be easy, inspiring, and personal, so if you can't find something you're looking for, just ask us."
        />
    );
}

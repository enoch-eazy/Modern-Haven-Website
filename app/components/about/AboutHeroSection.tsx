import images from "@/public/images";
import PageHero from "../shared/PageHero";

export default function AboutHeroSection() {
    return (
        <PageHero image={images.AboutHero_Img1} eyebrow="About us" title="Discover the heart of Modern Haven">
            We&apos;re more than a store. Built for families who love fashion and tech, Modern Haven brings you style,
            comfort, and quality in one place.
        </PageHero>
    );
}

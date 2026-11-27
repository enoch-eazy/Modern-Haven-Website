import type { Metadata } from "next";
import images from "@/public/images";
import HomeNavbar from "../components/shared/HomeNavbar";
import AboutCard from "../components/Homepage/AboutCard";
import HeroSection from "../components/shared/HeroSection";
import { ImageWomenCarousel } from "../components/models/ImagesList";
import TestimonialSection from "../components/Homepage/TestimonialSection";
import { TestimonialsWomen } from "../components/models/Testimonial";
import CategorySection from "../components/Homepage/CategorySection";
import { CategoryItemWomen } from "../components/models/Category";
import HeroBanner from "../components/shared/HeroBanner";

export const metadata: Metadata = { title: "Women" };

export default function Women() {
    return (
        <>
            <HomeNavbar />
            <HeroSection
                eyebrow="Women"
                plaintitle="Effortless"
                highlightedtitle="every day"
                description="Flowing dresses, sharp jackets, and the bags and accessories that pull it all together."
                image={ImageWomenCarousel}
                primaryCta={{ label: "Shop women's clothing", href: "/shop?category=clothing&audience=women" }}
                secondaryCta={{ label: "Browse gadgets", href: "/shop?category=gadgets" }}
            />
            <CategorySection sectionTitle="Shop women's categories" categoryItem={CategoryItemWomen} />
            <AboutCard
                sectionTitle="Women's fashion at Modern Haven"
                image={images.WomenFashion}
                paragraph1="Women's fashion at Modern Haven is more than clothing. It's a statement of strength, elegance, and individuality. We pick timeless pieces and contemporary styles that work for workdays, weekends, and everything in between."
                paragraph2="From flowing dresses and sharp blazers to everyday essentials and standout accessories, we blend comfort with sophistication. Redefining your style or elevating your wardrobe, we've got fashion that speaks your language."
                order="right"
            />
            <TestimonialSection sectionTitle="What customers say" testimonials={TestimonialsWomen} />
            <HeroBanner />
        </>
    );
}

import type { Metadata } from "next";
import images from "@/public/images";
import HomeNavbar from "../components/shared/HomeNavbar";
import AboutCard from "../components/Homepage/AboutCard";
import HeroSection from "../components/shared/HeroSection";
import { ImageKidsCarousel } from "../components/models/ImagesList";
import CategorySection from "../components/Homepage/CategorySection";
import { CategoryItemKids } from "../components/models/Category";
import HeroBanner from "../components/shared/HeroBanner";

export const metadata: Metadata = { title: "Kids & Teens" };

export default function Kids() {
    return (
        <>
            <HomeNavbar />
            <HeroSection
                eyebrow="Kids & Teens"
                plaintitle="Play hard,"
                highlightedtitle="look fresh"
                description="Consoles, controllers, and toys, plus hoodies, tees, and sneakers built for growing up."
                image={ImageKidsCarousel}
                primaryCta={{ label: "Shop kids & teens", href: "/shop?audience=kids" }}
                secondaryCta={{ label: "Games & consoles", href: "/shop?audience=kids&category=gadgets" }}
            />
            <CategorySection sectionTitle="Shop kids' & teens' categories" categoryItem={CategoryItemKids} />
            <AboutCard
                sectionTitle="Kids' & teens' fashion and gadgets"
                image={images.aboutKid_Img}
                paragraph1="Style starts young. Our kids and teens collection helps the next generation express themselves with confidence and comfort, from playful prints to trendy streetwear, with outfits that blend style, durability, and fun."
                paragraph2="And because growing up is also about play, we stock the consoles, controllers, and toys they'll love. School days, weekends, and game nights: we've got them covered."
                order="right"
            />
            <HeroBanner />
        </>
    );
}

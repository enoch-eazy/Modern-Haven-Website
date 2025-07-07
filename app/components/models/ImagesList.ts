import images from "@/public/images";
import { StaticImageData } from "next/image";

export interface ImageCarouselProps {
    id: number;
    image: StaticImageData;
    alt: string;
}

export const ImageMenCarousel: ImageCarouselProps[] = [
    {
        id: 1,
        image: images.hero,
        alt: "hero 1",
    },
    {
        id: 2,
        image: images.hero2,
        alt: "hero 2",
    },
    {
        id: 3,
        image: images.hero3,
        alt: "hero 3",
    },
    {
        id: 4,
        image: images.hero4,
        alt: "hero 4",
    },
    {
        id: 5,
        image: images.hero5,
        alt: "hero 5",
    },
    {
        id: 6,
        image: images.hero6,
        alt: "hero 6",
    },
    {
        id: 7,
        image: images.hero7,
        alt: "hero 7",
    }
]
export const ImageKidsCarousel: ImageCarouselProps[] = [
    {
        id: 1,
        image: images.Playstation,
        alt: "hero 1",
    },
    {
        id: 2,
        image: images.Toy_Img,
        alt: "hero 2",
    },
    {
        id: 3,
        image: images.GameBackground,
        alt: "hero 3",
    },
    {
        id: 4,
        image: images.Game_Img,
        alt: "hero 4",
    },
    {
        id: 5,
        image: images.Costume_Img,
        alt: "hero 5",
    },
    {
        id: 6,
        image: images.Background_Img,
        alt: "hero 6",
    },
    {
        id: 7,
        image: images.Fun_Img,
        alt: "hero 7",
    }
]
export const ContactImage: ImageCarouselProps[] = [
    {
        id: 1,
        image: images.Contact_Img,
        alt: "hero 1",
    }
]


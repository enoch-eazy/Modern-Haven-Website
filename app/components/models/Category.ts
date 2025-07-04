import images from "@/public/images";
import { StaticImageData } from "next/image";
export const CategoryItemMen = [
    {
        image: images.categoryImagesshirts,
        Item: "SHIRTS",
        href: "/shop/men/shirts"
    },
    {
        image: images.categoryImagesjerseys,
        Item: "JERSEYS",
        href: "/shop/men/jerseys"
    },
    {
        image: images.categoryImagespants,
        Item: "PANTS",
        href: "/shop/men/pants"
    },
    {
        image: images.categoryImagessweaters,
        Item: "SWEATERS",
        href: "/shop/men/sweater"
    },
    {
        image: images.categoryImagesshoes,
        Item: "/SHOES",
        href: "/shop/men/shoes"
    },
    {
        image: images.categoryImageshorts,
        Item: "SHORTS",
        href: "/shop/men/shorts"
    }
];
export const CategoryItemWomen = [
    {
        image: images.categoryImagesshirts,
        Item: "DRESSES",
        href: "/shop/women/dresses"
    },
    {
        image: images.categoryImagesjerseys,
        Item: "HANDBAGS",
        href: "/shop/women/handbags"
    },
    {
        image: images.categoryImagespants,
        Item: "SKIRTS",
        href: "/shop/women/skirts"
    },
    {
        image: images.categoryImagessweaters,
        Item: "JACKETS",
        href: "/shop/women/jackets"
    },
    {
        image: images.categoryImagesshoes,
        Item: "HEELS",
        href: "/shop/women/heels"
    },
    {
        image: images.categoryImageshorts,
        Item: "ACCESSORIES",
        href: "/shop/women/accessories"
    }
];
export const CategoryItemKids = [
    {
        image: images.categoryImagesshirts,
        Item: "TROUSERS",
        href: "/shop/kids/trousers"
    },
    {
        image: images.categoryImagesjerseys,
        Item: "HOODIES",
        href: "/shop/kids/hoodies"
    },
    {
        image: images.categoryImagespants,
        Item: "T-SHIRTS",
        href: "/shop/kids/t-shirts"
    },
    {
        image: images.categoryImagessweaters,
        Item: "TOYS",
        href: "/shop/kids/toys"
    },
    {
        image: images.categoryImagesshoes,
        Item: "SNEAKERS",
        href: "/shop/kids/sneakers"
    },
    {
        image: images.categoryImageshorts,
        Item: "GADGETS",
        href: "/shop/kids/gadgets"
    }
];

export interface CategoryItem {
    image: StaticImageData;
    Item: string;
    href: string;
}
export interface CategoryProps {
    sectionTitle: string;
    categoryItem: CategoryItem[];
}


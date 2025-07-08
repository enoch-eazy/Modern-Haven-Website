import images from "@/public/images";
import { StaticImageData } from "next/image";

export const CategoryItem = [
    {
        image: images.MenFashion,
        Item: "MEN FASHION",
        href: "/shop/men"
    },
    {
        image: images.WomenFashion,
        Item: "WOMEN FASHION",
        href: "/shop/women"
    },
    {
        image: images.aboutKid_Img,
        Item: "KIDS & TEENS FASHION",
        href: "/shop/kids"
    },
    {
        image: images.Sports,
        Item: "SPORTS & FITNESS",
        href: "/shop/men"
    },
    {
        image: images.Accessory,
        Item: "ACCESSORIES",
        href: "/shop/women"
    },
    {
        image: images.Games,
        Item: "GAMES & TOYS",
        href: "/shop/kids"
    }
];
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
        Item: "SHOES",
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
        image: images.Dress,
        Item: "DRESSES",
        href: "/shop/women/dresses"
    },
    {
        image: images.HandBag,
        Item: "HANDBAGS",
        href: "/shop/women/handbags"
    },
    {
        image: images.Skirts,
        Item: "SKIRTS",
        href: "/shop/women/skirts"
    },
    {
        image: images.Jacket,
        Item: "JACKETS",
        href: "/shop/women/jackets"
    },
    {
        image: images.Heels,
        Item: "HEELS",
        href: "/shop/women/heels"
    },
    {
        image: images.Accessory_Img,
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


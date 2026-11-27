import images from "@/public/images";
import { StaticImageData } from "next/image";

// Every href points at the shop with the matching API filters
// (see the `category`, `audience` and `subcategory` fields on products).

export const CategoryItem = [
    {
        image: images.MenFashion,
        Item: "MEN FASHION",
        href: "/shop?category=clothing&audience=men"
    },
    {
        image: images.WomenFashion,
        Item: "WOMEN FASHION",
        href: "/shop?category=clothing&audience=women"
    },
    {
        image: images.aboutKid_Img,
        Item: "KIDS & TEENS",
        href: "/shop?audience=kids"
    },
    {
        image: images.Sports,
        Item: "SPORTS & FITNESS",
        href: "/shop?subcategory=fitness"
    },
    {
        image: images.Accessory,
        Item: "ACCESSORIES",
        href: "/shop?q=accessory"
    },
    {
        image: images.Games,
        Item: "GAMES & CONSOLES",
        href: "/shop?category=gadgets"
    }
];
export const CategoryItemMen = [
    {
        image: images.categoryImagesshirts,
        Item: "SHIRTS",
        href: "/shop?audience=men&subcategory=shirts"
    },
    {
        image: images.categoryImagesjerseys,
        Item: "JERSEYS",
        href: "/shop?audience=men&subcategory=jerseys"
    },
    {
        image: images.categoryMenWatch,
        Item: "WATCHES",
        href: "/shop?audience=men&subcategory=watches"
    },
    {
        image: images.categoryImagessweaters,
        Item: "SWEATERS",
        href: "/shop?audience=men&subcategory=sweaters"
    },
    {
        image: images.categoryImagesshoes,
        Item: "SHOES",
        href: "/shop?audience=men&subcategory=shoes"
    },
    {
        image: images.categoryImagesPerfume,
        Item: "PERFUME",
        href: "/shop?audience=men&subcategory=perfume"
    }
];
export const CategoryItemWomen = [
    {
        image: images.Dress,
        Item: "DRESSES",
        href: "/shop?audience=women&subcategory=dresses"
    },
    {
        image: images.HandBag,
        Item: "HANDBAGS",
        href: "/shop?audience=women&subcategory=handbags"
    },
    {
        image: images.Skirts,
        Item: "SKIRTS",
        href: "/shop?audience=women&subcategory=skirts"
    },
    {
        image: images.Jacket,
        Item: "JACKETS",
        href: "/shop?audience=women&subcategory=jackets"
    },
    {
        image: images.Heels,
        Item: "HEELS",
        href: "/shop?audience=women&subcategory=heels"
    },
    {
        image: images.Accessory_Img,
        Item: "ACCESSORIES",
        href: "/shop?audience=women&subcategory=accessories"
    }
];
export const CategoryItemKids = [
    {
        image: images.categoryTeenTrouser,
        Item: "TROUSERS",
        href: "/shop?audience=kids&subcategory=trousers"
    },
    {
        image: images.categoryTeenHoodie,
        Item: "HOODIES",
        href: "/shop?audience=kids&subcategory=hoodies"
    },
    {
        image: images.categoryTeenShirt,
        Item: "T-SHIRTS",
        href: "/shop?audience=kids&subcategory=t-shirts"
    },
    {
        image: images.categoryTeenToy,
        Item: "TOYS",
        href: "/shop?audience=kids&subcategory=toys"
    },
    {
        image: images.categoryTeenSneaker,
        Item: "SNEAKERS",
        href: "/shop?audience=kids&subcategory=sneakers"
    },
    {
        image: images.categoryTeenGames,
        Item: "CONSOLES & GAMES",
        href: "/shop?audience=kids&subcategory=consoles"
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

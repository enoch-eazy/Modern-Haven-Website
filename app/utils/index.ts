import { createElement } from "react"
import { FaInstagram, FaLinkedinIn, FaXTwitter } from "react-icons/fa6"
import { HiOutlineEnvelope, HiOutlineMapPin, HiOutlinePhone } from "react-icons/hi2"
import images from "@/public/images"
import { ApplicationRoutes } from "../components/constant/applicationRoutes"

/** Main navigation, shown in the header. */
export const MainNav = [
    { name: "Shop all", link: ApplicationRoutes.Shop },
    { name: "Gadgets", link: ApplicationRoutes.Gadgets },
    { name: "Men", link: ApplicationRoutes.Men },
    { name: "Women", link: ApplicationRoutes.Women },
    { name: "Kids & Teens", link: ApplicationRoutes.Kids },
    { name: "About", link: ApplicationRoutes.About },
    { name: "Contact", link: ApplicationRoutes.Contact },
]

export const FooterShopLinks = [
    { name: "All products", link: ApplicationRoutes.Shop },
    { name: "Gadgets", link: ApplicationRoutes.Gadgets },
    { name: "Clothing", link: ApplicationRoutes.Clothing },
    { name: "Men", link: ApplicationRoutes.Men },
    { name: "Women", link: ApplicationRoutes.Women },
    { name: "Kids & Teens", link: ApplicationRoutes.Kids },
]

export const FooterHelpLinks = [
    { name: "About us", link: ApplicationRoutes.About },
    { name: "Contact", link: ApplicationRoutes.Contact },
    { name: "My orders", link: ApplicationRoutes.Orders },
    { name: "Cart", link: ApplicationRoutes.Cart },
]

export const Contact = [
    {
        name: "+234 907 341 0982",
        href: "tel:+2349073410982",
        icons: createElement(HiOutlinePhone, { className: "size-4" })
    },
    {
        name: "jesulanaenoch@gmail.com",
        href: "mailto:jesulanaenoch@gmail.com",
        icons: createElement(HiOutlineEnvelope, { className: "size-4" })
    },
    {
        name: "25 Fadare Street, Mile 12, Lagos, Nigeria",
        href: "https://maps.app.goo.gl/SYgvtehGYS3Btdk16",
        icons: createElement(HiOutlineMapPin, { className: "size-4" })
    },
]

export const Socials = [
    {
        name: "Instagram",
        href: "https://www.instagram.com/eazy_enoch?igsh=aXJhdGlxdGcwd2o0",
        icons: createElement(FaInstagram, { className: "size-5" })
    },
    {
        name: "X (Twitter)",
        href: "https://x.com/Eazy_Enoch",
        icons: createElement(FaXTwitter, { className: "size-4" })
    },
    {
        name: "LinkedIn",
        href: "https://www.linkedin.com/in/enoch-jesulana",
        icons: createElement(FaLinkedinIn, { className: "size-4" })
    }
]

export const NewSection = [
    {
        name: "New Arrivals",
        description: "Fresh drops in tech and fashion.",
        button: "Shop the latest",
        href: "/shop?sort=newest",
        image: images.NewArrivals_Img,
    },
    {
        name: "Best-Sellers",
        description: "The picks everyone keeps coming back for.",
        button: "Shop favourites",
        href: "/shop?featured=true",
        image: images.BestSellers_Img,
    },
    {
        name: "Trending Now",
        description: "What the family is loving this season.",
        button: "Shop the trends",
        href: "/shop",
        image: images.Trending_Img,
    }
]

import images from "@/public/images"
import { Icons } from "../ui/icons"
import { ApplicationRoutes } from "../components/constant/applicationRoutes"

export const Otherpages = [
    {
        name: "Home",
        link: "/",
    },
    {
        name: "About",
        link: ApplicationRoutes.About,
    },
    {
        name: "Contact",
        link: "/contact",
    },
]
export const Footercontent = [
    {
        name: "Home",
        link: "/",
    },
    {
        name: "About",
        link: "/about",
    },
    {
        name: "Contact",
        link: "/contact",
    },
    {
        name: "Shop",
        link: "/shop",
    }
]
export const Shop = [
    {
        name: "Shop",
        Icons: Icons.Dropdown({ className: "w-6 h-6" }),
        submenu: [
            {
                name: "Men",
                link: "/men",
            },
            {
                name: "Women",
                link: "/women",
            },
            {
                name: "Kids & Teens",
                link: "/kids",
            },
        ]
    }
]

export const Contact = [
    {
        name: "+2349073410982",
        href: "tel:+2349073410982",
        icons: Icons.Phone({ className: "w-4 h-4" })
    },
    {
        name: "jesulanaenoch@gmail.com",
        href: "mailto:jesulanaenoch@gmail.com",
        icons: Icons.Mail({ className: "w-4 h-4" })
    },
    {
        name: "25 Fadare Street, Mile 12, Lagos, Nigeria",
        href: "https://maps.app.goo.gl/SYgvtehGYS3Btdk16",
        icons: Icons.Location({ className: "w-4 h-4" })
    },
]

export const Socials = [
    // {
    //     name: "Facebook",
    //     href: "https://www.facebook.com/profile.php?id=100091000000000",
    //     icons: Icons.Facebook({ className: "" })
    // },
    {
        name: "Instagram",
        href: "https://www.instagram.com/eazy_enoch?igsh=aXJhdGlxdGcwd2o0",
        icons: Icons.Instagram({ className: "w-10 h-10" })
    },
    {
        name: "Twitter",
        href: "https://x.com/Eazy_Enoch",
        icons: Icons.Twitter({ className: "w-10 h-10" })
    },
    {
        name: "LinkedIn",
        href: "https://www.linkedin.com/in/enoch-jesulana",
        icons: Icons.Linkedin({ className: "w-10 h-10" })
    }
]
export const AccountItem = [
    { name: "Login", href: "/login" },
    { name: "Sign Up", href: "/signup" }
];

export const NewSection = [
    {
        name: "New Arrivals",
        button: "SHOP THE LATEST",
        image: images.NewArrivals_Img,
    },
    {
        name: "Best-Sellers",
        button: "SHOP YOUR FAVORITES",
        image: images.BestSellers_Img,
    },
    {
        name: "Trending Now",
        button: "SHOP THE TRENDS",
        image: images.Trending_Img,
    }
]
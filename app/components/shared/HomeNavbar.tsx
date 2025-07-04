"use client"
import { sectionPadding } from "@/app/styles/styles";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function HomeNavbar() {
    const pathname = usePathname();

    const NavItem = [
        { name: "Men", link: "/men" },
        { name: "Women", link: "/women" },
        { name: "Kids & Teens", link: "/kids" }
    ];

    return (
        <section className={`bg-[#0F2B22] text-gray-500 mt-18`}>
            <div className={`${sectionPadding} flex items-center pt-2`}>
                <div className="flex justify-center items-center">
                    {NavItem.map((item, index) => (
                        <div
                            className={`py-4 px-6 ${pathname === item.link ? "border-b-2 border-[#FFD700]" : "border-b-2 border-transparent"}`}
                            key={index}
                        >
                            <Link href={item.link}>
                                <span
                                    className={`cursor-pointer ${pathname === item.link ? "font-bold text-[#FFD700]" : ""}`}
                                >
                                    {item.name}
                                </span>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
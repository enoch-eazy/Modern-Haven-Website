"use client"
import { sectionPadding } from "@/app/styles/styles";
import Link from "next/link";
import { useState } from "react";

export default function HomeNavbar() {
    const [active, isActive] = useState("/men")
    const NavItem = [
        {
            name: "Men",
            href: "/men"
        },
        {
            name: "Women",
            href: "/women"
        },
        {
            name: "Kids",
            href: "/kids"
        }
    ]
    return (
        <section className={`bg-[#0F2B22] text-gray-500 mt-18`}>
            <div className={`${sectionPadding} flex items-center pt-2`}>
                <div className="flex justify-center items-center">
                    {NavItem.map((item, index) => (
                        <div
                        className= {`py-4 px-6 ${active === item.href ? "border-b-2 border-[#FFD700]": "border-b-2 border-transparent"}`}
                        onClick={() => isActive(item.href)}
                        key={index}>
                        <Link 
                        href={item.href} 
                        className={`transition-all duration-300 hover:text-[#FFD700] cursor-pointer ${active === item.href ? "font-bold text-[#FFD700]" : ""}`}>
                            {item.name}
                        </Link>
                        </div>
                    ))}
                </div>  
            </div>
        </section>
    )
}
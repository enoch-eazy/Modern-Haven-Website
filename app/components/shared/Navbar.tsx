"use client"

import { sectionPadding } from "@/app/styles/styles"
import { Otherpages } from "@/app/utils"
// import { ApplicationRoutes } from "@/app/components/constant/applicationRoutes"
import images from "@/public/images"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
export default function Navbar() {
    const [active, isActive] = useState("/")
   
    const AccountItem = [
        {
            name: "Login",
            href: "/login"
            
        },
        {
            name: "Sign Up",
            href: "/signup"
        },   
       
    ]
    return (
        <nav className={`${sectionPadding} fixed top-0 left-0 right-0 z-50 bg-white text-gray-500`}>
            <div className="flex justify-between items-center">
                <Image src={images.logo} alt="logo" width={100} height={100} className="w-30 h-18 object-cover" />
                <ul className="flex gap-8">
                    {Otherpages.map((item, index) => (
                        <li key={index} className={`transition-all duration-300 hover:text-[#FFD700] cursor-pointer ${active === item.link ? "font-bold text-[#FFD700]" : ""}`}>
                            <Link href={item.link} onClick={() => isActive(item.link)}>
                            {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
                <ul className="flex gap-4">
                    {AccountItem.map((item, index) => (
                        <li 
                        key={index} 
                        className={`transition-all duration-300 hover:text-[#FFD700] cursor-pointer ${active === item.href ? "font-bold text-[#FFD700]" : ""}`}>
                            <Link 
                            className={`${index === 1 && "bg-[#0F2B22] px-5 py-2 font-bold rounded-full hover:bg-[#FFD700] hover:text-[white] transition-all duration-300"}  `}
                            href={item.href} 
                            onClick={() => isActive(item.href)}>
                                    {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>

            </div>
        </nav>
    )
}
"use client"

import { sectionPadding } from "@/app/styles/styles"
// import { Icons } from "@/app/ui/icons"
import {  Otherpages, Shop } from "@/app/utils"
import images from "@/public/images"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react";
import MobileNav from "./MobileNav"
import Session from "./Session"

export default function Navbar() {
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    

    return (
        <>
        {/* Desktop Nav  */}
            <nav className={`${sectionPadding} hidden md:block fixed top-0 left-0 right-0 z-50 bg-white text-gray-500`}>
                <div className="flex justify-between items-center">
                    <Link href="/">
                        <Image src={images.logo} alt="logo" width={100} height={100} className="w-30 h-18 object-cover" />
                    </Link>
                        <ul className="flex gap-8 relative">
                            {Otherpages.map((item, index) => {
                                const isActive = pathname === item.link;
                                return (
                                    <li
                                        key={index}
                                        className={`
                                            relative group transition-all duration-300 hover:text-[#FFD700] cursor-pointer
                                            ${isActive ? "font-bold text-[#FFD700]" : ""}
                                        `}
                                    >
                                        <Link href={item.link} className="flex items-center">
                                            {item.name}
                                            {/* {item.Icons && (
                                                <span className="ml-1 transition-transform duration-300 group-hover:rotate-180">
                                                    {item.Icons}
                                                </span>
                                            )} */}
                                        </Link>
                                        {/* {item.submenu && (
                                            <ul className="pointer-events-none absolute left-0 top-0 mt-4 bg-[#0F2B22] text-black shadow-lg rounded-lg opacity-0 group-hover:pointer-events-auto group-hover:opacity-100 group-hover:translate-y-2 transition-all ease-in-out duration-300 w-40">
                                                {item.submenu.map((subItem, subIndex) => {
                                                    const isSubActive = pathname === subItem.link;
                                                    return (
                                                        <li
                                                            key={subIndex}
                                                            className={`
                                                                ${isSubActive ? "my-2 bg-[#FFD700] text-white" : "text-gray-500 hover:text-white hover:bg-[#FFD700]/50 transition-all duration-300"}
                                                                p-3 w-full
                                                            `}
                                                        >
                                                            <Link 
                                                            onClick={() => router.push('/shop')}
                                                            href={subItem.link} className="block w-full">
                                                                {subItem.name}
                                                            </Link>
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        )} */}
                                    </li>
                                );
                            })}
                             {Shop.map((item, index) => {
                                // const isActive = pathname === item.link;
                                return (
                                    <li
                                        key={index}
                                        className={`
                                            relative group transition-all duration-300 hover:text-[#FFD700] cursor-pointer
                                            
                                        `}
                                    >
                                        <div  className="flex items-center">
                                            {item.name}
                                            {item.Icons && (
                                                <span className="ml-1 transition-transform duration-300 group-hover:rotate-180">
                                                    {item.Icons}
                                                </span>
                                            )}
                                        </div>
                                        {item.submenu && (
                                            <ul className="pointer-events-none absolute left-0 top-0 mt-4 bg-[#0F2B22] text-black shadow-lg rounded-lg opacity-0 group-hover:pointer-events-auto group-hover:opacity-100 group-hover:translate-y-2 transition-all ease-in-out duration-300 w-40">
                                                {item.submenu.map((subItem, subIndex) => {
                                                    const isSubActive = pathname === subItem.link;
                                                    return (
                                                        <li
                                                            key={subIndex}
                                                            className={`
                                                                ${isSubActive ? "my-2 bg-[#FFD700] text-white" : "text-gray-500 hover:text-white hover:bg-[#FFD700]/50 transition-all duration-300"}
                                                                p-3 w-full
                                                            `}
                                                        >
                                                            <Link 
                                                            onClick={() => router.push('/shop')}
                                                            href={subItem.link} className="block w-full">
                                                                {subItem.name}
                                                            </Link>
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                        <ul className="flex gap-4">
                            {/* {AccountItem.map((item, index) => (
                                <li 
                                    key={index}
                                    className={`transition-all duration-300 hover:text-[#FFD700] cursor-pointer ${pathname === item.href ? "font-bold text-[#FFD700]" : ""}`}
                                >
                                    <Link
                                        className={`${index === 1 && "bg-[#0F2B22] px-5 py-2 font-bold rounded-full hover:bg-[#FFD700] hover:text-[white] transition-all duration-300"}`}
                                        href={item.href}
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))} */}
                            
                            <Session />
                        </ul>
                </div>
            </nav>
        {/* Mobile Nav  */}
        <MobileNav />
        </>
    );
}
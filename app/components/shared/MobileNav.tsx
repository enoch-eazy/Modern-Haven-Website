import { sectionPadding } from "@/app/styles/styles";
import { Icons } from "@/app/ui/icons";
import { AccountItem, Otherpages } from "@/app/utils";
import images from "@/public/images";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";


export default function MobileNav() {
    const pathname = usePathname();
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
    return (
        <>
        <nav className={`${sectionPadding}  md:hidden fixed top-0 left-0 right-0 z-50 bg-white text-gray-500`}>
                <div className="flex justify-between items-center">
                    <Image src={images.logo} alt="logo" priority quality={100} className="w-[90px] h-[70px] object-cover" />
                    <Icons.Hamburger onClick={() => setIsMobileNavOpen(!isMobileNavOpen)} />
                </div>
                <>
                    {/* Overlay */}
                    <div
                        className={`
                            fixed w-full h-screen top-0 left-0 bg-black/50 z-40
                            transition-opacity duration-300
                            ${isMobileNavOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
                        `}
                    ></div>
                    {/* Sliding Nav */}
                    <div
                        className={`
                            ${sectionPadding}
                            fixed top-0 left-0 bg-white w-[75%] h-screen z-50
                            transition-all ease-in-out duration-300
                            ${isMobileNavOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"}
                        `}
                    >
                        <div className="w-full flex justify-between items-center mt-6">
                            <Image src={images.logo} alt="logo" priority quality={100} className="w-[90px] h-[70px] object-cover" />
                            <Icons.Close onClick={() => setIsMobileNavOpen(false)} className="cursor-pointer"/>
                        </div>
                        <div className="flex flex-col gap-4 mt-8">
                            {Otherpages.map((item, index) => {
                                const isActive = pathname === item.link;
                                return (
                                    
                                    <Link
                                    key={index} 
                                    href={item.link} 
                                    className={` text-gray-500  hover:text-[#FFD700] transition-all duration-300 ${isActive ? "" : ""}`}>
                                        <div className={`rounded-md cursor-pointer p-3 w-full hover:bg-[#0F2B22]/60 ${isActive ? "font-bold bg-[#0F2B22] text-[#FFD700]" : ""}`}> 
                                            {item.name}
                                        </div>
                                    </Link>
                                )
                            })}
                            <div>
                            {AccountItem.map((item, index) => (
                                <div key={index} className="p-4">
                                <button className="cursor-pointer ease-in-out transition-all duration-400 hover:bg-[#FFD700] hover:text-white w-full bg-[#0F2B22] text-white p-4 rounded-full">
                                <Link href={item.href} className="text-gray-500 hover:text-[#FFD700] transition-all duration-300">
                                    {item.name}
                                </Link>
                                </button>
                                </div>
                            ))}
                            </div>

                        </div>
                    </div>
                </>
            </nav>
           
        </>
    );
}
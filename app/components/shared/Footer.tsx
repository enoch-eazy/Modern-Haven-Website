import { sectionPadding } from "@/app/styles/styles";
import images from "@/public/images";
import Link from "next/link";
import Image from "next/image";
import { Otherpages, Contact, Socials } from "@/app/utils";

export default function Footer() {
    return (
        <footer className="bg-[#0F2B22] text-white py-4">
            <div className={`${sectionPadding} `}>
                <div className="flex flex-col md:flex-row md:justify-between gap-4 py-4">
                    <div className="flex flex-col gap-4 pr-4">
                        <Image src={images.logo} alt="Modern Fashion & Family" width={100} height={100} className="invert"/>
                        <p className="text-white w-full md:w-[350px]">
                        Bringing style, comfort, and tech together for men, women, and kids. From timeless fashion pieces to smart gadgets, we’re your one-stop destination for the whole family
                        </p>    
                    </div>
                    <div className="flex flex-col gap-4 pr-4">
                        <h2 className="text-white  font-bold">Other Pages</h2>
                        <ul className="flex flex-col gap-4 text-sm">
                            {Otherpages.map((page, index) => (
                                <li key={index}>
                                    <Link href={page.link} className="text-white hover:text-[#FFD700] transition-all duration-300">{page.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex flex-col gap-4 pr-4">
                        <h2 className="text-white text-center font-bold">Social Media</h2>
                        <ul className="flex flex-row gap-4 text-sm">
                            {Socials.map((social, index) => (
                                <li key={index}>
                                    <Link target="_blank" href={social.href} className="text-white hover:text-[#FFD700] transition-all duration-300 flex items-center gap-2">
                                        {social.icons} 
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex flex-col gap-4 pr-4">
                        <h2 className="text-white  font-bold">Contact Us</h2>
                        <ul className="flex flex-col gap-4 text-sm">
                            {Contact.map((contact, index) => (
                                <li key={index}>
                                    <Link target="_blank" href={contact.href} className="text-white hover:text-[#FFD700] transition-all duration-300 flex items-center gap-2">
                                        {contact.icons} {contact.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="mt-4 border-t border-[#FFD700] pt-4">
                    <p className="text-center text-sm">
                        &copy; {new Date().getFullYear()} Modern Fashion & Family. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}
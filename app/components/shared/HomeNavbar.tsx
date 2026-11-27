"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { sectionPadding } from "@/app/styles/styles";

const items = [
    { name: "Men", link: "/men" },
    { name: "Women", link: "/women" },
    { name: "Kids & Teens", link: "/kids" },
    { name: "Gadgets", link: "/shop?category=gadgets" },
];

/** Department tabs shown at the top of the Men / Women / Kids pages. */
export default function HomeNavbar() {
    const pathname = usePathname();
    return (
        <nav aria-label="Departments" className="border-b border-gray-200 bg-white">
            <ul className={`${sectionPadding} flex gap-2 overflow-x-auto py-3 no-scrollbar`}>
                {items.map((item) => {
                    const active = pathname === item.link;
                    return (
                        <li key={item.link} className="shrink-0">
                            <Link
                                href={item.link}
                                aria-current={active ? "page" : undefined}
                                className={`block rounded-full px-5 py-2 text-sm font-semibold transition-colors ${active ? "bg-brand-900 text-white" : "text-gray-600 hover:bg-brand-50 hover:text-brand-900"}`}
                            >
                                {item.name}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}

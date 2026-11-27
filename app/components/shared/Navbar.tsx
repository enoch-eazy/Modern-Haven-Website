"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { HiOutlineMagnifyingGlass, HiOutlineShoppingBag, HiBars3, HiXMark } from "react-icons/hi2";
import images from "@/public/images";
import { sectionPadding } from "@/app/styles/styles";
import { MainNav } from "@/app/utils";
import { useCart } from "../cart/CartProvider";
import AccountMenu from "./AccountMenu";

/** True when `link` (which may carry a query string) matches the current URL. */
function useIsActive() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    return (link: string) => {
        const [path, query] = link.split("?");
        if (path !== pathname) return false;
        const wanted = new URLSearchParams(query);
        if (!query) return path !== "/shop" || !searchParams.get("category");
        return [...wanted].every(([key, value]) => searchParams.get(key) === value);
    };
}

function NavLinks({ onNavigate, mobile = false }: { onNavigate?: () => void; mobile?: boolean }) {
    const isActive = useIsActive();
    return (
        <>
            {MainNav.map((item) => {
                const active = isActive(item.link);
                return (
                    <Link
                        key={item.link}
                        href={item.link}
                        onClick={onNavigate}
                        aria-current={active ? "page" : undefined}
                        className={
                            mobile
                                ? `rounded-xl px-4 py-3 text-base font-medium ${active ? "bg-brand-900 text-white" : "text-gray-700 hover:bg-brand-50"}`
                                : `relative py-2 text-sm font-medium transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:rounded-full after:bg-gold-400 after:transition-transform ${active ? "text-brand-900 after:scale-x-100" : "text-gray-600 hover:text-brand-900 after:scale-x-0 hover:after:scale-x-100"}`
                        }
                    >
                        {item.name}
                    </Link>
                );
            })}
        </>
    );
}

function CartLink() {
    const { count } = useCart();
    return (
        <Link
            href="/cart"
            aria-label={`Cart, ${count} item${count === 1 ? "" : "s"}`}
            className="relative grid size-10 place-items-center rounded-full text-brand-900 hover:bg-brand-900/5"
        >
            <HiOutlineShoppingBag className="size-6" />
            {count > 0 && (
                <span className="absolute -right-0.5 -top-0.5 grid min-w-5 place-items-center rounded-full bg-gold-400 px-1 text-[11px] font-bold leading-5 text-brand-950">
                    {count > 99 ? "99+" : count}
                </span>
            )}
        </Link>
    );
}

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => setOpen(false), [pathname]);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        if (!open) return;
        const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
        document.addEventListener("keydown", onKey);
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = "";
        };
    }, [open]);

    return (
        <header className="sticky top-0 z-50">
            <div className="bg-brand-900 text-center text-xs font-medium text-white/90">
                <p className={`${sectionPadding} py-2`}>
                    Gadgets &amp; fashion for the whole family <span className="mx-2 text-gold-400">•</span> Delivering across selected areas in Lagos
                </p>
            </div>
            <nav
                aria-label="Main"
                className={`border-b bg-white/90 backdrop-blur-md transition-shadow ${scrolled ? "border-gray-200 shadow-sm" : "border-transparent"}`}
            >
                <div className={`${sectionPadding} flex h-16 items-center justify-between gap-6`}>
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={() => setOpen(true)}
                            aria-label="Open menu"
                            aria-expanded={open}
                            className="-ml-2 grid size-10 place-items-center rounded-full text-brand-900 hover:bg-brand-900/5 lg:hidden"
                        >
                            <HiBars3 className="size-6" />
                        </button>
                        <Link href="/" className="flex items-center" aria-label="Modern Haven home">
                            <Image src={images.logo} alt="Modern Haven" priority className="h-12 w-auto object-contain" />
                        </Link>
                    </div>

                    <div className="hidden items-center gap-7 lg:flex">
                        <Suspense>
                            <NavLinks />
                        </Suspense>
                    </div>

                    <div className="flex items-center gap-1">
                        <Link
                            href="/shop"
                            aria-label="Search products"
                            className="grid size-10 place-items-center rounded-full text-brand-900 hover:bg-brand-900/5"
                        >
                            <HiOutlineMagnifyingGlass className="size-6" />
                        </Link>
                        <CartLink />
                        <div className="hidden sm:block">
                            <AccountMenu />
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile drawer */}
            <div
                className={`fixed inset-0 z-50 bg-black/40 transition-opacity lg:hidden ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
                onClick={() => setOpen(false)}
                aria-hidden="true"
            />
            <div
                role="dialog"
                aria-modal="true"
                aria-label="Menu"
                className={`fixed inset-y-0 left-0 z-50 flex w-[85%] max-w-sm flex-col bg-white shadow-xl transition-transform duration-300 lg:hidden ${open ? "translate-x-0" : "-translate-x-full"}`}
            >
                <div className="flex h-16 items-center justify-between border-b border-gray-100 px-4">
                    <Image src={images.logo} alt="Modern Haven" className="h-11 w-auto object-contain" />
                    <button
                        type="button"
                        onClick={() => setOpen(false)}
                        aria-label="Close menu"
                        className="grid size-10 place-items-center rounded-full hover:bg-gray-100"
                    >
                        <HiXMark className="size-6" />
                    </button>
                </div>
                <div className="flex flex-1 flex-col gap-1 overflow-y-auto p-4">
                    <Suspense>
                        <NavLinks mobile onNavigate={() => setOpen(false)} />
                    </Suspense>
                </div>
                <div className="border-t border-gray-100 p-4">
                    <AccountMenu mobile />
                </div>
            </div>
        </header>
    );
}

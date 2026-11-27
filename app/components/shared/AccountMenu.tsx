"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { HiOutlineArrowRightOnRectangle, HiOutlineClipboardDocumentList, HiOutlineUser } from "react-icons/hi2";
import { buttonClasses } from "@/app/ui/button";

export default function AccountMenu({ mobile = false }: { mobile?: boolean }) {
    const { data: session, status } = useSession();
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!open) return;
        const onClick = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) setOpen(false);
        };
        document.addEventListener("mousedown", onClick);
        return () => document.removeEventListener("mousedown", onClick);
    }, [open]);

    if (status === "loading") return <div className="h-9 w-20" aria-hidden="true" />;

    if (!session) {
        return mobile ? (
            <div className="grid grid-cols-2 gap-2">
                <Link href="/login" className={buttonClasses({ variant: "outline" })}>Log in</Link>
                <Link href="/signup" className={buttonClasses()}>Sign up</Link>
            </div>
        ) : (
            <Link href="/login" className={buttonClasses({ size: "sm", className: "ml-1" })}>
                Log in
            </Link>
        );
    }

    const firstName = session.user?.name?.split(" ")[0] ?? "there";
    const logOut = () => signOut({ callbackUrl: "/" });

    if (mobile) {
        return (
            <div className="flex flex-col gap-2">
                <p className="px-1 text-sm text-gray-500">Signed in as <span className="font-semibold text-gray-800">{session.user?.email}</span></p>
                <Link href="/orders" className={buttonClasses({ variant: "outline" })}>My orders</Link>
                <button type="button" onClick={logOut} className={buttonClasses({ variant: "ghost", className: "text-red-600" })}>
                    Log out
                </button>
            </div>
        );
    }

    return (
        <div className="relative" ref={ref}>
            <button
                type="button"
                onClick={() => setOpen((value) => !value)}
                aria-expanded={open}
                aria-haspopup="menu"
                className="flex h-10 items-center gap-2 rounded-full pl-2 pr-3 text-sm font-medium text-brand-900 hover:bg-brand-900/5"
            >
                <span className="grid size-7 place-items-center rounded-full bg-brand-900 text-xs font-bold uppercase text-gold-400">
                    {firstName[0]}
                </span>
                <span className="hidden md:inline">Hi, {firstName}</span>
            </button>
            {open && (
                <div role="menu" className="absolute right-0 mt-2 w-56 animate-fade-in overflow-hidden rounded-2xl border border-gray-100 bg-white py-2 shadow-xl">
                    <p className="truncate px-4 pb-2 text-xs text-gray-500">{session.user?.email}</p>
                    <Link role="menuitem" href="/orders" onClick={() => setOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-gray-50">
                        <HiOutlineClipboardDocumentList className="size-5 text-gray-500" /> My orders
                    </Link>
                    <Link role="menuitem" href="/cart" onClick={() => setOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-gray-50">
                        <HiOutlineUser className="size-5 text-gray-500" /> Cart &amp; checkout
                    </Link>
                    <button role="menuitem" type="button" onClick={logOut} className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50">
                        <HiOutlineArrowRightOnRectangle className="size-5" /> Log out
                    </button>
                </div>
            )}
        </div>
    );
}

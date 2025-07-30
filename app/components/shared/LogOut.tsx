"use client";

import { Icons } from "@/app/ui/icons";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";


const router = useRouter();

export default function LogOut() {
    return (
        <button
        onClick={() => {
            signOut();
            router.push("/login")
        } }
        className={`w-full md:w-64 justify-center flex items-center gap-2 bg-[#0F2B22] px-5 py-2 font-bold rounded-full hover:bg-[#FFD700] hover:text-red-600 text-red-400 transition-all duration-300`}
        >
            LogOut <Icons.Logout className=""/>
        </button>
    );
}
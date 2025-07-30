"use client";

import { Icons } from "@/app/ui/icons";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LogOut() {
    const router = useRouter();

    const handleClick = async () => {
        await signOut({ redirect: false }); // prevent next-auth from redirecting
        router.push("/login");
    };

    return (
        <button
            onClick={handleClick}
            className={`w-full md:w-64 justify-center flex items-center gap-2 bg-[#0F2B22] px-5 py-2 font-bold rounded-full hover:bg-[#FFD700] hover:text-red-600 text-red-400 transition-all duration-300 cursor-pointer`}
        >
            LogOut <Icons.Logout className=""/>
        </button>
    );
}
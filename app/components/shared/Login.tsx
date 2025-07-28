"use client";

import { Icons } from "@/app/ui/icons";
import { useRouter } from "next/navigation";

export default function LogIn() {
    const router = useRouter();
    return (
        <button
        onClick={() => {router.push("/login")}}
            className={`w-full md:w-64 justify-center flex items-center gap-2 bg-[#0F2B22] px-5 py-2 font-bold rounded-full hover:bg-[#FFD700] hover:text-[white] transition-all duration-300`}
        >
           Login <Icons.Login />
        </button>
    );
}
"use client";

import { useState } from "react";
import { Icons } from "@/app/ui/icons";

export default function PasswordInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
    const [visible, setVisible] = useState(false);
    return (
        <div className="relative">
            <input {...props} type={visible ? "text" : "password"} className="input-field pr-12" />
            <button
                type="button"
                onClick={() => setVisible((value) => !value)}
                aria-label={visible ? "Hide password" : "Show password"}
                className="absolute right-2 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-full text-gray-500 hover:bg-gray-100"
            >
                {visible ? <Icons.EyeOff className="size-4" /> : <Icons.Eye className="size-4" />}
            </button>
        </div>
    );
}

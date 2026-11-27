"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { buttonClasses } from "@/app/ui/button";
import AuthShell from "./AuthShell";
import PasswordInput from "./PasswordInput";

/** Only allow redirects back into this site. */
export function safeCallbackUrl(value: string | null) {
    return value && value.startsWith("/") && !value.startsWith("//") ? value : "/";
}

export default function LoginForm() {
    const router = useRouter();
    const callbackUrl = safeCallbackUrl(useSearchParams().get("callbackUrl"));
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const update = (event: React.ChangeEvent<HTMLInputElement>) => {
        setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
        setError(null);
    };

    const submit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        const result = await signIn("credentials", { email: form.email, password: form.password, redirect: false });
        setLoading(false);
        if (result?.error) {
            setError(result.error === "CredentialsSignin" ? "Incorrect email or password." : result.error);
            return;
        }
        router.push(callbackUrl);
        router.refresh();
    };

    const signupHref = callbackUrl === "/" ? "/signup" : `/signup?callbackUrl=${encodeURIComponent(callbackUrl)}`;

    return (
        <AuthShell
            title="Welcome back"
            subtitle={<>New to Modern Haven? <Link href={signupHref} className="font-semibold text-brand-700 hover:underline">Create an account</Link></>}
        >
            <form onSubmit={submit} className="space-y-5">
                {error && <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 ring-1 ring-red-200">{error}</p>}
                <div>
                    <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-gray-800">Email address</label>
                    <input id="email" name="email" type="email" required autoComplete="email" value={form.email} onChange={update} placeholder="you@example.com" className="input-field" />
                </div>
                <div>
                    <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-gray-800">Password</label>
                    <PasswordInput id="password" name="password" required autoComplete="current-password" value={form.password} onChange={update} placeholder="Your password" />
                </div>
                <button type="submit" disabled={loading} className={buttonClasses({ size: "lg", className: "w-full" })}>
                    {loading ? "Logging in…" : "Log in"}
                </button>
                <p className="text-center text-sm text-gray-500">
                    Forgot your password? <Link href="/contact" className="font-semibold text-brand-700 hover:underline">Contact us</Link> and we&apos;ll help.
                </p>
            </form>
        </AuthShell>
    );
}

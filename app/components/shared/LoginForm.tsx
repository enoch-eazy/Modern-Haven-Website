"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";
import { EMAIL_NOT_VERIFIED } from "@/lib/api";
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
        if (result?.error === EMAIL_NOT_VERIFIED) {
            // Correct password, but the email was never confirmed: send a fresh code and finish that step.
            const query = new URLSearchParams({ email: form.email.trim().toLowerCase(), resend: "1" });
            if (callbackUrl !== "/") query.set("callbackUrl", callbackUrl);
            toast.info("Please verify your email first. We've sent you a new code.");
            router.push(`/verify-email?${query}`);
            return;
        }
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
                    <div className="mb-1.5 flex items-baseline justify-between gap-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-800">Password</label>
                        <Link
                            href={form.email ? `/forgot-password?email=${encodeURIComponent(form.email.trim())}` : "/forgot-password"}
                            className="text-sm font-semibold text-brand-700 hover:underline"
                        >
                            Forgot password?
                        </Link>
                    </div>
                    <PasswordInput id="password" name="password" required autoComplete="current-password" value={form.password} onChange={update} placeholder="Your password" />
                </div>
                <button type="submit" disabled={loading} className={buttonClasses({ size: "lg", className: "w-full" })}>
                    {loading ? "Logging in…" : "Log in"}
                </button>
            </form>
        </AuthShell>
    );
}

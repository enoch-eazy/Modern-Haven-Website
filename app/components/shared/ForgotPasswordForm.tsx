"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { ApiError, apiFetch } from "@/lib/api";
import { buttonClasses } from "@/app/ui/button";
import AuthShell from "./AuthShell";

export default function ForgotPasswordForm() {
    const router = useRouter();
    const [email, setEmail] = useState(useSearchParams().get("email") ?? "");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const submit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!/^\S+@\S+\.\S+$/.test(email)) {
            setError("Enter a valid email address.");
            return;
        }
        setLoading(true);
        setError(null);
        try {
            await apiFetch("/api/auth/forgot-password", { method: "POST", body: JSON.stringify({ email }) });
            toast.success("If that email has an account, a reset code is on its way.");
            router.push(`/reset-password?email=${encodeURIComponent(email)}`);
        } catch (err) {
            setError(err instanceof ApiError ? err.message : "We couldn't send a reset code. Please try again.");
            setLoading(false);
        }
    };

    return (
        <AuthShell
            title="Forgot your password?"
            subtitle="Enter the email you signed up with and we'll send you a code to reset it."
        >
            <form onSubmit={submit} noValidate className="space-y-5">
                {error && <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 ring-1 ring-red-200">{error}</p>}
                <div>
                    <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-gray-800">Email address</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoFocus
                        autoComplete="email"
                        value={email}
                        onChange={(event) => {
                            setEmail(event.target.value.trim());
                            setError(null);
                        }}
                        aria-invalid={!!error}
                        placeholder="you@example.com"
                        className="input-field"
                    />
                </div>
                <button type="submit" disabled={loading} className={buttonClasses({ size: "lg", className: "w-full" })}>
                    {loading ? "Sending code…" : "Send reset code"}
                </button>
                <p className="text-center text-sm text-gray-600">
                    Remembered it? <Link href="/login" className="font-semibold text-brand-700 hover:underline">Back to log in</Link>
                </p>
            </form>
        </AuthShell>
    );
}

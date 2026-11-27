"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";
import { ApiError, apiFetch, fieldErrors } from "@/lib/api";
import { buttonClasses } from "@/app/ui/button";
import AuthShell from "./AuthShell";
import OtpInput from "./OtpInput";
import PasswordInput from "./PasswordInput";
import { cooldownFromMessage, useCooldown } from "./useCooldown";

const CODE_LENGTH = 6;
const RESEND_SECONDS = 60;

type Field = "email" | "code" | "password" | "confirmPassword";

export default function ResetPasswordForm() {
    const router = useRouter();
    const emailFromUrl = useSearchParams().get("email") ?? "";
    const [form, setForm] = useState({ email: emailFromUrl, code: "", password: "", confirmPassword: "" });
    const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
    const [formError, setFormError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [resending, setResending] = useState(false);
    // Arriving from /forgot-password means a code was just sent.
    const [cooldown, startCooldown] = useCooldown(emailFromUrl ? RESEND_SECONDS : 0);

    const set = (name: Field, value: string) => {
        setForm((current) => ({ ...current, [name]: value }));
        setErrors((current) => ({ ...current, [name]: undefined }));
        setFormError(null);
    };

    const validate = () => {
        const next: Partial<Record<Field, string>> = {};
        if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Enter a valid email address";
        if (form.code.length !== CODE_LENGTH) next.code = `Enter the ${CODE_LENGTH}-digit code from the email`;
        if (form.password.length < 8) next.password = "Use at least 8 characters";
        if (form.confirmPassword !== form.password) next.confirmPassword = "Passwords don't match";
        setErrors(next);
        return Object.keys(next).length === 0;
    };

    const resend = async () => {
        if (!/^\S+@\S+\.\S+$/.test(form.email)) {
            setErrors((current) => ({ ...current, email: "Enter a valid email address" }));
            return;
        }
        setResending(true);
        try {
            await apiFetch("/api/auth/forgot-password", { method: "POST", body: JSON.stringify({ email: form.email }) });
            startCooldown(RESEND_SECONDS);
            toast.success("If that email has an account, a new code is on its way.");
        } catch (err) {
            if (err instanceof ApiError && err.code === "OTP_COOLDOWN") startCooldown(cooldownFromMessage(err.message));
            setFormError(err instanceof Error ? err.message : "We couldn't send a new code");
        } finally {
            setResending(false);
        }
    };

    const submit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!validate()) return;
        setLoading(true);
        try {
            await apiFetch("/api/auth/reset-password", {
                method: "POST",
                body: JSON.stringify({ email: form.email, code: form.code, password: form.password }),
            });
            toast.success("Your password has been reset.");
            const result = await signIn("credentials", { email: form.email, password: form.password, redirect: false });
            if (result?.error) {
                router.push("/login");
                return;
            }
            router.push("/");
            router.refresh();
        } catch (err) {
            setErrors(fieldErrors(err));
            if (err instanceof ApiError && (err.code === "OTP_INVALID" || err.code === "OTP_EXPIRED")) set("code", "");
            setFormError(err instanceof Error ? err.message : "We couldn't reset your password");
            setLoading(false);
        }
    };

    return (
        <AuthShell
            title="Reset your password"
            subtitle={
                emailFromUrl ? (
                    <>Enter the code we sent to <span className="break-all font-semibold text-gray-900">{emailFromUrl}</span> and choose a new password.</>
                ) : (
                    <>Enter your email, the code we sent you, and a new password.</>
                )
            }
        >
            <form onSubmit={submit} noValidate className="space-y-5">
                {formError && <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 ring-1 ring-red-200">{formError}</p>}

                {!emailFromUrl && (
                    <div>
                        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-gray-800">Email address</label>
                        <input id="email" type="email" autoComplete="email" value={form.email} onChange={(e) => set("email", e.target.value.trim())} aria-invalid={!!errors.email} placeholder="you@example.com" className="input-field" />
                        {errors.email && <p className="mt-1.5 text-sm text-red-600">{errors.email}</p>}
                    </div>
                )}

                <div>
                    <div className="mb-2 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                        <p className="text-sm font-medium text-gray-800">Reset code</p>
                        <button
                            type="button"
                            onClick={() => void resend()}
                            disabled={cooldown > 0 || resending}
                            className="text-sm font-semibold text-brand-700 hover:underline disabled:cursor-not-allowed disabled:text-gray-400 disabled:no-underline"
                        >
                            {resending ? "Sending…" : cooldown > 0 ? `Resend in ${cooldown}s` : "Resend code"}
                        </button>
                    </div>
                    <OtpInput
                        value={form.code}
                        onChange={(value) => set("code", value)}
                        invalid={!!errors.code}
                        disabled={loading}
                        autoFocus={!!emailFromUrl}
                        describedBy={errors.code ? "code-error" : undefined}
                    />
                    {errors.code && <p id="code-error" className="mt-1.5 text-sm text-red-600">{errors.code}</p>}
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                        <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-gray-800">New password</label>
                        <PasswordInput id="password" autoComplete="new-password" placeholder="8+ characters" value={form.password} onChange={(e) => set("password", e.target.value)} aria-invalid={!!errors.password} />
                        {errors.password && <p className="mt-1.5 text-sm text-red-600">{errors.password}</p>}
                    </div>
                    <div>
                        <label htmlFor="confirmPassword" className="mb-1.5 block text-sm font-medium text-gray-800">Confirm password</label>
                        <PasswordInput id="confirmPassword" autoComplete="new-password" value={form.confirmPassword} onChange={(e) => set("confirmPassword", e.target.value)} aria-invalid={!!errors.confirmPassword} />
                        {errors.confirmPassword && <p className="mt-1.5 text-sm text-red-600">{errors.confirmPassword}</p>}
                    </div>
                </div>

                <button type="submit" disabled={loading} className={buttonClasses({ size: "lg", className: "w-full" })}>
                    {loading ? "Resetting…" : "Reset password"}
                </button>

                <p className="text-center text-sm text-gray-600">
                    <Link href="/login" className="font-semibold text-brand-700 hover:underline">Back to log in</Link>
                </p>
            </form>
        </AuthShell>
    );
}

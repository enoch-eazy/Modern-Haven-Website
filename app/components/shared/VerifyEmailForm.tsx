"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { ApiError, apiFetch, type ApiUser } from "@/lib/api";
import { buttonClasses } from "@/app/ui/button";
import AuthShell from "./AuthShell";
import { safeCallbackUrl } from "./LoginForm";
import OtpInput from "./OtpInput";
import { cooldownFromMessage, useCooldown } from "./useCooldown";

const CODE_LENGTH = 6;
const RESEND_SECONDS = 60;

export default function VerifyEmailForm() {
    const router = useRouter();
    const params = useSearchParams();
    const callbackUrl = safeCallbackUrl(params.get("callbackUrl"));
    const emailFromUrl = params.get("email") ?? "";
    // `resend=1` means we arrived from the login page, so no code has been sent yet.
    const shouldResend = params.get("resend") === "1";

    const [email, setEmail] = useState(emailFromUrl);
    const [code, setCode] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [resending, setResending] = useState(false);
    const [cooldown, startCooldown] = useCooldown(emailFromUrl && !shouldResend ? RESEND_SECONDS : 0);
    const autoResent = useRef(false);

    const resend = async (quiet = false) => {
        if (!email) {
            setError("Enter your email address first.");
            return;
        }
        setResending(true);
        try {
            await apiFetch("/api/auth/resend-verification", { method: "POST", body: JSON.stringify({ email }) });
            startCooldown(RESEND_SECONDS);
            if (!quiet) toast.success("We've sent you a new code.");
            setError(null);
        } catch (err) {
            if (err instanceof ApiError && err.code === "OTP_COOLDOWN") {
                startCooldown(cooldownFromMessage(err.message));
                if (!quiet) setError(err.message);
            } else {
                setError(err instanceof Error ? err.message : "We couldn't send a new code");
            }
        } finally {
            setResending(false);
        }
    };

    useEffect(() => {
        if (shouldResend && emailFromUrl && !autoResent.current) {
            autoResent.current = true;
            void resend(true);
        }
        // Runs once on arrival from the login page.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const verify = async (value = code) => {
        if (loading) return;
        if (!email) {
            setError("Enter your email address.");
            return;
        }
        if (value.length !== CODE_LENGTH) {
            setError(`Enter the ${CODE_LENGTH}-digit code from the email.`);
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const { token } = await apiFetch<{ user: ApiUser; token: string }>("/api/auth/verify-email", {
                method: "POST",
                body: JSON.stringify({ email, code: value }),
            });
            const result = await signIn("api-token", { token, redirect: false });
            toast.success("Email verified. Welcome to Modern Haven!");
            if (result?.error) {
                router.push("/login");
                return;
            }
            router.push(callbackUrl);
            router.refresh();
        } catch (err) {
            if (err instanceof ApiError && err.code === "ALREADY_VERIFIED") {
                toast.info(err.message);
                router.push(`/login${callbackUrl === "/" ? "" : `?callbackUrl=${encodeURIComponent(callbackUrl)}`}`);
                return;
            }
            setCode("");
            setError(err instanceof Error ? err.message : "We couldn't verify that code");
            setLoading(false);
        }
    };

    return (
        <AuthShell
            title="Check your email"
            subtitle={
                emailFromUrl ? (
                    <>We sent a {CODE_LENGTH}-digit code to <span className="break-all font-semibold text-gray-900">{emailFromUrl}</span>. Enter it below to verify your account.</>
                ) : (
                    <>Enter your email and the {CODE_LENGTH}-digit code we sent you.</>
                )
            }
        >
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    void verify();
                }}
                noValidate
                className="space-y-6"
            >
                {error && <p id="otp-error" role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 ring-1 ring-red-200">{error}</p>}

                {!emailFromUrl && (
                    <div>
                        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-gray-800">Email address</label>
                        <input id="email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value.trim())} placeholder="you@example.com" className="input-field" />
                    </div>
                )}

                <div>
                    <p className="mb-2 text-sm font-medium text-gray-800">Verification code</p>
                    <OtpInput
                        value={code}
                        onChange={(value) => {
                            setCode(value);
                            setError(null);
                        }}
                        onComplete={(value) => void verify(value)}
                        invalid={!!error}
                        disabled={loading}
                        autoFocus={!!emailFromUrl}
                        describedBy={error ? "otp-error" : undefined}
                    />
                    <p className="mt-2 text-xs text-gray-500">The code expires in 10 minutes. Check your spam folder if you can&apos;t find it.</p>
                </div>

                <button type="submit" disabled={loading} className={buttonClasses({ size: "lg", className: "w-full" })}>
                    {loading ? "Verifying…" : "Verify email"}
                </button>

                <div className="flex flex-col items-center gap-2 text-sm text-gray-600 sm:flex-row sm:justify-between">
                    <span>
                        Didn&apos;t get it?{" "}
                        <button
                            type="button"
                            onClick={() => void resend()}
                            disabled={cooldown > 0 || resending}
                            className="font-semibold text-brand-700 hover:underline disabled:cursor-not-allowed disabled:text-gray-400 disabled:no-underline"
                        >
                            {resending ? "Sending…" : cooldown > 0 ? `Resend in ${cooldown}s` : "Resend code"}
                        </button>
                    </span>
                    <Link href="/signup" className="font-semibold text-brand-700 hover:underline">Use a different email</Link>
                </div>
            </form>
        </AuthShell>
    );
}

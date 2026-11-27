"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";
import { ApiError, apiFetch } from "@/lib/api";
import { buttonClasses } from "@/app/ui/button";
import AuthShell from "./AuthShell";
import PasswordInput from "./PasswordInput";
import { safeCallbackUrl } from "./LoginForm";

const EMPTY = { firstName: "", lastName: "", email: "", phoneNumber: "", password: "", confirmPassword: "" };
type Field = keyof typeof EMPTY;

export default function SignUpForm() {
    const router = useRouter();
    const callbackUrl = safeCallbackUrl(useSearchParams().get("callbackUrl"));
    const [form, setForm] = useState(EMPTY);
    const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
    const [formError, setFormError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const update = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setForm((current) => ({ ...current, [name]: name === "phoneNumber" ? value.replace(/[^\d+]/g, "") : value }));
        setErrors((current) => ({ ...current, [name]: undefined }));
        setFormError(null);
    };

    const validate = () => {
        const next: Partial<Record<Field, string>> = {};
        if (!form.firstName.trim()) next.firstName = "First name is required";
        if (!form.lastName.trim()) next.lastName = "Last name is required";
        if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Enter a valid email address";
        if (!/^\+?\d{7,15}$/.test(form.phoneNumber)) next.phoneNumber = "Enter a valid phone number";
        if (form.password.length < 8) next.password = "Use at least 8 characters";
        if (form.confirmPassword !== form.password) next.confirmPassword = "Passwords don't match";
        setErrors(next);
        return Object.keys(next).length === 0;
    };

    const submit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!validate()) return;
        setLoading(true);
        try {
            await apiFetch("/api/auth/register", {
                method: "POST",
                body: JSON.stringify({
                    firstName: form.firstName,
                    lastName: form.lastName,
                    email: form.email,
                    phoneNumber: form.phoneNumber,
                    password: form.password,
                }),
            });
            const result = await signIn("credentials", { email: form.email, password: form.password, redirect: false });
            toast.success("Welcome to Modern Haven!");
            if (result?.error) {
                router.push("/login");
                return;
            }
            router.push(callbackUrl);
            router.refresh();
        } catch (error) {
            if (error instanceof ApiError && error.details) {
                setErrors(Object.fromEntries(Object.entries(error.details).map(([key, messages]) => [key, messages[0]])));
            }
            setFormError(error instanceof Error ? error.message : "We couldn't create your account");
        } finally {
            setLoading(false);
        }
    };

    const field = (name: Field, label: string, props: React.InputHTMLAttributes<HTMLInputElement> = {}) => (
        <div>
            <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-gray-800">{label}</label>
            {name === "password" || name === "confirmPassword" ? (
                <PasswordInput id={name} name={name} value={form[name]} onChange={update} aria-invalid={!!errors[name]} {...props} />
            ) : (
                <input id={name} name={name} value={form[name]} onChange={update} aria-invalid={!!errors[name]} className="input-field" {...props} />
            )}
            {errors[name] && <p className="mt-1.5 text-sm text-red-600">{errors[name]}</p>}
        </div>
    );

    const loginHref = callbackUrl === "/" ? "/login" : `/login?callbackUrl=${encodeURIComponent(callbackUrl)}`;

    return (
        <AuthShell
            title="Create your account"
            subtitle={<>Already have one? <Link href={loginHref} className="font-semibold text-brand-700 hover:underline">Log in</Link></>}
        >
            <form onSubmit={submit} noValidate className="space-y-5">
                {formError && <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 ring-1 ring-red-200">{formError}</p>}
                <div className="grid gap-5 sm:grid-cols-2">
                    {field("firstName", "First name", { autoComplete: "given-name" })}
                    {field("lastName", "Last name", { autoComplete: "family-name" })}
                </div>
                {field("email", "Email address", { type: "email", autoComplete: "email", placeholder: "you@example.com" })}
                {field("phoneNumber", "Phone number", { type: "tel", inputMode: "tel", autoComplete: "tel", placeholder: "08012345678" })}
                <div className="grid gap-5 sm:grid-cols-2">
                    {field("password", "Password", { autoComplete: "new-password", placeholder: "8+ characters" })}
                    {field("confirmPassword", "Confirm password", { autoComplete: "new-password" })}
                </div>
                <button type="submit" disabled={loading} className={buttonClasses({ size: "lg", className: "w-full" })}>
                    {loading ? "Creating your account…" : "Create account"}
                </button>
            </form>
        </AuthShell>
    );
}

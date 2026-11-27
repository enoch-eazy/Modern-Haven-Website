"use client";

import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { HiOutlineEnvelope, HiOutlineMapPin, HiOutlinePhone } from "react-icons/hi2";
import images from "@/public/images";
import { ApiError, apiFetch } from "@/lib/api";
import { sectionPadding } from "../styles/styles";
import { buttonClasses } from "../ui/button";
import { Socials } from "../utils";
import PageHero from "../components/shared/PageHero";

const EMPTY = { fullName: "", email: "", phoneNumber: "", subject: "", message: "" };
type Field = keyof typeof EMPTY;

const contactCards = [
    { icon: HiOutlinePhone, title: "Call us", value: "+234 907 341 0982", href: "tel:+2349073410982" },
    { icon: HiOutlineEnvelope, title: "Email us", value: "jesulanaenoch@gmail.com", href: "mailto:jesulanaenoch@gmail.com" },
    { icon: HiOutlineMapPin, title: "Visit", value: "25 Fadare Street, Mile 12, Lagos", href: "https://maps.app.goo.gl/SYgvtehGYS3Btdk16" },
];

export default function Contact() {
    const [form, setForm] = useState(EMPTY);
    const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
    const [submitting, setSubmitting] = useState(false);

    const update = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setForm((current) => ({ ...current, [name]: value }));
        setErrors((current) => ({ ...current, [name]: undefined }));
    };

    const validate = () => {
        const next: Partial<Record<Field, string>> = {};
        if (!form.fullName.trim()) next.fullName = "Please tell us your name";
        if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Enter a valid email address";
        if (form.message.trim().length < 5) next.message = "Please write a short message";
        setErrors(next);
        return Object.keys(next).length === 0;
    };

    const submit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!validate()) return;
        setSubmitting(true);
        try {
            const { message } = await apiFetch<{ message: string }>("/api/contact", { method: "POST", body: JSON.stringify(form) });
            toast.success(message);
            setForm(EMPTY);
        } catch (error) {
            if (error instanceof ApiError && error.details) {
                setErrors(Object.fromEntries(Object.entries(error.details).map(([key, messages]) => [key, messages[0]])));
            }
            toast.error(error instanceof Error ? error.message : "We couldn't send your message");
        } finally {
            setSubmitting(false);
        }
    };

    const input = (name: Field, label: string, props: React.InputHTMLAttributes<HTMLInputElement> = {}) => (
        <div>
            <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-gray-800">{label}</label>
            <input id={name} name={name} value={form[name]} onChange={update} aria-invalid={!!errors[name]} className="input-field" {...props} />
            {errors[name] && <p className="mt-1.5 text-sm text-red-600">{errors[name]}</p>}
        </div>
    );

    return (
        <>
            <PageHero image={images.Contact_Img} eyebrow="Contact" title="We're here for you">
                Questions about a product, an order, or delivery to your area? Send us a message and we&apos;ll get back to you.
            </PageHero>

            <div className={`${sectionPadding} relative z-10 -mt-12 grid gap-4 md:grid-cols-3`}>
                {contactCards.map(({ icon: Icon, title, value, href }) => (
                    <Link
                        key={title}
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        className="flex items-center gap-4 rounded-3xl bg-white p-6 shadow-lg ring-1 ring-gray-200 transition-shadow hover:shadow-xl"
                    >
                        <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand-900 text-gold-400">
                            <Icon className="size-6" />
                        </span>
                        <span>
                            <span className="block text-sm text-gray-500">{title}</span>
                            <span className="block font-semibold text-gray-900">{value}</span>
                        </span>
                    </Link>
                ))}
            </div>

            <section className={`${sectionPadding} grid gap-12 py-16 md:py-24 lg:grid-cols-[1fr_1.4fr]`}>
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-brand-900">Get in touch</h2>
                    <p className="mt-3 text-gray-600">Drop us a message and let&apos;s talk. Product questions, order help, partnerships: we read everything.</p>
                    <ul className="mt-8 flex gap-3">
                        {Socials.map((social) => (
                            <li key={social.name}>
                                <Link href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.name} className="grid size-11 place-items-center rounded-full bg-brand-900 text-gold-400 transition-colors hover:bg-brand-700">
                                    {social.icons}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <form onSubmit={submit} noValidate className="grid gap-5 rounded-3xl bg-white p-6 ring-1 ring-gray-200 md:p-8">
                    <div className="grid gap-5 sm:grid-cols-2">
                        {input("fullName", "Your name", { autoComplete: "name" })}
                        {input("email", "Email", { type: "email", autoComplete: "email" })}
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2">
                        {input("phoneNumber", "Phone (optional)", { type: "tel", autoComplete: "tel" })}
                        {input("subject", "Subject (optional)")}
                    </div>
                    <div>
                        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-gray-800">Message</label>
                        <textarea id="message" name="message" value={form.message} onChange={update} rows={5} aria-invalid={!!errors.message} className="input-field resize-none" />
                        {errors.message && <p className="mt-1.5 text-sm text-red-600">{errors.message}</p>}
                    </div>
                    <button type="submit" disabled={submitting} className={buttonClasses({ size: "lg", className: "w-full sm:w-fit" })}>
                        {submitting ? "Sending…" : "Send message"}
                    </button>
                </form>
            </section>

            <div className="h-[420px] w-full">
                <iframe
                    title="Map showing 25 Fadare Street, Mile 12, Lagos"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.211034321218!2d3.3333333!3d6.5243794!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2ae68937f9%3A0x9a1f39206b449b0e!2s25%20Fadare%20St%2C%20Mile%2012%2C%20Lagos!5e0!3m2!1sen!2sng!4v1720432100000!5m2!1sen!2sng"
                    className="h-full w-full border-0"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                />
            </div>
        </>
    );
}

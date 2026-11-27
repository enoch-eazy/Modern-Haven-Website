"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ApiError, apiFetch, type DeliveryZone, type Order } from "@/lib/api";
import { formatPrice } from "@/lib/format";
import { buttonClasses } from "../ui/button";
import { sectionPadding } from "../styles/styles";
import { Icons } from "../ui/icons";
import { useCart } from "../components/cart/CartProvider";
import ProductImage from "../components/product/ProductImage";

type FieldErrors = Partial<Record<"address" | "landmark" | "phoneNumber", string>>;

function FieldError({ message }: { message?: string }) {
    if (!message) return null;
    return (
        <span className="mt-1.5 flex items-center gap-1.5 text-sm text-amber-700">
            <Icons.OutlineWarningIcon width={16} height={16} /> {message}
        </span>
    );
}

export default function CheckoutPage() {
    const router = useRouter();
    const { data: session, status } = useSession();
    const { items, subtotal, ready, clear } = useCart();
    const [zones, setZones] = useState<DeliveryZone[] | null>(null);
    const [zonesError, setZonesError] = useState<string | null>(null);
    const [form, setForm] = useState({ address: "", landmark: "", phoneNumber: "", notes: "" });
    const [errors, setErrors] = useState<FieldErrors>({});
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        apiFetch<{ zones: DeliveryZone[] }>("/api/delivery-zones")
            .then(({ zones }) => setZones(zones))
            .catch((error) => setZonesError(error instanceof Error ? error.message : "Couldn't load delivery areas"));
    }, []);

    const zone = zones?.find((z) => z.name === form.landmark);
    const total = subtotal + (zone?.fee ?? 0);

    const update = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setForm((current) => ({ ...current, [name]: name === "phoneNumber" ? value.replace(/[^\d+]/g, "") : value }));
        setErrors((current) => ({ ...current, [name]: undefined }));
    };

    const validate = () => {
        const next: FieldErrors = {};
        if (form.address.trim().length < 5) next.address = "Please enter your delivery address";
        if (!form.landmark) next.landmark = "Please select the closest landmark";
        if (!/^\+?\d{7,15}$/.test(form.phoneNumber)) next.phoneNumber = "Enter a phone number we can reach you on";
        setErrors(next);
        return Object.keys(next).length === 0;
    };

    const placeOrder = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!validate() || !session?.accessToken) return;
        setSubmitting(true);
        try {
            const { order } = await apiFetch<{ order: Order }>("/api/orders", {
                method: "POST",
                token: session.accessToken,
                body: JSON.stringify({
                    items: items.map((item) => ({ productId: item.productId, quantity: item.quantity })),
                    delivery: { address: form.address, landmark: form.landmark, phoneNumber: form.phoneNumber },
                    notes: form.notes || undefined,
                }),
            });
            clear();
            toast.success("Order placed! We'll be in touch to confirm.");
            router.push(`/orders?placed=${order.id}`);
        } catch (error) {
            if (error instanceof ApiError && error.status === 401) {
                toast.error("Your session has expired. Please log in again.");
                await signOut({ callbackUrl: "/login?callbackUrl=/checkout" });
                return;
            }
            toast.error(error instanceof Error ? error.message : "We couldn't place your order");
        } finally {
            setSubmitting(false);
        }
    };

    if (!ready || status === "loading") return <div className="min-h-[50vh]" />;

    if (items.length === 0) {
        return (
            <div className="mx-auto max-w-md px-4 py-24 text-center">
                <h1 className="text-3xl font-bold text-brand-900">Nothing to check out</h1>
                <p className="mt-3 text-gray-600">Your cart is empty.</p>
                <Link href="/shop" className={buttonClasses({ className: "mt-8" })}>Browse products</Link>
            </div>
        );
    }

    if (!session) {
        return (
            <div className="mx-auto max-w-md px-4 py-24 text-center">
                <h1 className="text-3xl font-bold text-brand-900">Log in to check out</h1>
                <p className="mt-3 text-gray-600">You need an account so you can track your order. Your cart will be waiting.</p>
                <div className="mt-8 flex justify-center gap-3">
                    <Link href="/login?callbackUrl=/checkout" className={buttonClasses()}>Log in</Link>
                    <Link href="/signup?callbackUrl=/checkout" className={buttonClasses({ variant: "outline" })}>Create account</Link>
                </div>
            </div>
        );
    }

    return (
        <div className={`${sectionPadding} py-10 pb-20`}>
            <Link href="/cart" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-brand-900">
                <Icons.ArrowLeft /> Back to cart
            </Link>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-brand-900 md:text-4xl">Checkout</h1>

            <form onSubmit={placeOrder} noValidate className="mt-8 grid gap-8 lg:grid-cols-[1fr_400px]">
                <section className="rounded-3xl bg-white p-6 ring-1 ring-gray-200 md:p-8" aria-labelledby="delivery-heading">
                    <h2 id="delivery-heading" className="text-lg font-semibold text-gray-900">Delivery details</h2>
                    <div className="mt-6 grid gap-5">
                        <div>
                            <label htmlFor="address" className="mb-1.5 block text-sm font-medium text-gray-800">Delivery address</label>
                            <input id="address" name="address" value={form.address} onChange={update} autoComplete="street-address" placeholder="House number, street, area" aria-invalid={!!errors.address} className="input-field" />
                            <FieldError message={errors.address} />
                        </div>
                        <div>
                            <label htmlFor="landmark" className="mb-1.5 block text-sm font-medium text-gray-800">
                                Closest landmark <span className="font-normal text-gray-500">(each has its own delivery fee)</span>
                            </label>
                            <select id="landmark" name="landmark" value={form.landmark} onChange={update} aria-invalid={!!errors.landmark} className="input-field" disabled={!zones}>
                                <option value="">{zones ? "Select the landmark closest to you" : "Loading delivery areas…"}</option>
                                {zones?.map((z) => (
                                    <option key={z.id} value={z.name}>{z.name} ({formatPrice(z.fee)})</option>
                                ))}
                            </select>
                            <FieldError message={errors.landmark ?? zonesError ?? undefined} />
                            {zones && zones.length === 0 && (
                                <p className="mt-1.5 text-sm text-gray-600">Delivery areas haven&apos;t been set up yet. Please <Link href="/contact" className="underline">contact us</Link>.</p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="phoneNumber" className="mb-1.5 block text-sm font-medium text-gray-800">Phone number</label>
                            <input id="phoneNumber" name="phoneNumber" type="tel" inputMode="tel" value={form.phoneNumber} onChange={update} autoComplete="tel" placeholder="08012345678" aria-invalid={!!errors.phoneNumber} className="input-field" />
                            <FieldError message={errors.phoneNumber} />
                        </div>
                        <div>
                            <label htmlFor="notes" className="mb-1.5 block text-sm font-medium text-gray-800">Notes <span className="font-normal text-gray-500">(optional)</span></label>
                            <textarea id="notes" name="notes" value={form.notes} onChange={update} rows={3} maxLength={500} placeholder="Gate colour, best time to deliver…" className="input-field resize-none" />
                        </div>
                    </div>
                </section>

                <aside className="h-fit rounded-3xl bg-white p-6 ring-1 ring-gray-200 lg:sticky lg:top-32" aria-labelledby="summary-heading">
                    <h2 id="summary-heading" className="text-lg font-semibold text-gray-900">Your order</h2>
                    <ul className="mt-4 divide-y divide-gray-100">
                        {items.map((item) => (
                            <li key={item.productId} className="flex items-center gap-3 py-3">
                                <div className="relative size-14 shrink-0 overflow-hidden rounded-xl bg-gray-100">
                                    <ProductImage src={item.image} alt="" sizes="56px" />
                                </div>
                                <div className="flex-1 text-sm">
                                    <p className="font-medium text-gray-900">{item.name}</p>
                                    <p className="text-gray-500">Qty {item.quantity}</p>
                                </div>
                                <p className="text-sm font-semibold">{formatPrice(item.price * item.quantity)}</p>
                            </li>
                        ))}
                    </ul>
                    <dl className="mt-4 space-y-3 border-t border-gray-200 pt-4 text-sm">
                        <div className="flex justify-between"><dt className="text-gray-600">Subtotal</dt><dd className="font-semibold">{formatPrice(subtotal)}</dd></div>
                        <div className="flex justify-between"><dt className="text-gray-600">Delivery</dt><dd className="font-semibold">{zone ? formatPrice(zone.fee) : "Select a landmark"}</dd></div>
                        <div className="flex justify-between border-t border-gray-200 pt-3 text-base"><dt className="font-semibold">Total</dt><dd className="font-bold text-brand-900">{formatPrice(total)}</dd></div>
                    </dl>
                    <button type="submit" disabled={submitting || !zones?.length} className={buttonClasses({ size: "lg", className: "mt-6 w-full" })}>
                        {submitting ? "Placing order…" : "Place order"}
                    </button>
                    <p className="mt-3 text-center text-xs text-gray-500">We&apos;ll contact you on your phone number to confirm your order and payment.</p>
                </aside>
            </form>
        </div>
    );
}

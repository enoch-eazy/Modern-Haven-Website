"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { Suspense, useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { HiOutlineCheckCircle } from "react-icons/hi2";
import { apiFetch, type Order } from "@/lib/api";
import { formatDate, formatPrice, STATUS_STYLES } from "@/lib/format";
import { buttonClasses } from "../ui/button";

function OrdersList() {
    const { data: session, status } = useSession();
    const placedId = useSearchParams().get("placed");
    const [orders, setOrders] = useState<Order[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    const load = useCallback(async () => {
        if (!session?.accessToken) return;
        try {
            const { orders } = await apiFetch<{ orders: Order[] }>("/api/orders/mine", { token: session.accessToken });
            setOrders(orders);
        } catch (e) {
            setError(e instanceof Error ? e.message : "Couldn't load your orders");
        }
    }, [session?.accessToken]);

    useEffect(() => {
        load();
    }, [load]);

    const cancel = async (order: Order) => {
        if (!session?.accessToken || !confirm("Cancel this order?")) return;
        try {
            await apiFetch(`/api/orders/${order.id}/cancel`, { method: "POST", token: session.accessToken });
            toast.success("Order cancelled");
            load();
        } catch (e) {
            toast.error(e instanceof Error ? e.message : "Couldn't cancel the order");
        }
    };

    if (status === "loading") return <div className="min-h-[40vh]" />;
    if (!session) {
        return (
            <div className="py-16 text-center">
                <p className="text-gray-600">Log in to see your orders.</p>
                <Link href="/login?callbackUrl=/orders" className={buttonClasses({ className: "mt-6" })}>Log in</Link>
            </div>
        );
    }

    return (
        <>
            {placedId && (
                <div className="mt-6 flex items-start gap-3 rounded-2xl bg-emerald-50 p-4 text-emerald-900 ring-1 ring-emerald-200">
                    <HiOutlineCheckCircle className="size-6 shrink-0" />
                    <div>
                        <p className="font-semibold">Thanks for your order!</p>
                        <p className="text-sm">We&apos;ll call you shortly to confirm delivery and payment.</p>
                    </div>
                </div>
            )}
            {error && <p className="mt-8 rounded-2xl bg-amber-50 p-4 text-amber-900">{error}</p>}
            {!orders && !error && <div className="mt-8 h-40 animate-pulse rounded-3xl bg-gray-200" />}
            {orders?.length === 0 && (
                <div className="mt-8 rounded-3xl bg-white p-12 text-center ring-1 ring-gray-200">
                    <p className="text-lg font-semibold">No orders yet</p>
                    <p className="mt-1 text-gray-600">When you place an order it will show up here.</p>
                    <Link href="/shop" className={buttonClasses({ className: "mt-6" })}>Start shopping</Link>
                </div>
            )}
            <ul className="mt-8 space-y-6">
                {orders?.map((order) => (
                    <li key={order.id} className={`rounded-3xl bg-white p-6 ring-1 ${order.id === placedId ? "ring-2 ring-emerald-400" : "ring-gray-200"}`}>
                        <div className="flex flex-wrap items-start justify-between gap-3">
                            <div>
                                <p className="text-sm text-gray-500">Order #{order.id.slice(-8).toUpperCase()} · {formatDate(order.createdAt)}</p>
                                <p className="mt-1 text-lg font-bold text-brand-900">{formatPrice(order.total)}</p>
                            </div>
                            <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ring-1 ${STATUS_STYLES[order.status]}`}>{order.status}</span>
                        </div>
                        <ul className="mt-4 divide-y divide-gray-100 text-sm">
                            {order.items.map((item) => (
                                <li key={item.product} className="flex justify-between py-2">
                                    <span>{item.name} <span className="text-gray-500">× {item.quantity}</span></span>
                                    <span className="font-medium">{formatPrice(item.price * item.quantity)}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-4 flex flex-wrap items-end justify-between gap-3 border-t border-gray-100 pt-4 text-sm text-gray-600">
                            <p>
                                Delivery to {order.delivery.address} (near {order.delivery.landmark}) · {formatPrice(order.delivery.fee)}
                                <br />
                                Payment: <span className="capitalize">{order.paymentStatus}</span>
                            </p>
                            {order.status === "pending" && (
                                <button type="button" onClick={() => cancel(order)} className="font-semibold text-red-600 hover:underline">
                                    Cancel order
                                </button>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default function OrdersPage() {
    return (
        <div className="mx-auto w-full max-w-4xl px-4 py-10 pb-20 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-brand-900 md:text-4xl">My orders</h1>
            <Suspense>
                <OrdersList />
            </Suspense>
        </div>
    );
}

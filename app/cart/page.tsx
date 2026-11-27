"use client";

import Link from "next/link";
import { HiMinus, HiOutlineShoppingBag, HiOutlineTrash, HiPlus } from "react-icons/hi2";
import { formatPrice } from "@/lib/format";
import { buttonClasses } from "../ui/button";
import { sectionPadding } from "../styles/styles";
import { useCart } from "../components/cart/CartProvider";
import ProductImage from "../components/product/ProductImage";

export default function CartPage() {
    const { items, subtotal, count, ready, setQuantity, remove } = useCart();

    if (!ready) return <div className="min-h-[50vh]" />;

    if (items.length === 0) {
        return (
            <div className="mx-auto flex max-w-md flex-col items-center px-4 py-24 text-center">
                <span className="grid size-16 place-items-center rounded-full bg-brand-50 text-brand-700">
                    <HiOutlineShoppingBag className="size-8" />
                </span>
                <h1 className="mt-6 text-3xl font-bold text-brand-900">Your cart is empty</h1>
                <p className="mt-3 text-gray-600">Find something you love among our gadgets and clothing.</p>
                <Link href="/shop" className={buttonClasses({ className: "mt-8" })}>Start shopping</Link>
            </div>
        );
    }

    return (
        <div className={`${sectionPadding} py-10 pb-20`}>
            <h1 className="text-3xl font-bold tracking-tight text-brand-900 md:text-4xl">Your cart</h1>
            <p className="mt-1 text-gray-600">{count} item{count === 1 ? "" : "s"}</p>

            <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
                <ul className="divide-y divide-gray-200 rounded-3xl bg-white ring-1 ring-gray-200">
                    {items.map((item) => (
                        <li key={item.productId} className="flex gap-4 p-4 sm:p-6">
                            <Link href={`/shop/${item.slug}`} className="relative size-24 shrink-0 overflow-hidden rounded-2xl bg-gray-100 sm:size-28">
                                <ProductImage src={item.image} alt={item.name} sizes="112px" />
                            </Link>
                            <div className="flex flex-1 flex-col">
                                <div className="flex items-start justify-between gap-4">
                                    <Link href={`/shop/${item.slug}`} className="font-semibold text-gray-900 hover:text-brand-700">{item.name}</Link>
                                    <p className="font-semibold text-gray-900">{formatPrice(item.price * item.quantity)}</p>
                                </div>
                                <p className="mt-1 text-sm text-gray-500">{formatPrice(item.price)} each</p>
                                <div className="mt-auto flex items-center justify-between pt-3">
                                    <div className="flex h-10 items-center rounded-full border border-gray-300">
                                        <button
                                            type="button"
                                            aria-label={`Decrease quantity of ${item.name}`}
                                            onClick={() => setQuantity(item.productId, item.quantity - 1)}
                                            disabled={item.quantity <= 1}
                                            className="grid size-10 place-items-center rounded-full hover:bg-gray-100 disabled:opacity-40"
                                        >
                                            <HiMinus />
                                        </button>
                                        <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                                        <button
                                            type="button"
                                            aria-label={`Increase quantity of ${item.name}`}
                                            onClick={() => setQuantity(item.productId, item.quantity + 1)}
                                            disabled={item.stock > 0 && item.quantity >= item.stock}
                                            className="grid size-10 place-items-center rounded-full hover:bg-gray-100 disabled:opacity-40"
                                        >
                                            <HiPlus />
                                        </button>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => remove(item.productId)}
                                        className="flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-red-600"
                                    >
                                        <HiOutlineTrash className="size-4" /> Remove
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>

                <aside className="h-fit rounded-3xl bg-white p-6 ring-1 ring-gray-200 lg:sticky lg:top-32">
                    <h2 className="text-lg font-semibold text-gray-900">Order summary</h2>
                    <dl className="mt-4 space-y-3 text-sm">
                        <div className="flex justify-between">
                            <dt className="text-gray-600">Subtotal</dt>
                            <dd className="font-semibold">{formatPrice(subtotal)}</dd>
                        </div>
                        <div className="flex justify-between">
                            <dt className="text-gray-600">Delivery</dt>
                            <dd className="text-gray-500">Calculated at checkout</dd>
                        </div>
                    </dl>
                    <Link href="/checkout" className={buttonClasses({ size: "lg", className: "mt-6 w-full" })}>
                        Proceed to checkout
                    </Link>
                    <Link href="/shop" className="mt-4 block text-center text-sm font-semibold text-brand-700 hover:underline">
                        Continue shopping
                    </Link>
                </aside>
            </div>
        </div>
    );
}

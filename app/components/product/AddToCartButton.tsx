"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { HiMinus, HiOutlineShoppingBag, HiPlus } from "react-icons/hi2";
import type { Product } from "@/lib/api";
import { buttonClasses } from "@/app/ui/button";
import { useCart } from "../cart/CartProvider";

export default function AddToCartButton({ product, withQuantity = false, compact = false }: { product: Product; withQuantity?: boolean; compact?: boolean }) {
    const router = useRouter();
    const { add, items } = useCart();
    const [quantity, setQuantity] = useState(1);
    const inCart = items.find((item) => item.productId === product.id)?.quantity ?? 0;
    const available = product.stock - inCart;
    const soldOut = product.stock <= 0;

    const handleAdd = () => {
        if (available <= 0) {
            toast.info("You already have all available stock in your cart.");
            return;
        }
        const amount = Math.min(quantity, available);
        add(product, amount);
        toast.success(`${product.name} added to cart`, {
            action: { label: "View cart", onClick: () => router.push("/cart") },
        });
        setQuantity(1);
    };

    if (soldOut) {
        return (
            <button type="button" disabled className={buttonClasses({ variant: "outline", size: compact ? "sm" : "lg", className: "w-full" })}>
                Sold out
            </button>
        );
    }

    return (
        <div className="flex w-full flex-col gap-3">
            <div className="flex w-full gap-3">
                {withQuantity && (
                    <div className="flex h-12 items-center rounded-full border border-gray-300">
                        <button
                            type="button"
                            aria-label="Decrease quantity"
                            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                            className="grid size-12 place-items-center rounded-full hover:bg-gray-100"
                        >
                            <HiMinus />
                        </button>
                        <span className="w-8 text-center font-semibold" aria-live="polite">{quantity}</span>
                        <button
                            type="button"
                            aria-label="Increase quantity"
                            onClick={() => setQuantity((q) => Math.min(Math.max(available, 1), q + 1))}
                            className="grid size-12 place-items-center rounded-full hover:bg-gray-100"
                        >
                            <HiPlus />
                        </button>
                    </div>
                )}
                <button
                    type="button"
                    onClick={handleAdd}
                    className={buttonClasses({ size: compact ? "sm" : "lg", className: "flex-1" })}
                >
                    <HiOutlineShoppingBag className="size-5" />
                    Add to cart
                </button>
            </div>
            {withQuantity && inCart > 0 && (
                <p className="text-sm text-gray-600">
                    {inCart} already in your cart. <Link href="/cart" className="font-semibold text-brand-700 underline underline-offset-2">Go to cart</Link>
                </p>
            )}
        </div>
    );
}

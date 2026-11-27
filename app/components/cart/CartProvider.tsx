"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { Product } from "@/lib/api";
import { productImage } from "@/lib/format";

export interface CartItem {
    productId: string;
    slug: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
    stock: number;
}

interface CartContextValue {
    items: CartItem[];
    count: number;
    subtotal: number;
    ready: boolean;
    add: (product: Product, quantity?: number) => void;
    setQuantity: (productId: string, quantity: number) => void;
    remove: (productId: string) => void;
    clear: () => void;
}

const STORAGE_KEY = "modern-haven-cart";
const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        try {
            const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
            if (Array.isArray(saved)) setItems(saved);
        } catch {
            // Ignore a corrupted cart and start fresh.
        }
        setReady(true);
    }, []);

    useEffect(() => {
        if (ready) localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }, [items, ready]);

    const add = useCallback((product: Product, quantity = 1) => {
        setItems((current) => {
            const existing = current.find((item) => item.productId === product.id);
            if (existing) {
                return current.map((item) =>
                    item.productId === product.id
                        ? { ...item, stock: product.stock, quantity: Math.min(item.quantity + quantity, product.stock) }
                        : item,
                );
            }
            return [
                ...current,
                {
                    productId: product.id,
                    slug: product.slug,
                    name: product.name,
                    price: product.price,
                    image: productImage(product.images),
                    stock: product.stock,
                    quantity: Math.min(quantity, product.stock),
                },
            ];
        });
    }, []);

    const setQuantity = useCallback((productId: string, quantity: number) => {
        setItems((current) =>
            current.map((item) =>
                item.productId === productId
                    ? { ...item, quantity: Math.max(1, Math.min(quantity, item.stock || quantity)) }
                    : item,
            ),
        );
    }, []);

    const remove = useCallback((productId: string) => {
        setItems((current) => current.filter((item) => item.productId !== productId));
    }, []);

    const clear = useCallback(() => setItems([]), []);

    const value = useMemo<CartContextValue>(
        () => ({
            items,
            ready,
            count: items.reduce((sum, item) => sum + item.quantity, 0),
            subtotal: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
            add,
            setQuantity,
            remove,
            clear,
        }),
        [items, ready, add, setQuantity, remove, clear],
    );

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used inside <CartProvider>");
    return context;
}

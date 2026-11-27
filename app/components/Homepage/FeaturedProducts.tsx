"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { HiArrowRight } from "react-icons/hi2";
import { apiFetch, type Product, type ProductList } from "@/lib/api";
import { sectionEyebrow, sectionPadding, sectionTitle } from "@/app/styles/styles";
import ProductCard, { ProductCardSkeleton } from "../product/ProductCard";

export default function FeaturedProducts() {
    const [products, setProducts] = useState<Product[] | null>(null);
    const [failed, setFailed] = useState(false);

    useEffect(() => {
        Promise.all([
            apiFetch<ProductList>("/api/products?featured=true&limit=8"),
            apiFetch<ProductList>("/api/products?limit=8"),
        ])
            .then(([featured, newest]) => {
                // Featured first, topped up with the newest products so the grid rows stay full.
                const seen = new Set(featured.items.map((p) => p.id));
                const items = [...featured.items, ...newest.items.filter((p) => !seen.has(p.id))].slice(0, 8);
                return items.length >= 4 ? items.slice(0, items.length - (items.length % 4)) : items;
            })
            .then(setProducts)
            .catch(() => setFailed(true));
    }, []);

    // Keep the homepage clean if the API is down or the catalogue is still empty.
    if (failed || products?.length === 0) return null;

    return (
        <section className="bg-white py-16 md:py-24" aria-labelledby="featured-heading">
            <div className={sectionPadding}>
                <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <p className={sectionEyebrow}>Handpicked</p>
                        <h2 id="featured-heading" className={`${sectionTitle} mt-2`}>Featured right now</h2>
                    </div>
                    <Link href="/shop" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-900">
                        View all products <HiArrowRight />
                    </Link>
                </div>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
                    {products
                        ? products.map((product) => <ProductCard key={product.id} product={product} />)
                        : Array.from({ length: 4 }, (_, i) => <ProductCardSkeleton key={i} />)}
                </div>
            </div>
        </section>
    );
}

import Link from "next/link";
import type { Product } from "@/lib/api";
import { AUDIENCE_LABELS, CATEGORY_LABELS, productImage } from "@/lib/format";
import AddToCartButton from "./AddToCartButton";
import Price from "./Price";
import ProductImage from "./ProductImage";

export default function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
    const onSale = product.compareAtPrice !== undefined && product.compareAtPrice > product.price;
    const lowStock = product.stock > 0 && product.stock <= 5;
    const label = product.audience === "unisex" ? CATEGORY_LABELS[product.category] : `${CATEGORY_LABELS[product.category]} · ${AUDIENCE_LABELS[product.audience]}`;

    return (
        <article className="group flex flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-gray-200/70 transition-shadow hover:shadow-lg">
            <Link href={`/shop/${product.slug}`} className="relative block aspect-[4/5] overflow-hidden bg-gray-100">
                <ProductImage
                    src={productImage(product.images)}
                    alt={product.name}
                    priority={priority}
                    sizes="(min-width: 1280px) 22vw, (min-width: 768px) 30vw, 50vw"
                    className="transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute left-3 top-3 flex flex-col items-start gap-1.5">
                    {onSale && <span className="rounded-full bg-gold-400 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-brand-950">Sale</span>}
                    {product.stock <= 0 && <span className="rounded-full bg-gray-900/80 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white">Sold out</span>}
                    {lowStock && <span className="rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-red-700">Only {product.stock} left</span>}
                </div>
            </Link>
            <div className="flex flex-1 flex-col gap-2 p-4">
                <p className="text-xs font-medium uppercase tracking-wider text-gray-500">{label}</p>
                <h3 className="line-clamp-2 font-semibold leading-snug text-gray-900">
                    <Link href={`/shop/${product.slug}`} className="hover:text-brand-700">
                        {product.name}
                    </Link>
                </h3>
                <div className="mt-auto pt-1">
                    <Price price={product.price} compareAtPrice={product.compareAtPrice} />
                </div>
                <div className="pt-2">
                    <AddToCartButton product={product} compact />
                </div>
            </div>
        </article>
    );
}

export function ProductCardSkeleton() {
    return (
        <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-gray-200/70" aria-hidden="true">
            <div className="aspect-[4/5] animate-pulse bg-gray-200" />
            <div className="space-y-3 p-4">
                <div className="h-3 w-1/3 animate-pulse rounded bg-gray-200" />
                <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
                <div className="h-4 w-1/4 animate-pulse rounded bg-gray-200" />
                <div className="h-9 w-full animate-pulse rounded-full bg-gray-200" />
            </div>
        </div>
    );
}

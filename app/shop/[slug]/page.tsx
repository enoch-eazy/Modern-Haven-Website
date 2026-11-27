import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";
import { HiOutlineArrowPath, HiOutlineChatBubbleLeftRight, HiOutlineTruck } from "react-icons/hi2";
import { ApiError, apiFetch, type Product, type ProductList } from "@/lib/api";
import { AUDIENCE_LABELS, CATEGORY_LABELS, productImage, titleCase } from "@/lib/format";
import { sectionPadding } from "../../styles/styles";
import AddToCartButton from "../../components/product/AddToCartButton";
import Price from "../../components/product/Price";
import ProductCard from "../../components/product/ProductCard";
import ProductImage from "../../components/product/ProductImage";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ slug: string }> };

const getProduct = cache(async (slug: string) => {
    try {
        const { product } = await apiFetch<{ product: Product }>(`/api/products/${encodeURIComponent(slug)}`, { cache: "no-store" });
        return product;
    } catch (error) {
        if (error instanceof ApiError && (error.status === 404 || error.status === 400)) return null;
        throw error;
    }
});

export async function generateMetadata({ params }: Params): Promise<Metadata> {
    const product = await getProduct((await params).slug).catch(() => null);
    if (!product) return { title: "Product not found" };
    return { title: product.name, description: product.description.slice(0, 160) };
}

async function getRelated(product: Product) {
    try {
        const { items } = await apiFetch<ProductList>(`/api/products?category=${product.category}&limit=5`, { cache: "no-store" });
        return items.filter((item) => item.id !== product.id).slice(0, 4);
    } catch {
        return [];
    }
}

export default async function ProductPage({ params }: Params) {
    const product = await getProduct((await params).slug);
    if (!product) notFound();
    const related = await getRelated(product);
    const images = product.images.length ? product.images : [productImage()];

    return (
        <div className="pb-20">
            <div className={`${sectionPadding} pt-6`}>
                <nav aria-label="Breadcrumb" className="text-sm text-gray-500">
                    <Link href="/" className="hover:text-brand-700">Home</Link>
                    <span className="mx-1">/</span>
                    <Link href="/shop" className="hover:text-brand-700">Shop</Link>
                    <span className="mx-1">/</span>
                    <Link href={`/shop?category=${product.category}`} className="hover:text-brand-700">{CATEGORY_LABELS[product.category]}</Link>
                    <span className="mx-1">/</span>
                    <span className="text-gray-800">{product.name}</span>
                </nav>
            </div>

            <div className={`${sectionPadding} mt-6 grid gap-10 lg:grid-cols-2 lg:gap-16`}>
                <div className="flex flex-col gap-4">
                    <div className="relative aspect-square overflow-hidden rounded-3xl bg-gray-100">
                        <ProductImage src={images[0]} alt={product.name} priority sizes="(min-width: 1024px) 50vw, 100vw" />
                    </div>
                    {images.length > 1 && (
                        <div className="grid grid-cols-4 gap-3">
                            {images.slice(1, 5).map((src, index) => (
                                <div key={src} className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100">
                                    <ProductImage src={src} alt={`${product.name} photo ${index + 2}`} sizes="12vw" />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="flex flex-col">
                    <div className="flex flex-wrap gap-2">
                        <Link href={`/shop?category=${product.category}`} className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 ring-1 ring-brand-100">
                            {CATEGORY_LABELS[product.category]}
                        </Link>
                        {product.audience !== "unisex" && (
                            <Link href={`/shop?audience=${product.audience}`} className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
                                {AUDIENCE_LABELS[product.audience]}
                            </Link>
                        )}
                        {product.subcategory && (
                            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">{titleCase(product.subcategory)}</span>
                        )}
                    </div>
                    <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">{product.name}</h1>
                    <div className="mt-4">
                        <Price price={product.price} compareAtPrice={product.compareAtPrice} large />
                    </div>
                    <p className={`mt-2 text-sm font-medium ${product.stock <= 0 ? "text-gray-500" : product.stock <= 5 ? "text-red-700" : "text-emerald-700"}`}>
                        {product.stock <= 0 ? "Out of stock" : product.stock <= 5 ? `Only ${product.stock} left in stock` : "In stock"}
                    </p>

                    {product.description && (
                        <p className="mt-6 whitespace-pre-line leading-relaxed text-gray-700">{product.description}</p>
                    )}

                    <div className="mt-8">
                        <AddToCartButton product={product} withQuantity />
                    </div>

                    <ul className="mt-8 divide-y divide-gray-200 rounded-2xl bg-white text-sm ring-1 ring-gray-200">
                        <li className="flex gap-3 p-4">
                            <HiOutlineTruck className="size-5 shrink-0 text-brand-600" />
                            <span><strong className="font-semibold text-gray-900">Delivery in Lagos.</strong> Pick your closest landmark at checkout to see the fee before you order.</span>
                        </li>
                        <li className="flex gap-3 p-4">
                            <HiOutlineArrowPath className="size-5 shrink-0 text-brand-600" />
                            <span><strong className="font-semibold text-gray-900">Changed your mind?</strong> You can cancel a pending order from your orders page.</span>
                        </li>
                        <li className="flex gap-3 p-4">
                            <HiOutlineChatBubbleLeftRight className="size-5 shrink-0 text-brand-600" />
                            <span><strong className="font-semibold text-gray-900">Questions?</strong> <Link href="/contact" className="font-semibold text-brand-700 underline underline-offset-2">Contact us</Link> before you buy.</span>
                        </li>
                    </ul>
                </div>
            </div>

            {related.length > 0 && (
                <section className={`${sectionPadding} mt-20`} aria-labelledby="related-heading">
                    <h2 id="related-heading" className="text-2xl font-bold tracking-tight text-brand-900">You might also like</h2>
                    <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
                        {related.map((item) => (
                            <ProductCard key={item.id} product={item} />
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}

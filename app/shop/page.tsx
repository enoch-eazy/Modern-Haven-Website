import type { Metadata } from "next";
import Link from "next/link";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { ApiError, apiFetch, type ProductList } from "@/lib/api";
import { AUDIENCE_LABELS, CATEGORY_LABELS, titleCase } from "@/lib/format";
import { sectionPadding } from "../styles/styles";
import ProductCard from "../components/product/ProductCard";
import SortSelect from "./SortSelect";

export const dynamic = "force-dynamic";

const FILTER_KEYS = ["category", "audience", "subcategory", "q", "sort", "featured", "page"] as const;
type Filters = Partial<Record<(typeof FILTER_KEYS)[number], string>>;

const CATEGORY_OPTIONS = [
    { value: undefined, label: "Everything" },
    { value: "gadgets", label: CATEGORY_LABELS.gadgets },
    { value: "clothing", label: CATEGORY_LABELS.clothing },
];
const AUDIENCE_OPTIONS = [
    { value: undefined, label: "Everyone" },
    { value: "men", label: AUDIENCE_LABELS.men },
    { value: "women", label: AUDIENCE_LABELS.women },
    { value: "kids", label: AUDIENCE_LABELS.kids },
];

function readFilters(params: Record<string, string | string[] | undefined>): Filters {
    const filters: Filters = {};
    for (const key of FILTER_KEYS) {
        const value = params[key];
        if (typeof value === "string" && value.trim()) filters[key] = value.trim();
    }
    return filters;
}

/** Builds a /shop URL from the current filters with `changes` applied (and page reset). */
function shopHref(filters: Filters, changes: Filters & Record<string, string | undefined>) {
    const next: Filters = { ...filters, page: undefined, ...changes };
    const query = new URLSearchParams();
    for (const [key, value] of Object.entries(next)) if (value) query.set(key, value);
    const qs = query.toString();
    return qs ? `/shop?${qs}` : "/shop";
}

function pageTitle(filters: Filters) {
    if (filters.q) return `Results for “${filters.q}”`;
    if (filters.featured === "true") return "Best-sellers";
    const parts: string[] = [];
    if (filters.audience && filters.audience in AUDIENCE_LABELS) parts.push(AUDIENCE_LABELS[filters.audience as keyof typeof AUDIENCE_LABELS]);
    if (filters.subcategory) parts.push(titleCase(filters.subcategory));
    else if (filters.category && filters.category in CATEGORY_LABELS) parts.push(CATEGORY_LABELS[filters.category as keyof typeof CATEGORY_LABELS]);
    return parts.length ? parts.join(" · ") : "All products";
}

export async function generateMetadata({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }): Promise<Metadata> {
    return { title: pageTitle(readFilters(await searchParams)) };
}

function FilterGroup({ title, options, current, filterKey, filters }: {
    title: string;
    options: { value?: string; label: string }[];
    current?: string;
    filterKey: "category" | "audience";
    filters: Filters;
}) {
    return (
        <div>
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">{title}</h2>
            <ul className="flex gap-2 overflow-x-auto no-scrollbar lg:flex-col lg:gap-1">
                {options.map((option) => {
                    const active = current === option.value;
                    return (
                        <li key={option.label} className="shrink-0">
                            <Link
                                href={shopHref(filters, { [filterKey]: option.value, subcategory: undefined })}
                                aria-current={active ? "true" : undefined}
                                className={`block rounded-full px-4 py-2 text-sm font-medium transition-colors lg:rounded-xl ${active ? "bg-brand-900 text-white" : "bg-white text-gray-700 ring-1 ring-gray-200 hover:bg-brand-50 lg:bg-transparent lg:ring-0"}`}
                            >
                                {option.label}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default async function ShopPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
    const filters = readFilters(await searchParams);
    const query = new URLSearchParams({ limit: "12" });
    for (const [key, value] of Object.entries(filters)) if (value) query.set(key, value);

    let data: ProductList | null = null;
    let error: string | null = null;
    try {
        data = await apiFetch<ProductList>(`/api/products?${query}`, { cache: "no-store" });
    } catch (e) {
        error = e instanceof ApiError && e.status === 400 ? "Some of those filters aren't valid." : e instanceof Error ? e.message : "Something went wrong";
    }

    const hasFilters = Object.keys(filters).some((key) => key !== "sort" && key !== "page");

    return (
        <div className="pb-20">
            <div className="border-b border-gray-200 bg-white">
                <div className={`${sectionPadding} py-10`}>
                    <nav aria-label="Breadcrumb" className="text-sm text-gray-500">
                        <Link href="/" className="hover:text-brand-700">Home</Link> <span className="mx-1">/</span> <span>Shop</span>
                    </nav>
                    <h1 className="mt-2 text-3xl font-bold tracking-tight text-brand-900 md:text-4xl">{pageTitle(filters)}</h1>
                    <form action="/shop" className="mt-6 flex max-w-xl items-center gap-2" role="search">
                        {filters.category && <input type="hidden" name="category" value={filters.category} />}
                        {filters.audience && <input type="hidden" name="audience" value={filters.audience} />}
                        <label className="relative flex-1">
                            <span className="sr-only">Search products</span>
                            <HiOutlineMagnifyingGlass className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-gray-400" />
                            <input
                                name="q"
                                defaultValue={filters.q}
                                placeholder="Search consoles, dresses, sneakers…"
                                className="input-field rounded-full pl-11"
                            />
                        </label>
                        <button type="submit" className="h-11 rounded-full bg-brand-900 px-5 text-sm font-semibold text-white hover:bg-brand-700">
                            Search
                        </button>
                    </form>
                </div>
            </div>

            <div className={`${sectionPadding} mt-8 grid gap-8 lg:grid-cols-[220px_1fr]`}>
                <aside className="flex flex-col gap-6 lg:sticky lg:top-32 lg:self-start">
                    <FilterGroup title="Category" options={CATEGORY_OPTIONS} current={filters.category} filterKey="category" filters={filters} />
                    <FilterGroup title="Shop for" options={AUDIENCE_OPTIONS} current={filters.audience} filterKey="audience" filters={filters} />
                    {hasFilters && (
                        <Link href="/shop" className="text-sm font-semibold text-brand-700 underline underline-offset-4 hover:text-brand-900">
                            Clear all filters
                        </Link>
                    )}
                </aside>

                <section aria-label="Products">
                    <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                        <p className="text-sm text-gray-600">
                            {data ? `${data.total} product${data.total === 1 ? "" : "s"}` : " "}
                        </p>
                        <SortSelect value={filters.sort ?? "newest"} />
                    </div>

                    {error && (
                        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-8 text-center">
                            <p className="font-semibold text-amber-900">We couldn&apos;t load products</p>
                            <p className="mt-1 text-sm text-amber-800">{error}</p>
                            <Link href="/shop" className="mt-4 inline-block text-sm font-semibold text-brand-700 underline">Try again</Link>
                        </div>
                    )}

                    {data && data.items.length === 0 && (
                        <div className="rounded-2xl bg-white p-12 text-center ring-1 ring-gray-200">
                            <p className="text-lg font-semibold text-gray-900">Nothing here yet</p>
                            <p className="mt-1 text-sm text-gray-600">We&apos;re stocking up. Check back soon or browse everything we have.</p>
                            <Link href="/shop" className="mt-5 inline-flex h-11 items-center rounded-full bg-brand-900 px-6 text-sm font-semibold text-white hover:bg-brand-700">
                                Browse all products
                            </Link>
                        </div>
                    )}

                    {data && data.items.length > 0 && (
                        <>
                            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
                                {data.items.map((product, index) => (
                                    <ProductCard key={product.id} product={product} priority={index < 3} />
                                ))}
                            </div>
                            {data.totalPages > 1 && (
                                <nav aria-label="Pagination" className="mt-10 flex items-center justify-center gap-2">
                                    {Array.from({ length: data.totalPages }, (_, i) => i + 1).map((page) => (
                                        <Link
                                            key={page}
                                            href={shopHref(filters, { page: page === 1 ? undefined : String(page) })}
                                            aria-current={page === data.page ? "page" : undefined}
                                            className={`grid size-10 place-items-center rounded-full text-sm font-semibold ${page === data.page ? "bg-brand-900 text-white" : "bg-white text-gray-700 ring-1 ring-gray-200 hover:bg-brand-50"}`}
                                        >
                                            {page}
                                        </Link>
                                    ))}
                                </nav>
                            )}
                        </>
                    )}
                </section>
            </div>
        </div>
    );
}

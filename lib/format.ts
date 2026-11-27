import type { Audience, Category, OrderStatus } from "./api";

const naira = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
});

export const formatPrice = (amount: number) => naira.format(amount);

export const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" });

export const CATEGORY_LABELS: Record<Category, string> = {
    gadgets: "Gadgets",
    clothing: "Clothing",
};

export const AUDIENCE_LABELS: Record<Audience, string> = {
    men: "Men",
    women: "Women",
    kids: "Kids & Teens",
    unisex: "Everyone",
};

export const STATUS_STYLES: Record<OrderStatus, string> = {
    pending: "bg-amber-50 text-amber-800 ring-amber-200",
    confirmed: "bg-sky-50 text-sky-800 ring-sky-200",
    shipped: "bg-indigo-50 text-indigo-800 ring-indigo-200",
    delivered: "bg-emerald-50 text-emerald-800 ring-emerald-200",
    cancelled: "bg-gray-100 text-gray-600 ring-gray-200",
};

export const PLACEHOLDER_IMAGE = "/images/shop_Img.jpg";

export const productImage = (images?: string[]) => images?.[0] || PLACEHOLDER_IMAGE;

/** "t-shirts" -> "T-Shirts" */
export const titleCase = (text: string) => text.replace(/(^|[\s-])\w/g, (match) => match.toUpperCase());

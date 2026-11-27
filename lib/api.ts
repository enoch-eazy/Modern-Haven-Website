// Client for the Modern Haven API (see /api). Works in both server and client components.

const PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";
// Server code can use a private/internal URL if one is set.
export const API_URL = (
    (typeof window === "undefined" ? process.env.API_URL : undefined) ?? PUBLIC_API_URL
).replace(/\/$/, "");

export type Category = "gadgets" | "clothing";
export type Audience = "men" | "women" | "kids" | "unisex";
export type OrderStatus = "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
export type PaymentStatus = "unpaid" | "paid" | "refunded";

export interface Product {
    id: string;
    name: string;
    slug: string;
    description: string;
    price: number;
    compareAtPrice?: number;
    category: Category;
    audience: Audience;
    subcategory?: string;
    images: string[];
    stock: number;
    featured: boolean;
    isActive: boolean;
    tags: string[];
    createdAt: string;
}

export interface ProductList {
    items: Product[];
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface DeliveryZone {
    id: string;
    name: string;
    fee: number;
}

export interface Order {
    id: string;
    items: { product: string; name: string; price: number; image?: string; quantity: number }[];
    delivery: { address: string; landmark: string; phoneNumber: string; fee: number };
    subtotal: number;
    total: number;
    status: OrderStatus;
    paymentStatus: PaymentStatus;
    notes?: string;
    createdAt: string;
}

export interface ApiUser {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber?: string;
    role: "customer" | "admin";
}

export class ApiError extends Error {
    constructor(
        public status: number,
        message: string,
        public details?: Record<string, string[]>,
    ) {
        super(message);
    }
}

type ApiInit = RequestInit & { token?: string; next?: { revalidate?: number } };

export async function apiFetch<T>(path: string, { token, ...init }: ApiInit = {}): Promise<T> {
    const headers = new Headers(init.headers);
    if (init.body && !headers.has("Content-Type")) headers.set("Content-Type", "application/json");
    if (token) headers.set("Authorization", `Bearer ${token}`);

    let res: Response;
    try {
        res = await fetch(`${API_URL}${path}`, { ...init, headers });
    } catch {
        throw new ApiError(0, "We couldn't reach the store right now. Please try again in a moment.");
    }

    if (res.status === 204) return undefined as T;
    const body = await res.json().catch(() => ({}));
    if (!res.ok) throw new ApiError(res.status, body.error ?? "Something went wrong", body.details);
    return body as T;
}

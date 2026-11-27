import Link from "next/link";
import { buttonClasses } from "@/app/ui/button";

export default function ProductNotFound() {
    return (
        <div className="mx-auto flex max-w-md flex-col items-center px-4 py-24 text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">404</p>
            <h1 className="mt-2 text-3xl font-bold text-brand-900">We couldn&apos;t find that product</h1>
            <p className="mt-3 text-gray-600">It may have sold out or been removed from the store.</p>
            <Link href="/shop" className={buttonClasses({ className: "mt-8" })}>
                Keep shopping
            </Link>
        </div>
    );
}

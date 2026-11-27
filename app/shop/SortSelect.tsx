"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const OPTIONS = [
    { value: "newest", label: "Newest" },
    { value: "price-asc", label: "Price: low to high" },
    { value: "price-desc", label: "Price: high to low" },
    { value: "name", label: "Name A–Z" },
];

export default function SortSelect({ value }: { value: string }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const onChange = (sort: string) => {
        const params = new URLSearchParams(searchParams);
        if (sort === "newest") params.delete("sort");
        else params.set("sort", sort);
        params.delete("page");
        const qs = params.toString();
        router.push(qs ? `${pathname}?${qs}` : pathname);
    };

    return (
        <label className="flex items-center gap-2 text-sm text-gray-600">
            Sort by
            <select
                value={value}
                onChange={(event) => onChange(event.target.value)}
                className="h-10 rounded-full border border-gray-300 bg-white px-4 text-sm font-medium text-gray-800 focus:border-brand-600 focus:outline-none"
            >
                {OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </label>
    );
}

import { formatPrice } from "@/lib/format";

export default function Price({ price, compareAtPrice, large = false }: { price: number; compareAtPrice?: number; large?: boolean }) {
    const onSale = compareAtPrice !== undefined && compareAtPrice > price;
    return (
        <p className="flex flex-wrap items-baseline gap-x-2">
            <span className={`font-bold text-brand-900 ${large ? "text-3xl" : "text-base"}`}>{formatPrice(price)}</span>
            {onSale && (
                <>
                    <span className={`text-gray-400 line-through ${large ? "text-lg" : "text-sm"}`}>{formatPrice(compareAtPrice)}</span>
                    <span className="sr-only">Sale price</span>
                </>
            )}
        </p>
    );
}

import Image from "next/image";

/**
 * Product photos are either files in /public (optimised by Next) or remote URLs
 * added from the admin console later (served as-is, so no domain allow-list is needed).
 */
export default function ProductImage({
    src,
    alt,
    sizes,
    priority,
    className = "",
}: {
    src: string;
    alt: string;
    sizes: string;
    priority?: boolean;
    className?: string;
}) {
    return (
        <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            unoptimized={/^https?:\/\//.test(src)}
            className={`object-cover ${className}`}
        />
    );
}

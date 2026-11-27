import Link from "next/link";

type Variant = "primary" | "accent" | "outline" | "ghost" | "light";
type Size = "sm" | "md" | "lg";

interface ButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    /** Renders a link styled as a button instead of a <button>. */
    link?: string;
    variant?: Variant;
    size?: Size;
}

const variants: Record<Variant, string> = {
    primary: "bg-brand-900 text-white hover:bg-brand-700",
    accent: "bg-gold-400 text-brand-950 hover:bg-gold-300",
    outline: "border border-brand-900/20 text-brand-900 hover:border-brand-900 hover:bg-brand-900 hover:text-white",
    ghost: "text-brand-900 hover:bg-brand-900/5",
    light: "bg-white text-brand-900 hover:bg-brand-50",
};

const sizes: Record<Size, string> = {
    sm: "h-9 px-4 text-sm",
    md: "h-11 px-6 text-sm",
    lg: "h-12 px-7 text-base",
};

export function buttonClasses({ variant = "primary", size = "md", className = "" }: { variant?: Variant; size?: Size; className?: string } = {}) {
    return `inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${sizes[size]} ${className}`;
}

export default function Button({ children, className, onClick, type = "button", disabled, link, variant, size }: ButtonProps) {
    const classes = buttonClasses({ variant, size, className });
    if (link) {
        return (
            <Link href={link} className={classes} onClick={onClick}>
                {children}
            </Link>
        );
    }
    return (
        <button className={classes} onClick={onClick} type={type} disabled={disabled}>
            {children}
        </button>
    );
}

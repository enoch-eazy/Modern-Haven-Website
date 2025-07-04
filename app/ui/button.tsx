import Link from "next/link";

interface ButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    link?: string;
}

export default function Button({ children, className, onClick, type, disabled, link }: ButtonProps) {
    return (
        <button
            className={`${className} hover:text-[#FFD700] hover:bg-black/80 transition-all duration-300 bg-black text-white w-32 py-2 rounded-md cursor-pointer`}
            onClick={onClick}
            type={type}
            disabled={disabled}
        >
            {link ? (
                <Link href={link}>
                    <span>{children}</span>
                </Link>
            ) : (
                children
            )}
        </button>
    )
}
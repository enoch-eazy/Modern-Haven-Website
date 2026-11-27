import Image from "next/image";
import images from "@/public/images";

export default function AuthShell({ title, subtitle, children }: { title: string; subtitle: React.ReactNode; children: React.ReactNode }) {
    return (
        <div className="grid min-h-[calc(100vh-6.5rem)] lg:grid-cols-2">
            <div className="relative hidden overflow-hidden lg:block">
                <Image src={images.Shop_Img} alt="" fill priority sizes="50vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950/90 via-brand-950/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-12 text-white">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-400">Modern Haven</p>
                    <p className="mt-3 max-w-md text-3xl font-bold leading-tight">Gadgets and fashion for the whole family, in one cart.</p>
                </div>
            </div>
            <div className="flex items-center justify-center px-4 py-12 sm:px-8">
                <div className="w-full max-w-md animate-fade-in">
                    <h1 className="text-3xl font-bold tracking-tight text-brand-900">{title}</h1>
                    <p className="mt-2 text-gray-600">{subtitle}</p>
                    <div className="mt-8">{children}</div>
                </div>
            </div>
        </div>
    );
}

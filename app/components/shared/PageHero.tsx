import Image, { type StaticImageData } from "next/image";
import { sectionPadding } from "@/app/styles/styles";

export default function PageHero({ image, eyebrow, title, children }: { image: StaticImageData; eyebrow?: string; title: string; children?: React.ReactNode }) {
    return (
        <section className="relative isolate overflow-hidden bg-brand-950">
            <Image src={image} alt="" fill priority sizes="100vw" placeholder="blur" className="-z-20 object-cover object-top" />
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-950/90 via-brand-950/70 to-brand-950/30" />
            <div className={`${sectionPadding} py-24 text-white md:py-32`}>
                {eyebrow && <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">{eyebrow}</p>}
                <h1 className="mt-3 max-w-2xl text-4xl font-bold tracking-tight md:text-6xl">{title}</h1>
                {children && <div className="mt-5 max-w-xl text-base text-white/80 md:text-lg">{children}</div>}
            </div>
        </section>
    );
}

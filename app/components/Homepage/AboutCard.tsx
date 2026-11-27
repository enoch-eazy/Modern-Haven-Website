import Image from "next/image";
import type { AboutProps } from "@/app/components/models/About";
import { sectionEyebrow, sectionPadding, sectionTitle } from "@/app/styles/styles";

export default function AboutCard({ sectionTitle: title, image, paragraph1, paragraph2, order }: AboutProps) {
    return (
        <section className={`${sectionPadding} py-16 md:py-24`}>
            <div className={`grid items-center gap-10 md:grid-cols-2 md:gap-16`}>
                <div className={`relative aspect-[4/5] overflow-hidden rounded-3xl md:aspect-[5/6] ${order === "right" ? "md:order-2" : ""}`}>
                    <Image src={image} alt="" fill sizes="(min-width: 768px) 50vw, 100vw" placeholder="blur" className="object-cover object-top" />
                    <div className="absolute -bottom-px -right-px rounded-tl-3xl bg-surface p-3">
                        <div className="rounded-2xl bg-gold-400 px-4 py-3 text-sm font-bold text-brand-950">Modern Haven</div>
                    </div>
                </div>
                <div>
                    <p className={sectionEyebrow}>Our story</p>
                    <h2 className={`${sectionTitle} mt-2`}>{title}</h2>
                    <p className="mt-6 leading-relaxed text-gray-700 md:text-lg">{paragraph1}</p>
                    <p className="mt-4 leading-relaxed text-gray-700 md:text-lg">{paragraph2}</p>
                </div>
            </div>
        </section>
    );
}

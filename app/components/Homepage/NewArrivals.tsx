import Image from "next/image";
import Link from "next/link";
import { HiArrowRight } from "react-icons/hi2";
import { NewSection } from "@/app/utils";
import { sectionEyebrow, sectionPadding, sectionTitle } from "@/app/styles/styles";

export default function NewArrivals() {
    return (
        <section className={`${sectionPadding} py-16 md:py-24`} aria-labelledby="collections-heading">
            <div className="mb-10 text-center">
                <p className={sectionEyebrow}>Collections</p>
                <h2 id="collections-heading" className={`${sectionTitle} mt-2`}>Find your next favourite</h2>
                <p className="mx-auto mt-3 max-w-lg text-gray-600">Discover our latest arrivals and stay ahead of the curve, in fashion and in tech.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-3 md:gap-6">
                {NewSection.map((item) => (
                    <Link key={item.name} href={item.href} className="group relative isolate flex h-[420px] overflow-hidden rounded-3xl bg-brand-900">
                        <Image src={item.image} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" placeholder="blur" className="-z-20 object-cover transition-transform duration-700 group-hover:scale-105" />
                        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-brand-950/90 via-brand-950/20 to-transparent" />
                        <div className="mt-auto p-6 text-white md:p-8">
                            <h3 className="text-2xl font-bold">{item.name}</h3>
                            <p className="mt-1 text-sm text-white/80">{item.description}</p>
                            <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-brand-900 transition-colors group-hover:bg-gold-400">
                                {item.button} <HiArrowRight />
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}

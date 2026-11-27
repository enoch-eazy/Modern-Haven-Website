import Image from "next/image";
import images from "@/public/images";
import Button from "@/app/ui/button";
import { sectionPadding } from "@/app/styles/styles";

export default function HeroBanner() {
    return (
        <section className={`${sectionPadding} py-16 md:pb-24 md:pt-28`}>
            <div className="relative flex items-center gap-10 overflow-visible rounded-3xl bg-gradient-to-br from-brand-900 via-brand-800 to-brand-600 px-6 py-12 md:px-14 md:py-14">
                <div className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full bg-gold-400/20 blur-3xl" aria-hidden="true" />
                <div className="hidden shrink-0 md:block md:-my-28">
                    <Image src={images.man} alt="" className="h-72 w-auto" />
                </div>
                <div className="relative max-w-xl text-center text-white md:text-left">
                    <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Have a question? We&apos;re here to help.</h2>
                    <p className="mt-3 text-sm text-white/80 md:text-base">
                        Ask us about a product, an order, or delivery to your area. Whether it&apos;s a new console or a
                        new outfit, we&apos;ll help you pick the right one.
                    </p>
                    <Button link="/contact" variant="accent" size="lg" className="mt-6">
                        Make an enquiry
                    </Button>
                </div>
            </div>
        </section>
    );
}

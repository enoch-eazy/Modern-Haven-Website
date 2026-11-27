import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { HiArrowRight } from "react-icons/hi2";
import images from "@/public/images";
import { sectionEyebrow, sectionPadding, sectionTitle } from "@/app/styles/styles";

function Tile({ href, image, title, text, large = false }: { href: string; image: StaticImageData; title: string; text: string; large?: boolean }) {
    return (
        <Link
            href={href}
            className={`group relative isolate flex overflow-hidden rounded-3xl bg-brand-900 ${large ? "min-h-[340px] md:min-h-[420px]" : "min-h-[220px]"}`}
        >
            <Image
                src={image}
                alt=""
                fill
                sizes={large ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 33vw, 100vw"}
                placeholder="blur"
                className="-z-20 object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-brand-950/90 via-brand-950/30 to-transparent" />
            <div className="mt-auto flex w-full items-end justify-between gap-4 p-6 text-white md:p-8">
                <div>
                    <h3 className={`font-bold tracking-tight ${large ? "text-3xl md:text-4xl" : "text-2xl"}`}>{title}</h3>
                    <p className="mt-1 text-sm text-white/80 md:text-base">{text}</p>
                </div>
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-white text-brand-900 transition-colors group-hover:bg-gold-400">
                    <HiArrowRight className="size-5" />
                </span>
            </div>
        </Link>
    );
}

export default function Departments() {
    return (
        <section className={`${sectionPadding} py-16 md:py-24`} aria-labelledby="departments-heading">
            <div className="mb-10 text-center">
                <p className={sectionEyebrow}>Two worlds, one store</p>
                <h2 id="departments-heading" className={`${sectionTitle} mt-2`}>What are you shopping for?</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 md:gap-6">
                <Tile large href="/shop?category=gadgets" image={images.Playstation} title="Gadgets" text="Consoles, controllers, watches, fitness gear & more" />
                <Tile large href="/shop?category=clothing" image={images.MenFashion} title="Clothing" text="Everyday style for men, women, kids & teens" />
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-3 md:mt-6 md:gap-6">
                <Tile href="/men" image={images.aboutImage} title="Men" text="Shirts, shoes, watches" />
                <Tile href="/women" image={images.WomenFashion} title="Women" text="Dresses, bags, jackets" />
                <Tile href="/kids" image={images.aboutKid_Img} title="Kids & Teens" text="Hoodies, sneakers, games" />
            </div>
        </section>
    );
}

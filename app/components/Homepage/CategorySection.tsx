import Image from "next/image";
import Link from "next/link";
import type { CategoryProps } from "@/app/components/models/Category";
import { buttonClasses } from "@/app/ui/button";
import { sectionEyebrow, sectionPadding, sectionTitle } from "@/app/styles/styles";

const CategorySection: React.FC<CategoryProps> = ({ sectionTitle: title, categoryItem }) => {
    return (
        <section className={`${sectionPadding} py-16 md:py-24`}>
            <div className="mb-10 text-center">
                <p className={sectionEyebrow}>Browse</p>
                <h2 className={`${sectionTitle} mt-2`}>{title}</h2>
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
                {categoryItem.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className="group relative isolate flex aspect-[4/5] overflow-hidden rounded-3xl bg-brand-900 sm:aspect-[4/3]"
                    >
                        <Image
                            src={item.image}
                            alt=""
                            fill
                            sizes="(min-width: 768px) 33vw, 50vw"
                            placeholder="blur"
                            className="-z-20 object-cover object-top transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-brand-950/85 via-brand-950/20 to-transparent" />
                        <p className="mt-auto p-4 text-sm font-bold uppercase tracking-wider text-white md:p-6 md:text-base">
                            {item.Item}
                            <span className="mt-2 block h-0.5 w-8 bg-gold-400 transition-all duration-300 group-hover:w-16" />
                        </p>
                    </Link>
                ))}
            </div>
            <div className="mt-10 text-center">
                <Link href="/shop" className={buttonClasses({ variant: "outline", size: "lg" })}>
                    Shop all products
                </Link>
            </div>
        </section>
    );
};

export default CategorySection;

import Image from "next/image";
import images from "@/public/images";
import Button from "../../ui/button";
import { sectionEyebrow, sectionPadding, sectionTitle } from "../../styles/styles";

export default function AboutOverview() {
    return (
        <section className={`${sectionPadding} grid items-center gap-12 py-16 md:grid-cols-2 md:py-24`}>
            <div>
                <p className={sectionEyebrow}>Who we are</p>
                <h2 className={`${sectionTitle} mt-2`}>
                    Tech and fashion, picked with care, for <span className="text-brand-600">the whole family</span>
                </h2>
                <p className="mt-6 leading-relaxed text-gray-700">
                    Modern Haven is a young Lagos shop for gadgets and clothing. We stock consoles, controllers, watches,
                    and fitness gear alongside men&apos;s wear, women&apos;s wear, and kids&apos; fashion, so the whole
                    family can shop in one place.
                </p>
                <p className="mt-4 leading-relaxed text-gray-700">
                    We focus on quality, comfort, and good design, and we keep things personal. If you&apos;re shopping
                    for yourself, your family, or the perfect gift and need a hand, talk to us. We&apos;re happy to help.
                </p>
                <Button link="/contact" className="mt-8">
                    Get in touch
                </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="relative row-span-2 aspect-[3/5] overflow-hidden rounded-3xl">
                    <Image src={images.aboutUS_Img1} alt="" fill sizes="(min-width: 768px) 25vw, 50vw" placeholder="blur" className="object-cover object-top" />
                </div>
                <div className="relative aspect-square overflow-hidden rounded-3xl">
                    <Image src={images.aboutUs_Img2} alt="" fill sizes="(min-width: 768px) 25vw, 50vw" placeholder="blur" className="object-cover" />
                </div>
                <div className="relative aspect-square overflow-hidden rounded-3xl">
                    <Image src={images.aboutUs_Img3} alt="" fill sizes="(min-width: 768px) 25vw, 50vw" placeholder="blur" className="object-cover object-top" />
                </div>
            </div>
        </section>
    );
}

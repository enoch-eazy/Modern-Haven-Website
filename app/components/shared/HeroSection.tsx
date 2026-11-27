"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { ImageCarouselProps } from "@/app/components/models/ImagesList";
import Button from "@/app/ui/button";
import { sectionPadding } from "@/app/styles/styles";

interface Cta {
    label: string;
    href: string;
}

interface HeroSectionProps {
    eyebrow?: string;
    plaintitle?: string;
    highlightedtitle?: string;
    description?: string;
    image: ImageCarouselProps[];
    primaryCta?: Cta;
    secondaryCta?: Cta;
}

const HeroSection: React.FC<HeroSectionProps> = ({
    eyebrow,
    plaintitle,
    highlightedtitle,
    description,
    image,
    primaryCta = { label: "Shop now", href: "/shop" },
    secondaryCta,
}) => {
    const [current, setCurrent] = useState(0);
    const [paused, setPaused] = useState(false);

    useEffect(() => {
        if (paused || image.length < 2) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const interval = setInterval(() => setCurrent((prev) => (prev + 1) % image.length), 5000);
        return () => clearInterval(interval);
    }, [paused, image.length]);

    return (
        <section
            className="relative isolate h-[520px] overflow-hidden bg-brand-950 md:h-[620px]"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            aria-roledescription="carousel"
        >
            {image.map((slide, index) => (
                <Image
                    key={slide.id}
                    src={slide.image}
                    alt={slide.alt}
                    fill
                    priority={index === 0}
                    sizes="100vw"
                    placeholder="blur"
                    aria-hidden={index !== current}
                    className={`-z-20 object-cover object-top transition-opacity duration-1000 ${index === current ? "opacity-100" : "opacity-0"}`}
                />
            ))}
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-950/90 via-brand-950/60 to-brand-950/10" />

            <div className={`${sectionPadding} flex h-full flex-col justify-center`}>
                <div className="max-w-xl animate-fade-in text-white">
                    {eyebrow && (
                        <p className="mb-4 inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-gold-400 ring-1 ring-white/20 backdrop-blur">
                            {eyebrow}
                        </p>
                    )}
                    <h1 className="text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
                        {plaintitle} <span className="text-gold-400">{highlightedtitle}</span>
                    </h1>
                    {description && <p className="mt-5 max-w-md text-base text-white/80 md:text-lg">{description}</p>}
                    <div className="mt-8 flex flex-wrap gap-3">
                        <Button link={primaryCta.href} variant="accent" size="lg">
                            {primaryCta.label}
                        </Button>
                        {secondaryCta && (
                            <Button link={secondaryCta.href} variant="light" size="lg" className="bg-white/10 text-white ring-1 ring-white/30 backdrop-blur hover:bg-white/20">
                                {secondaryCta.label}
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            {image.length > 1 && (
                <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
                    {image.map((slide, index) => (
                        <button
                            key={slide.id}
                            type="button"
                            onClick={() => setCurrent(index)}
                            aria-label={`Show slide ${index + 1}`}
                            aria-current={index === current}
                            className={`h-1.5 rounded-full transition-all ${index === current ? "w-8 bg-gold-400" : "w-3 bg-white/50 hover:bg-white/80"}`}
                        />
                    ))}
                </div>
            )}
        </section>
    );
};

export default HeroSection;

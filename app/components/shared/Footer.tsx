import Image from "next/image";
import Link from "next/link";
import images from "@/public/images";
import { sectionPadding } from "@/app/styles/styles";
import { Contact, FooterHelpLinks, FooterShopLinks, Socials } from "@/app/utils";

function LinkColumn({ title, links }: { title: string; links: { name: string; link: string }[] }) {
    return (
        <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-gold-400">{title}</h2>
            <ul className="mt-4 space-y-3 text-sm">
                {links.map((item) => (
                    <li key={item.link}>
                        <Link href={item.link} className="text-white/75 transition-colors hover:text-white">
                            {item.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default function Footer() {
    return (
        <footer className="bg-brand-950 text-white">
            <div className={`${sectionPadding} grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]`}>
                <div className="sm:col-span-2 lg:col-span-1">
                    <Link href="/" aria-label="Modern Haven home" className="inline-block rounded-2xl bg-white p-2">
                        <Image src={images.logo} alt="Modern Haven" className="h-12 w-auto" />
                    </Link>
                    <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">
                        Gadgets and clothing for the whole family, from consoles and watches to everyday fashion for men,
                        women, and kids. All in one cart.
                    </p>
                    <ul className="mt-6 flex gap-3">
                        {Socials.map((social) => (
                            <li key={social.name}>
                                <Link
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.name}
                                    className="grid size-10 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-gold-400 hover:text-brand-950"
                                >
                                    {social.icons}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <LinkColumn title="Shop" links={FooterShopLinks} />
                <LinkColumn title="Help" links={FooterHelpLinks} />

                <div>
                    <h2 className="text-sm font-semibold uppercase tracking-wider text-gold-400">Get in touch</h2>
                    <ul className="mt-4 space-y-3 text-sm">
                        {Contact.map((item) => (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    target={item.href.startsWith("http") ? "_blank" : undefined}
                                    rel="noopener noreferrer"
                                    className="flex items-start gap-3 text-white/75 transition-colors hover:text-white"
                                >
                                    <span className="mt-0.5 shrink-0">{item.icons}</span>
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="border-t border-white/10">
                <p className={`${sectionPadding} py-6 text-center text-xs text-white/50`}>
                    &copy; {new Date().getFullYear()} Modern Haven. Made in Lagos.
                </p>
            </div>
        </footer>
    );
}

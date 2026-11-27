import { sectionEyebrow, sectionPadding, sectionTitle } from "../../styles/styles";
import { Icons } from "../../ui/icons";

const values = [
    {
        name: "Integrity",
        description: "Honest, transparent service and products you can trust.",
        Icon: Icons.Badge,
    },
    {
        name: "Quality",
        description: "Fashion and gadgets chosen to hold up and to elevate your everyday.",
        Icon: Icons.Excellence,
    },
    {
        name: "Customer first",
        description: "Your style and comfort come first. Every product is picked with your needs in mind.",
        Icon: Icons.Thumbs,
    },
    {
        name: "Family focused",
        description: "Bringing style and joy to families, with something for every age.",
        Icon: Icons.Community,
    },
    {
        name: "Always current",
        description: "We keep up with trends and tech so you get modern styles and gadgets that fit your life.",
        Icon: Icons.Innovayion,
    },
];

export default function CoreValues() {
    return (
        <section className="bg-white py-16 md:py-24">
            <div className={sectionPadding}>
                <div className="mx-auto mb-12 max-w-xl text-center">
                    <p className={sectionEyebrow}>What we stand for</p>
                    <h2 className={`${sectionTitle} mt-2`}>Our core values</h2>
                    <p className="mt-3 text-gray-600">The principles behind every product we stock and every order we deliver.</p>
                </div>
                <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                    {values.map(({ name, description, Icon }) => (
                        <li key={name} className="rounded-3xl bg-surface p-6 ring-1 ring-gray-200 transition-shadow hover:shadow-lg">
                            <span className="grid size-12 place-items-center rounded-2xl bg-brand-900 text-gold-400">
                                <Icon className="size-6" />
                            </span>
                            <h3 className="mt-5 text-lg font-semibold text-gray-900">{name}</h3>
                            <p className="mt-2 text-sm leading-relaxed text-gray-600">{description}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}

import { sectionPadding } from "../styles/styles";

export default function CallToAction() {
    return (
        <section className={`${sectionPadding}`}>
            <div className="flex flex-col md:flex-row gap-10">
                <h2 className="text-2xl font-bold">
                    Call to Action
                </h2>
                <p className="text-gray-500">
                    Modern Haven is a fashion and tech company that provides the best products for the modern family.
                </p>
            </div>
        </section>
    )
}
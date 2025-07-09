
import { AboutProps } from "@/app/components/models/About";
import { sectionPadding } from "@/app/styles/styles";
import Image from "next/image";

export default function AboutCard({sectionTitle, image, paragraph1, paragraph2, order}: AboutProps) {
    return (
        <section className={`${sectionPadding}  mt-10 mb-20`}>
            <h1 className="text-2xl font-bold text-center text-[#0F2B22] mb-8" >{sectionTitle}</h1>
            <div className={`flex flex-col md:flex-row gap-4 md:justify-between w-full ${order === "right" ? "md:flex-row-reverse" : ""}`}>
                {/* Image Section  */}
                <div className="w-full md:w-[400px]">
                    <Image 
                    priority
                    quality={100}
                    src={image} 
                    alt="about" className="w-full h-[300px] md:h-[450px] object-cover object-top rounded-xl" />
                </div>
                <div className="md:w-1/2 flex flex-col gap-4 items-center justify-center">
                    <p className="md:text-lg text-sm">
                        {paragraph1}
                    </p>
                    <p className="md:text-lg text-sm"> 
                        {paragraph2}
                    </p>
                </div>
            </div>
        </section>
    )
}
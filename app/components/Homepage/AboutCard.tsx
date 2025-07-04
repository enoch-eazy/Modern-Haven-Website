
import { AboutProps } from "@/app/components/models/About";
import { sectionPadding } from "@/app/styles/styles";
import Image from "next/image";

export default function AboutCard({sectionTitle, image, paragraph1, paragraph2}: AboutProps) {
    return (
        <section className={`${sectionPadding}  mt-10 mb-20`}>
            <h1 className="text-2xl font-bold text-center text-[#0F2B22] mb-8" >{sectionTitle}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:justify-between w-full">
                {/* Image Section  */}
                <div className="w-[400px]">
                    <Image 
                    priority
                    quality={100}
                    src={image} 
                    alt="about" width={100} height={100} className="w-full md:h-[450px] object-cover object-top rounded-xl" />
                </div>
                <div className="flex flex-col gap-4 items-center justify-center">
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
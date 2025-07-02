import { sectionPadding } from "@/app/styles/styles";
import images from "@/public/images";
import Image from "next/image";

export default function AboutSection() {
    return (
        <section className={`${sectionPadding}  mt-10 mb-20`}>
            <h1 className="text-2xl font-bold text-center text-[#0F2B22] mb-8" >About Men's fashion</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:justify-between w-full">
                {/* Image Section  */}
                <div className="w-[400px]">
                    <Image src={images.aboutImage} alt="about" width={100} height={100} className="w-full md:h-[450px] object-cover object-top rounded-xl" />
                </div>
                <div className="flex flex-col gap-4 items-center justify-center">
                    <p className="md:text-lg text-sm">
                        Men’s fashion is a timeless blend of confidence, function, and style. From tailored suits to relaxed streetwear, modern men seek versatility in their wardrobes—an ability to move seamlessly from the boardroom to the weekend without compromising comfort or appearance. Whether you're embracing minimalism or layering textures and tones, today’s fashion empowers men to express their identity with poise.
                    </p>
                    <p className="md:text-lg text-sm"> 
                        At Modern Haven, we believe fashion is not just about trends—it’s about personal presence and everyday excellence. Our curated collection brings together classic silhouettes, contemporary cuts, and smart essentials that speak to every man’s lifestyle. From premium shirts to rugged boots, casual joggers to sophisticated watches, we deliver the look that lets you lead with style—wherever life takes you.
                    </p>
                </div>
            </div>
            
        </section>
    )
}
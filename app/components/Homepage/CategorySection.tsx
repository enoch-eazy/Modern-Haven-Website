import { CategoryProps } from "@/app/components/models/Category";
import { sectionPadding } from "@/app/styles/styles";
import { Icons } from "@/app/ui/icons";
import Image from "next/image";
import Link from "next/link";

const CategorySection: React.FC<CategoryProps> = ({sectionTitle, categoryItem}) => {
    return (
        <section className={`${sectionPadding} flex flex-col items-center justify-center mt-10 mb-20`}>
            <h1 className="text-2xl font-bold text-center text-[#0F2B22] mb-8" >{sectionTitle}</h1>
            <div className="flex flex-col md:grid md:grid-cols-3 gap-8 w-full">
                {categoryItem.map((item, index) => (
                    <Link href={item.href} key={index}>
                        <div 
                        className="flex flex-col gap-3 items-center justify-center w-full bg-[#0F2B22] rounded-xl cursor-pointer">
                            <Image 
                            src={item.image} 
                            alt={item.Item}
                            priority
                            quality={100} 
                            className="w-full h-[380px] object-cover object-top rounded-t-xl" />
                            <div 
                            className="flex flex-col gap-3 items-center justify-center w-full">
                                <p 
                                className="font-bold text-center text-white">{item.Item}</p>
                                    <Link href="/shop/men" className="w-full">
                                        <button 
                                        className="w-full hover:text-[#FFD700] hover:bg-black/80 transition-all duration-300 bg-black text-white px-10 py-2 rounded-b-xl cursor-pointer flex items-center justify-center gap-2">
                                            View More <Icons.Right />
                                        </button>
                                    </Link>
                                </div>
                        </div>
                    </Link>
                ))}
            </div>
            <Link href="/shop" className="w-full mt-10 text-center">
                <button className="w-fit mx-auto hover:text-[#FFD700] hover:bg-black/80 transition-all duration-300 border border-[#FFD700] bg-transparent text-black px-10 py-2 rounded-xl cursor-pointer">
                    Shop Now
                </button>
            </Link>
        </section>
    )
}
export default CategorySection;
import { sectionPadding } from "@/app/styles/styles";
import images from "@/public/images";
import Image from "next/image";
import Link from "next/link";

export default function Category() {
    const List = [
        {
            image: images.categoryImagesshirts,
            Item: "SHIRTS",
            href: "/shirts"
        },
        {
            image: images.categoryImagesjerseys,
            Item: "JERSEYS",
            href: "/jerseys"
        },
        {
            image: images.categoryImagespants,
            Item: "PANTS",
            href: "/pants"
        },
        {
            image: images.categoryImagessweaters,
            Item: "SWEATERS",
            href: "/sweater"
        },
        {
            image: images.categoryImagesshoes,
            Item: "SHOES",
            href: "/shoes"
        },
        {
            image: images.categoryImageshorts,
            Item: "SHORTS",
            href: "/shorts"
        }
    ]
    return (
        <section className={`${sectionPadding} flex flex-col items-center justify-center mt-10 mb-20`}>
            <h1 className="text-2xl font-bold text-center text-[#0F2B22] mb-8" >Shop by Category</h1>
            <div className="flex flex-col md:grid md:grid-cols-3 gap-8 w-full">
                {List.map((item, index) => (
                    <div key={index} className="flex flex-col gap-3 items-center justify-center w-full bg-[#0F2B22] rounded-xl cursor-pointer">
                        <Image src={item.image} alt={item.Item} width={100} height={100} className="w-full h-[250px] object-cover rounded-t-xl" />
                        <div className="flex flex-col gap-3 items-center justify-center w-full">
                            <p className="font-bold text-center text-white">{item.Item}</p>
                            <Link href="/shop" className="w-full">
                                <button className="w-full hover:text-[#FFD700] hover:bg-black/80 transition-all duration-300 bg-black text-white px-10 py-2 rounded-b-xl cursor-pointer">
                                    Shop Now
                                </button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
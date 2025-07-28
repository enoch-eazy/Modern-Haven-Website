"use client";
import { sectionPadding } from "@/app/styles/styles";
import Button from "@/app/ui/button";
import { NewSection } from "@/app/utils";
import images from "@/public/images";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function NewArrivals() {
    const router = useRouter();
    return (
        <section className={`${sectionPadding} py-10`}>
                <h2 
                className="text-2xl font-bold text-center text-[#0F2B22] mb-4">
                    New Arrivals For You
                </h2>
                <p className="text-center text-[#0F2B22] mb-8">
                    Discover our latest arrivals and stay ahead of the fashion curve.
                </p>
                <div className="flex flex-col md:flex-row gap-4">
                    {NewSection.map((item, index) => (
                        <div key={index} className="relative w-full">
                        <Image 
                        priority
                        quality={100}
                        src={item.image} alt={item.name} 
                        className="w-full h-[450px] object-cover rounded-xl" />
                        <div className="absolute top-0 left-0 w-full h-full bg-black/50 rounded-xl"></div>
                        <div className="flex flex-col gap-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
                            <h3 className="text-[18px] font-bold text-center text-white">
                                {item.name}
                            </h3>
                            <Button
                                className="w-40 mx-auto"
                                onClick={() => router.push("/shop")}
                            >
                                <span className="text-xs">{item.button}</span>
                            </Button>
                        </div>
                    </div>
                    ))}
                </div>
        </section>
    )
}
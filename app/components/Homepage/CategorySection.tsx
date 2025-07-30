"use client"


import { CategoryProps } from "@/app/components/models/Category";
import { sectionPadding } from "@/app/styles/styles";
import { Icons } from "@/app/ui/icons";
import Image from "next/image";
import Link from "next/link";
import { easeInOut, motion } from "framer-motion";

const fadeInLeft = {
    hidden: { opacity: 0, x: -60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: easeInOut }
    },
  };
  
  const fadeInRight = {
    hidden: { opacity: 0, x: 60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7 }
    },
  };
const CategorySection: React.FC<CategoryProps> = ({sectionTitle, categoryItem}) => {
    return (
        <>
         <motion.div
        variants={fadeInLeft}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        > 
        <section suppressHydrationWarning
        className={`${sectionPadding} flex flex-col items-center justify-center mt-10 mb-20`}>
            <h1 className="text-2xl font-bold text-center text-[#0F2B22] mb-8" >{sectionTitle}</h1>
            <div className="flex flex-col md:grid md:grid-cols-3 gap-8 w-full">
                {categoryItem.map((item, index) => (
                        <div 
                        key={index}
                        className="flex flex-col gap-3 items-center justify-center w-full bg-[#0F2B22] rounded-xl cursor-pointer group relative">
                            <div className="pointer-events-none md:opacity-0 absolute top-0 left-0 w-full h-full bg-black/50 rounded-xl inset-0 group-hover:pointer-events-auto group-hover:opacity-90 transition-all duration-400 ease flex items-center justify-center">
                            <h2 className=" font-bold text-white ">
                                {item.Item}
                            </h2>
                            </div>
                            <Link href={item.href} >
                                <Image 
                                src={item.image} 
                                alt={item.Item}
                                priority
                                quality={100} 
                                className="w-full md:w-[400px] md:h-[300px] object-cover object-top rounded-t-xl" />
                                <div 
                                className="flex flex-col gap-4 items-center justify-center w-full">
                                    <p 
                                    className="opacity-0 md:opacity-100 my-0 md:my-4 font-bold text-center text-white group-hover:opacity-0 group-hover:my-0 group-hover:-translate-y-3 transition-all duration-400 ease-in">
                                        {item.Item}
                                    </p>
                                            {/* <button 
                                            className="w-full hover:text-[#FFD700] hover:bg-black/80 transition-all duration-300 bg-black text-white px-10 py-2 rounded-b-xl cursor-pointer flex items-center justify-center gap-2 mx-auto">
                                                <Link href="/shop/men" className="justufy-center w-full flex items-center gap-4">
                                                    View More <Icons.Right />
                                                </Link>
                                            </button> */}
                                    </div>
                            </Link>
                        </div>
                    
                ))}
            </div>
            <Link href="/shop" className="w-full mt-10 text-center">
                <button className="w-fit mx-auto hover:text-[#FFD700] hover:bg-black/80 transition-all duration-300 border border-[#FFD700] bg-transparent text-black px-10 py-2 rounded-xl cursor-pointer">
                    Shop Now
                </button>
            </Link>
        </section>
        </motion.div>
        </>
    )
}
export default CategorySection;
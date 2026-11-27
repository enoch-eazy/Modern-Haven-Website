"use client"
import { TestimonialProps } from "@/app/components/models/Testimonial";
import { sectionPadding } from "@/app/styles/styles";
import Image from "next/image";
import { useEffect, useState } from "react";
import {motion, AnimatePresence } from "framer-motion"
import { Icons } from "@/app/ui/icons";

const TestimonialSection: React.FC<TestimonialProps> = ({sectionTitle, testimonials}) => {
    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 5000); // Increased to 5 seconds for better reading
        return () => clearInterval(interval);
    }, [testimonials.length]);

    const handleIndicatorClick = (index: number) => {
        setCurrentTestimonial(index);
    };

    return (
        <section className="bg-brand-900 py-16 md:py-24">
            <div className={`${sectionPadding}`}>
                <motion.h1 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-12 text-center text-2xl font-bold tracking-tight text-white md:text-4xl"
                >
                    {sectionTitle}
                </motion.h1>
                
                <div className="relative overflow-hidden">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentTestimonial}
                            initial={{ opacity: 0, x: 100, scale: 0.9 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: -100, scale: 0.9 }}
                            transition={{ 
                                duration: 0.8,
                                ease: [0.4, 0.0, 0.2, 1]
                            }}
                            className="flex flex-col items-center justify-between gap-12 md:flex-row"
                        >
                            <motion.div 
                                className="flex flex-col gap-4 justify-evenly w-full"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                <motion.div
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{ duration: 0.5, delay: 0.3 }}
                                >
                                    <Icons.Quote className="h-12 w-12 text-gold-400"/>
                                </motion.div>
                                
                                <motion.p 
                                    className="w-full max-w-xl text-xl font-medium leading-relaxed text-white md:text-2xl"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.4 }}
                                >
                                    "{testimonials[currentTestimonial].testimonial}"
                                </motion.p>
                                
                                <motion.h2 
                                    className="text-lg font-semibold text-gold-400"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.6 }}
                                >
                                    -- {testimonials[currentTestimonial].name}
                                </motion.h2>
                            </motion.div>
                            
                            <motion.div 
                                className="flex flex-col items-center justify-center"
                                initial={{ opacity: 0, scale: 0.8, rotateY: 15 }}
                                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                                transition={{ duration: 0.8, delay: 0.1 }}
                            >
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Image 
                                        src={testimonials[currentTestimonial].image} 
                                        alt={testimonials[currentTestimonial].name} 
                                        sizes="(min-width: 768px) 400px, 90vw"
                                        className="h-[360px] w-full max-w-[400px] rounded-3xl object-cover object-top shadow-2xl md:h-[450px] md:w-[400px]"
                                    />
                                </motion.div>
                            </motion.div>  
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Enhanced indicators */}
                <motion.div 
                    className="flex justify-center gap-4 mt-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                >
                    {testimonials.map((testimonial, index) => (
                        <motion.div 
                            key={testimonial.id} 
                            className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
                                currentTestimonial === index 
                                    ? "bg-[#FFD700] scale-125" 
                                    : "bg-white/50 hover:bg-white/80"
                            }`}
                            onClick={() => handleIndicatorClick(index)}
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                        />
                    ))}
                </motion.div>
            </div>
        </section>
    )
}

export default TestimonialSection;
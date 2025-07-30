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
        <section className={`mt-10 mb-20 bg-[#0F2B22] py-10`}>
            <div className={`${sectionPadding}`}>
                <motion.h1 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-2xl font-bold text-center text-white mb-8"
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
                            className="flex flex-col md:flex-row justify-between gap-12"
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
                                    <Icons.Quote className="w-20 h-20 text-white"/>
                                </motion.div>
                                
                                <motion.p 
                                    className="text-white w-full md:w-[300px] font-bold text-lg leading-relaxed"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.4 }}
                                >
                                    "{testimonials[currentTestimonial].testimonial}"
                                </motion.p>
                                
                                <motion.h2 
                                    className="text-2xl font-bold text-white"
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
                                        priority
                                        quality={100}
                                        className="w-[400px] h-[450px] object-cover object-top rounded-xl shadow-2xl" 
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
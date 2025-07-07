"use client"
import { TestimonialProps } from "@/app/components/models/Testimonial";
import { sectionPadding } from "@/app/styles/styles";
import Image from "next/image";
import { useEffect, useState } from "react";

const TestimonialSection: React.FC<TestimonialProps> = ({sectionTitle, testimonials}) => {
    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            // const randomIndex = Math.floor(Math.random() * testimonials.length);
            // setCurrentTestimonial(randomIndex);
            setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 4000);
        return () => clearInterval(interval);
    })
    return (
        <section className={`mt-10 mb-20 bg-[#0F2B22] py-10`}>
            <div 
            className={`${sectionPadding} `}>
                <h1 
                className="text-2xl font-bold text-center text-white mb-8" >{sectionTitle}</h1>
                <div 
                className="flex flex-col md:flex-row justify-center gap-12">
                    <div 
                    className="flex flex-col gap-4 justify-center">
                        <p 
                        className=" text-white w-full md:w-[300px] font-bold" >
                            "{testimonials[currentTestimonial].testimonial}"
                        </p>
                        <h2 
                        className="text-2xl font-bold text-white" >
                            -- {testimonials[currentTestimonial].name}
                        </h2>
                    </div>
                    <div 
                    key={testimonials[currentTestimonial].id}
                    className="flex flex-col items-center justify-center">
                        <Image 
                        src={testimonials[currentTestimonial].image} 
                        alt={testimonials[currentTestimonial].name} 
                        priority
                        quality={100}
                        className="w-[400px] h-[450px] object-cover object-top rounded-xl" />
                    </div>
                </div>
                {/* Indicator for the testimonials */}
                <div className="flex justify-center gap-4 mt-8">
                    {testimonials.map((testimonial) => (
                        <div 
                        key={testimonial.id} 
                        className={
                            `${currentTestimonial === testimonial.id ? "bg-[#FFD700]" : "bg-white"} w-2 h-2 rounded-full cursor-pointer
                            `}
                        >
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
export default TestimonialSection;
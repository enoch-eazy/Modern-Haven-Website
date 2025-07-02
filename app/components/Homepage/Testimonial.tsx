"use client"
import { sectionPadding } from "@/app/styles/styles";
import images from "@/public/images";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Testimonial() {
    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    const testimonials = [
        {
            id: 1,
            name: "Daniel Otunla",
            testimonial: "Love this shirt! Fits perfectly and the quality is great. I'll definitely be buying more from this store.",
            image: images.testimonialImage1
        },
        {
            id: 2,
            name: "Ebube Conrad",
            testimonial: "The quality blew me away. The men’s pants I ordered fit perfectly and the delivery was fast too",
            image: images.testimonialImage2
        },
        {
            id: 3,
            name: "Caleb Okereke",
            testimonial: "Finally, a store that gets it. I bought shirts for myself, sneakers for my wife, and a Nintendo for my son—all in one place",
            image: images.testimonialImage3
        },
        {
            id: 4,
            name: "Olaoluwa Olaoluwa",
            testimonial: "Stylish, affordable, and family-friendly. This is my new go-to for fashion and gifts",
            image: images.testimonialImage4
        }
    ]
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
            <div className={`${sectionPadding} `}>
                <h1 className="text-2xl font-bold text-center text-white mb-8" >Testimonials</h1>
                <div className="flex flex-col md:flex-row justify-center gap-12">
                    <div className="flex flex-col gap-4 justify-center">
                        <p className=" text-white w-[300px] font-bold" >"{testimonials[currentTestimonial].testimonial}"</p>
                        <h2 className="text-2xl font-bold text-white" >-- {testimonials[currentTestimonial].name}</h2>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <Image src={testimonials[currentTestimonial].image} alt={testimonials[currentTestimonial].name} width={100} height={100} className="w-[400px] h-[450px] object-cover object-top rounded-xl" />
                    </div>
                </div>
                {/* Indicator for the testimonials */}
                <div className="flex justify-center gap-4 mt-8">
                    {testimonials.map((testimonial) => (
                        <div 
                        key={testimonial.id} 
                        className={`${currentTestimonial === testimonial.id ? "bg-[#FFD700]" : "bg-white"} w-2 h-2 rounded-full cursor-pointer`}
                        onClick={() => setCurrentTestimonial(testimonial.id)}
                        >
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
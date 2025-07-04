"use client"
import { TestimonialsMale } from "@/app/components/models/Testimonial";
import TestimonialSection from "./TestimonialSection";


export default function Testimonial() {

    return (
        <section>
            <TestimonialSection sectionTitle="Testimonials" testimonials={TestimonialsMale} />
        </section>
    )
}
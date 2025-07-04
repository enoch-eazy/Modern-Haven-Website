import images from "@/public/images";
import { StaticImageData } from "next/image";


export interface TestimonialItem {
    id: number;
    name: string;
    testimonial: string;
    image: StaticImageData;
}
export interface TestimonialProps {
    sectionTitle: string;
    testimonials: TestimonialItem[];
}

export const TestimonialsCustomers: TestimonialItem[] = [
    {
        id: 1,
        name: "Daniel Otunla",
        testimonial: "Love this shirt! Fits perfectly and the quality is great. I'll definitely be buying more from this store.",
        image: images.testimonialImage1
    },
    {
        id: 2,
        name: "Anita Okafor",
        testimonial: "The dresses are stunning! I wore mine to a wedding and got so many compliments. Quality and style in one place.",
        image: images.TestimonialImage2
    },
    {
        id: 3,
        name: "Caleb Okereke",
        testimonial: "Finally, a store that gets it. I bought shirts for myself, sneakers for my wife, and a Nintendo for my son—all in one place",
        image: images.testimonialImage3
    },
    {
        id: 4,
        name: "Samuel Edet",
        testimonial: "It's great to find quality kids’ fashion and gadgets in one place. My boys won’t put down their new PlayStation!",
        image: images.teenTestimony2
    }
]
export const TestimonialsMale: TestimonialItem[] = [
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
export const TestimonialsWomen: TestimonialItem[] = [
    {
        id: 1,
        name: "Sarah Adeyemi",
        testimonial: "I’ve finally found a store where elegance meets comfort. The blazers and tops fit perfectly into my work and weekend style",
        image: images.TestimonialImage1
    },
    {
        id: 2,
        name: "Anita Okafor",
        testimonial: "The dresses are stunning! I wore mine to a wedding and got so many compliments. Quality and style in one place.",
        image: images.TestimonialImage2
    },
    {
        id: 3,
        name: "Jessica Martins",
        testimonial: "Shopping here is effortless. I ordered pants and a handbag, and both arrived just as described—classy and comfortable.",
        image: images.TestimonialImage3
    },
    {
        id: 4,
        name: "Aisha Bello",
        testimonial: "I love how versatile their collection is. From casual wear to date-night outfits, everything feels thoughtfully selected.",
        image: images.TestimonialImage4
    }
]
export const TestimonialsKids: TestimonialItem[] = [
    {
        id: 1,
        name: "Esther Benson",
        testimonial: "My son’s new sneakers and hoodie are his favorites now. Comfortable, fun, and built to last.",
        image: images.teenTestimony4
    },
    {
        id: 2,
        name: "Kelechi Mba",
        testimonial: "Teenage fashion that actually fits my daughter's style! She loves the trendy tops and joggers.",
        image: images.teenTestimony1
    },
    {
        id: 3,
        name: "Vivian Okon",
        testimonial: "The dresses I bought for my little girl are colorful and playful—perfect for birthdays and outings.",
        image: images.teenTestimony3
    },
    {
        id: 4,
        name: "Samuel Edet",
        testimonial: "It's great to find quality kids’ fashion and gadgets in one place. My boys won’t put down their new PlayStation!",
        image: images.teenTestimony2
    }
]
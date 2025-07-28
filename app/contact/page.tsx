"use client"

import images from "@/public/images";
import Image from "next/image";
import { sectionPadding } from "../styles/styles";
import Link from "next/link";
import { useState } from "react";
import { Icons } from "../ui/icons";
import { motion, easeInOut } from "framer-motion";

const sectionVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  };
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
export default function Contact() {
    const [formValues, setFormValues] = useState({
        fullName: "",
        email: "",
        phoneNumber: "",
        subject: "",
        message: ""
    });
    const [errors, setErrors] = useState({
        fullName: "",
        email: "",
        phoneNumber: "",
        subject: "",
        message: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        console.log(formValues);
    };
    return (
        <>
            <div className={` mb-10 relative`}>
            {/* Overlay */}
            <div className="absolute top-0 left-0 w-full h-full bg-black/60"></div>
            {/* Image */}
            <Image 
            priority
            quality={100}
            src={images.Contact_Img}  alt="Contact Us" className="w-full md:h-[585px] object-cover object-top" /> 
            {/* {ImageCarousel.map((image, index) => (
                <Image key={index} src={image.image} alt={image.alt} width={100} height={100} className="w-full md:h-[450px] object-cover object-[50%_10%]" />
            ))} */}
            <div className={` ${sectionPadding} text-white absolute top-0 left-0 w-full h-full flex flex-col gap-4 justify-center`}> 
                    <h2 className="text-2xl md:text-6xl font-bold text-center md:text-left md:mt-0 mt-10">Contact Us</h2>
                    <p className="text-sm md:text-lg text-gray-200 w-full md:w-[45%] text-center md:text-left"><span className="text-2xl font-bold">We’re Here for You </span><br />
                    Contact us for assistance, product inquiries, or feedback. Let’s help make your experience better</p>
                    {/* Please fill out the form below and we'll get back to you as soon as possible. */}
            </div>    
            </div>
            <section className={` text-white`}>
            <div className={`${sectionPadding} md:pb-0 pb-48 md:pt-0 pt-10`}>
                <motion.div
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionVariants}>
                <div className="max-w-6xl mx-auto ">
                    {/* Desktop Version */}
                    <div className="hidden md:block">
                        <div className="bg-gradient-to-r from-[#0F2B22] to-[#FFD700] rounded-3xl px-12 py-8 flex justify-between items-center gap-8 text-white">
                            {/* Phone */}
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-full bg-orange-300/30">
                                    <Icons.Phone1 />
                                </div>
                                <div className="flex flex-col">
                                    <h3 className="font-bold text-xl">Phone</h3>
                                    <Link href={"tel:+2349073410982"} className="">
                                        +234 (0)907 341 0982
                                    </Link>
                                </div>
                            </div>

                            {/* Location */}
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-full bg-orange-300/30">
                                    <Icons.Location1 />
                                </div>
                                <div className="flex flex-col w-64">
                                    <h3 className="font-bold text-xl">Location</h3>
                                    <Link target="_blank" href={"https://maps.app.goo.gl/SYgvtehGYS3Btdk16"} className="">
                                        25 Fadare Street, Mile 12, Lagos, Nigeria
                                    </Link>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-full bg-orange-300/30">
                                    <Icons.Mail1 />
                                </div>
                                <div className="flex flex-col">
                                    <h3 className="font-bold text-xl">Email</h3>
                                    <Link href={"mailto:jesulanaenoch@gmail.com"} target="_blank" className="text-orange-100">
                                        jesulanaenoch@gmail.com
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Version */}
                    <div className="md:hidden mb-0">
                        <div className="bg-gradient-to-r from-[#0F2B22] to-[#FFD700] rounded-lg px-6 py-6 flex flex-col gap-6 text-white">
                            {/* Phone */}
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-md bg-red-300/30">
                                    <Icons.Phone1 className="size-5 text-white" />
                                </div>
                                <div className="flex flex-col">
                                    <h3 className="font-bold text-xl">Phone</h3>
                                    <Link href={"tel:+2349073410982"} className="">
                                        +234 (0)907 341 0982
                                    </Link>
                                </div>
                            </div>

                            {/* Location */}
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-md bg-red-300/30">
                                    <Icons.Location1 />
                                </div>
                                <div className="flex flex-col w-full">
                                    <h3 className="font-bold text-xl">Location</h3>
                                    <Link target="_blank" href={"https://maps.app.goo.gl/SYgvtehGYS3Btdk16"} className="">
                                        25 Fadare Street, Mile 12, Lagos, Nigeria
                                    </Link>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-md bg-red-300/30">
                                    <Icons.Mail1 />
                                </div>
                                <div className="flex flex-col">
                                    <h3 className="font-bold text-xl">Email</h3>
                                    <Link href={"mailto:jesulanaenoch@gmail.com"} target="_blank" className="">
                                        jesulanaenoch@gmail.com
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </motion.div>

                {/* Get in Touch  */}
                <div className="md:h-[500px] h-[550px]">
                    <div className="">
                        {/* Get in Touch */}
                        <div className="flex flex-col gap-6  md:flex-row md:justify-between mt-16">
                        <motion.div
                        variants={fadeInRight}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false, amount: 0.2 }}
                        >
                            <div className="text-black w-full md:w-80">
                                <h1 className="text-2xl text-black font-bold">Get in Touch</h1>
                                <span className="text-[#7A7A7A] text-base">
                                    Feel free to drop a message and let's talk about your business needs
                                </span>

                                {/* Social media links only on Desktop */}
                                <div className="hidden md:flex gap-4 mt-6">
                                    <Link href="https://www.instagram.com/eazy_enoch?igsh=aXJhdGlxdGcwd2o0" target="_blank" rel="noopener noreferrer">
                                        <Icons.Instagram className="w-10 h-10 bg-[#0F2B22] rounded-full p-2 text-[#FFD700]" />
                                    </Link>
                                    <Link
                                        href="https://www.linkedin.com/in/enoch-jesulana"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Icons.Linkedin className="w-10 h-10 bg-[#0F2B22] rounded-full p-2 text-[#FFD700]" />
                                    </Link>
                                    <Link
                                        href="https://x.com/Eazy_Enoch"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Icons.Twitter className="w-10 h-10 bg-[#0F2B22] rounded-full p-2 text-[#FFD700]" />
                                    </Link> 
                                </div>
                            </div>
                            </motion.div>

                            {/* Form */}
                            <motion.div
                            variants={fadeInRight}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: false, amount: 0.2 }}
                            >
                            <form onSubmit={handleSubmit} className="flex flex-col rounded-xl border border-[#FFD700] p-6 md:p-8 bg-white shadow-sm">
                                <div className="flex flex-col gap-5 text-grey">
                                    <div className="flex flex-col md:flex-row gap-4">
                                        <div className="w-full">
                                            <input
                                                name="fullName"
                                                value={formValues.fullName}
                                                type="text"
                                                placeholder="Your Name"
                                                onChange={handleInputChange}
                                                className={`border-2 w-full bg-transparent border-gray-200 rounded-lg text-base placeholder:text-sm p-3 outline-none focus:border-[#FFD700] transition-colors ${errors.fullName ? 'border-red-500' : ''}`}
                                            />
                                            {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                                        </div>
                                        <div className="w-full">
                                            <input
                                                name="email"
                                                value={formValues.email}
                                                onChange={handleInputChange}
                                                type="email"
                                                placeholder="Your Email"
                                                className={`border-2 w-full bg-transparent border-gray-200 rounded-lg text-base placeholder:text-sm p-3 outline-none focus:border-[#FFD700] transition-colors ${errors.email ? 'border-red-500' : ''}`}
                                            />
                                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                        </div>
                                    </div>

                                    <div className="flex flex-col md:flex-row gap-4">
                                        <div className="w-full">
                                            <input
                                                name="phoneNumber"
                                                value={formValues.phoneNumber}
                                                type="text"
                                                placeholder="Phone Number"
                                                onChange={handleInputChange}
                                                className={`border-2 w-full bg-transparent border-gray-200 rounded-lg text-base placeholder:text-sm p-3 outline-none focus:border-[#FFD700] transition-colors ${errors.phoneNumber ? 'border-red-500' : ''}`}
                                            />
                                            {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}
                                        </div>
                                        <div className="w-full">
                                            <input
                                                name="subject"
                                                value={formValues.subject}
                                                onChange={handleInputChange}
                                                type="text"
                                                placeholder="Subject"
                                                className="border-2 w-full bg-transparent border-gray-200 rounded-lg text-base placeholder:text-sm p-3 outline-none focus:border-[#FFD700] transition-colors"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <textarea
                                            name="message"
                                            value={formValues.message}
                                            onChange={handleInputChange}
                                            placeholder="Your message..."
                                            className={`border-2 w-full border-gray-200 bg-transparent rounded-lg text-base p-3 outline-none resize-none h-24 md:h-28 focus:border-[#FFD700] transition-colors ${errors.message ? 'border-red-500' : ''}`}
                                        />
                                        {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                                    </div>

                                    <div className="mt-2">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="cursor-pointer bg-[#0F2B22] flex items-center justify-center gap-3 rounded-full py-3 w-full text-white font-semibold hover:bg-[#0F2B22]/90 transition-all duration-300 ease-in-out disabled:opacity-70 disabled:cursor-not-allowed"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    Sending...
                                                </>
                                            ) : (
                                                <>
                                                    Send Message
                                                    <Icons.ArrowRight className="w-4 h-4" />
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </form>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Google Maps Section - Full Width */}
            <div className="w-full md:block hidden">
                <div className="w-full h-[500px]">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.211034321218!2d3.3333333!3d6.5243794!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2ae68937f9%3A0x9a1f39206b449b0e!2s25%20Fadare%20St%2C%20Mile%2012%2C%20Lagos!5e0!3m2!1sen!2sng!4v1720432100000!5m2!1sen!2sng"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="w-full h-full"
                    />
                </div>
            </div>
        </section>
        </>
    )
}
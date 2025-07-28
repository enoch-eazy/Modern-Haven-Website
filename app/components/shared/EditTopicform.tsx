"use client"

import { sectionPadding } from "@/app/styles/styles";
import Button from "@/app/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function EditShopForm ({id, title, description, price}: any ) {
    const router = useRouter()
    const [formValue, setFormValue] = useState({
        newTitle: title,
        newDescription: description,
        newPrice: price
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        if (name === "price") {
            const numericValue =  value.replace(/\D/g, "")
            setFormValue((prev) => ({...prev, [name]: numericValue}))
        }
        setFormValue((prev) => (
                {...prev, [name]: value}
            )
        )
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch(`http://localhost:3000/api/shops/${id}`, {
                method: "PUT",
                headers: {"Content-type": "application/json"},
                body: JSON.stringify({newTitle: formValue.newTitle, newDescription:formValue.newDescription, newPrice: formValue.newPrice})
            });
            if (!res.ok) {
                throw new Error("Failed to Update")
            } 
            router.refresh();
            router.push("/shop");
        } catch (error) {
            console.log(error)
        }
        if (!formValue.newTitle || !formValue.newDescription || !formValue.newPrice) {
            alert("Title, Description, and Price are required.");
            return;
        }
    }
    return (
        <section className={`${sectionPadding} mt-20 py-20 `}>
            <form onSubmit={handleSubmit} className="w-full md:w-[600px] flex flex-col gap-6 mt-10 mx-auto">
                <input 
                onChange={handleChange}
                name="newTitle"
                value={formValue.newTitle}
                className="border border-slate-300 px-8 py-3"
                type="text"
                placeholder="Topic Title" />
                <input 
                onChange={handleChange}
                name="newDescription"
                value={formValue.newDescription}
                className="border border-slate-300 px-8 py-3"
                type="text"
                placeholder="Your Description"
                />
                <input 
                onChange={handleChange}
                name="newPrice"
                value={formValue.newPrice}
                className="border border-slate-300 px-8 py-3"
                type="text"
                placeholder="Price"
                />
                <Button >
                    Update Item
                </Button>
            </form>
        </section>
    )
}
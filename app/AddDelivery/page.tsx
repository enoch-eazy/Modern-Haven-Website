"use client"

import { ApplicationRoutes } from "@/app/components/constant/applicationRoutes";
import { sectionPadding } from "@/app/styles/styles";
import Button from "@/app/ui/button";
import { Icons } from "@/app/ui/icons";
import { useRouter } from "next/navigation";
import { useState } from "react";

const deliveryLandmarks = [
    "Agric Bus Stop",
    "Butterfly",
    "Ojuoro",
    "Ori Okuta",
    "Ojokoro",
    "Asolo",
    "Igbolomu",
    "Yewa Community",
    "Oke Oko Isawo",
];

export default function AddDelivery() {
    const router = useRouter();
    const [formValue, setFormValue] = useState({
        address: "",
        landMark: "",
    });
    const [addressError, setAddressError] = useState(false);
    const [landMarkError, setLandMarkError] = useState(false);
    const [isCreatingAddress, setIsCreatingAddress] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormValue((prev) => ({ ...prev, [name]: value }));
        if (name === "address") setAddressError(false);
        if (name === "landMark") setLandMarkError(false);
    };

    const validateFields = () => {
        const isAddressValid = !!formValue.address;
        const isLandMarkValid = !!formValue.landMark;

        setAddressError(!isAddressValid);
        setLandMarkError(!isLandMarkValid);

        return isAddressValid && isLandMarkValid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateFields()) {
            return;
        }
        setIsCreatingAddress(true);
        try {
            const res = await fetch("http://localhost:4000/api/deliveries/", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(formValue),
            });
            if (res.ok) {
                router.push(ApplicationRoutes.Shop);
            } else {
                throw new Error("Failed to add delivery address");
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsCreatingAddress(false);
        }
    };

    return (
        <section className={`ml-10 mt-10 mb-10 py-20 ${sectionPadding}`}>
            <div
                onClick={() => router.push(ApplicationRoutes.Shop)}
                className="flex items-center gap-4 font-bold text-xl cursor-pointer"
            >
                <Icons.ArrowLeft />
                Back
            </div>
            <form
                onSubmit={handleSubmit}
                className="mx-auto bg-gray-100 shadow-2xl p-6 w-full md:w-[600px] flex flex-col gap-6"
            >
                <div className="flex flex-col gap-2">
                    <label htmlFor="address">Delivery Address</label>
                    <input
                        id="address"
                        name="address"
                        type="text"
                        placeholder="Enter your address"
                        value={formValue.address}
                        onChange={handleChange}
                        className="border border-slate-300 px-8 py-3"
                    />
                    {addressError && (
                        <span className="flex items-center gap-2 text-[#EE9500] text-sm">
                            <Icons.OutlineWarningIcon width={16} height={16} />
                            Please enter delivery address
                        </span>
                    )}
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="landMark">
                        Closest Landmark{" "}
                        <span className="text-[#F48500] text-[14px]">
                            (Each landmark has its own delivery fee)
                        </span>
                    </label>
                    <select
                        id="landMark"
                        name="landMark"
                        value={formValue.landMark}
                        onChange={handleChange}
                        className="border border-slate-300 px-8 py-3"
                    >
                        <option value="">Select a landmark closest to your location</option>
                        {deliveryLandmarks.map((landmark) => (
                            <option value={landmark} key={landmark}>
                                {landmark}
                            </option>
                        ))}
                    </select>
                    {landMarkError && (
                        <span className="flex items-center gap-2 text-[#EE9500] text-sm">
                            <Icons.OutlineWarningIcon width={16} height={16} />
                            Please select the closest landmark
                        </span>
                    )}
                </div>

                <Button type="submit" disabled={isCreatingAddress}>
                    {isCreatingAddress ? "Saving..." : "Save"}
                </Button>
            </form>
        </section>
    );
}

"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import { sectionPadding } from "@/app/styles/styles";
import { Icons } from "@/app/ui/icons";
import { useRouter } from "next/navigation";

export default function SignUpForm() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showconfirmPassword, setShowConfirmPassword] = useState(false)
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        password: "",
        confirmPassword: "",
    })
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === "phoneNumber") {
            const numericValue = value.replace(/\D/g, "")
            setFormData({...formData, [name]: numericValue})
            return
        }
        setFormData({ ...formData, [name]: value });

        if (errors[name as keyof typeof errors]) {
            setErrors(prev => ({ ...prev, [name]: "" }))
        }
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // e.currentTarget.reset()
        if (formData.firstName === "" || formData.lastName === "" || formData.email === "" || formData.phoneNumber === "" || formData.password === "" || formData.confirmPassword === "") {
            setErrors((prev) => ({...prev, firstName: "First name is required", lastName: "Last name is required", email: "Email is required", phoneNumber: "Phone number is required", password: "Password is required", confirmPassword: "Confirm password is required"}))
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            setErrors((prev) => ({...prev, password: "Password and confirm password do not match"}))
            return;
        }
        try {
            const res = await fetch("api/auth/signup", {
                method: "POST",
                headers: {"Content-type": "application/json",},
                body: JSON.stringify({
                    firstName: formData.firstName, 
                    lastName: formData.lastName, 
                    email: formData.email, 
                    phoneNumber: formData.phoneNumber, 
                    password: formData.password, 
                    confirmPassword: formData.confirmPassword
                })
            }
            );
            if (res.ok) {
                const form = e.currentTarget;
                form.reset(); 
            } else {
                console.log("User registration failed.");
            }
        } catch (error) {
            console.log("Error during SignUp", error)
        }

       setIsLoading(true);
      
       
        // For demonstration purposes, we log the formData to the console
        
        
        console.log(formData);
        setTimeout(() => {
            setIsLoading(false);
            router.push("/login");
        }, 3000);
    };
    return (
        <div className={`${sectionPadding}  mt-32 md:mt-40 pb-20 md:pb-40 text-gray-600`}>
            <h3 className="text-center">Create your Account</h3>
            <p className="text-center">Already have an account, <span className="text-[#0F2B22] font-bold">
                    <Link href="/login">
                        Log in here
                    </Link>
                </span>
            </p>
            <div>
                <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg mx-auto w-full md:w-[508px] my-auto mt-6 text-gray-500">
                    {/* Email Address Input */}
                    <div className="flex flex-col gap-4 md:flex-row ">
                        <div className="w-full flex flex-col gap-2">
                            <label>First Name</label>
                            <input 
                            required
                            type="text" 
                            name="firstName" 
                            value={formData.firstName} 
                            onChange={handleChange} 
                            placeholder="Enter first name"
                            className="text-gray-400 text-base w-full placeholder:text-gray-400 placeholder:text-sm p-2 rounded-md border border-gray-300 outline-none focus:border-[#01459E]" />
                        </div>
                        <div className="w-full flex flex-col gap-2">
                            <label>Last Name</label>
                            <input 
                            required
                            type="text" 
                            name="lastName" 
                            value={formData.lastName} 
                            onChange={handleChange} 
                            placeholder="Enter last name"
                            className="text-gray-400 text-base w-full placeholder:text-gray-400 placeholder:text-sm p-2 rounded-md border border-gray-300 outline-none focus:border-[#01459E]" />
                        </div>
                    </div>
                    {/* Email and Phone Number Input  */}
                    <div className="flex flex-col gap-4 md:flex-row  mt-4">
                        <div className="w-full flex flex-col gap-2">
                            <label>Email</label>
                            <input 
                            required
                            type="email" 
                            name="email" 
                            value={formData.email} 
                            onChange={handleChange} 
                            placeholder="Enter a valid Email Address"
                            className="text-gray-400 text-base w-full placeholder:text-gray-400 placeholder:text-sm p-2 rounded-md border border-gray-300 outline-none focus:border-[#01459E]" />
                        </div>
                        <div className="w-full flex flex-col gap-2">
                            <label>Phone Number</label>
                            <input 
                            required
                            type="text" 
                            name="phoneNumber" 
                            value={formData.phoneNumber} 
                            onChange={handleChange} 
                            placeholder="Enter phone number"
                            className="text-gray-400 text-base w-full placeholder:text-gray-400 placeholder:text-sm p-2 rounded-md border border-gray-300 outline-none focus:border-[#01459E]" />
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 md:flex-row mt-4 ">
                        <div className="w-full flex flex-col gap-2 relative">
                            <label>Password</label>
                            <input 
                            required
                            type={showPassword ? "text" : "password"} 
                            name="password" 
                            value={formData.password} 
                            onChange={handleChange} 
                            placeholder="************"
                            className="text-gray-400 text-base w-full placeholder:text-gray-400 placeholder:text-sm p-2 rounded-md border border-gray-300 outline-none focus:border-[#01459E]" />
                            <div 
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute right-[4px] bottom-[14px] cursor-pointer">
                                    {showPassword ? <Icons.Eye className="w-5" /> : <Icons.EyeOff className="w-5" />}
                            </div>
                        </div>
                        <div className="w-full flex flex-col gap-2 relative">
                            <label>Confirm Password</label>
                            <input 
                            required
                            type={showconfirmPassword ? "text" : "password"} 
                            name="confirmPassword" 
                            value={formData.confirmPassword} 
                            onChange={handleChange} 
                            placeholder="************"
                            className="text-gray-400 text-base w-full placeholder:text-gray-400 placeholder:text-sm p-2 rounded-md border border-gray-300 outline-none focus:border-[#01459E]" />
                            <div 
                                onClick={() => setShowConfirmPassword((prev) => !prev)}
                                className="absolute right-[4px] bottom-[14px] cursor-pointer">
                                {showconfirmPassword ? <Icons.Eye className="w-5" /> : <Icons.EyeOff className="w-5" />}
                            </div>
                        </div>

                    </div>
                    <div className="mt-8">
                         <button
                        type="submit" 
                        className="flex items-center justify-center gap-3 cursor-pointer ease-in-out transition-all duration-400 hover:bg-[#FFD700] w-full bg-[#0F2B22] text-white p-2 rounded-full">
                            {isLoading ? (
                                                <>
                                                    Creating...
                                                </>
                                            ) : (
                                                <>
                                                    Create Account
                                                    <Icons.ArrowRight className="w-4 h-4" />
                                                </>
                                            )}
                        </button>
                    </div>
                    <div className="mt-4 text-center w-[70%] mx-auto">
                        <small>
                        By proceeding you agree to the <span className="text-[#FFD700]">Terms and Conditions</span> and <span className="text-[#FFD700]">Privacy Policy</span> of Modern Haven.
                        </small>
                    </div>
                </form>
            </div>
        </div>
    )
}
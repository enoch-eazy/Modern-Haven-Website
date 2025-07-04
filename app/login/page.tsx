"use client"
import Link from "next/link";
import { useState } from "react";

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData);
    };
    return (
        <div className="mt-40 pb-40">
            <h3 className="text-center">Log in to your Account</h3>
            <p className="text-center">Don’t have an account, <span className="text-[#01459E] font-bold">
                    <Link href="/signup">
                        Sign up here
                    </Link>
                </span>
            </p>
            <div>
                <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg mx-auto w-full md:w-[508px] my-auto mt-6">
                    {/* Email Address Input */}
                    <div className="flex flex-col gap-2">
                        <label>Email Address</label>
                        <input 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        placeholder="Enter your email address"
                        className="w-full placeholder:text-gray-400 placeholder:text-sm p-2 rounded-md border border-gray-300 outline-none focus:border-[#01459E]" />
                    </div>
                    {/* Password Input  */}
                    <div className="flex flex-col gap-2 mt-4">
                        <label>Password</label>
                        <input 
                        type="password" 
                        name="password" 
                        value={formData.password} 
                        onChange={handleChange} 
                        placeholder="************"
                        className="w-full placeholder:text-gray-400 placeholder:text-sm p-2 rounded-md border border-gray-300 outline-none focus:border-[#01459E]" />
                    </div>
                    <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center gap-3">
                            <input type="checkbox" />
                            <label className=" text-[#01459E]">Remember Me</label>
                        </div>
                        <Link href="/forgot-password" className="text-[#01459E] font-bold">Forgot Password?</Link>
                    </div>
                    <div className="mt-8">
                        <button type="submit" className="cursor-pointer transition-all duration-300 hover:bg-[#01459E]/95 w-full bg-[#01459E] text-white p-2 rounded-full">Log in</button>
                    </div>
                    <div className="mt-4 text-center w-[70%] mx-auto">
                        <small>
                        By proceeding you agree to the <span className="text-[#E88D03]">Terms and Conditions</span> and <span className="text-[#E88D03]">Privacy Policy</span> of Modern Haven.
                        </small>
                    </div>
                </form>
            </div>
        </div>
    )
}
"use client"
import Link from "next/link";
import { useState } from "react";
import { sectionPadding } from "@/app/styles/styles";
import { Icons } from "@/app/ui/icons";
import { useRouter } from "next/navigation";
// import { login } from "@/lib/actions/auth";

export default function LoginForm() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        checkbox: ""
    });
    const [errors, setErrors] = useState({
        email: "",
        password: "",
    })
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (errors[name as keyof typeof errors]) {
            setErrors((prev) => ({...prev, [name]: ""}))
        }
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (formData.email === "" || formData.password === "") {
            setErrors((prev) => ({...prev, email: "Email is required", password: "Password is required"}))
            return;
        }
        if (!formData.email || !formData.password) {
            setErrors((prev) => ({...prev, email: "Enter the correct Email", password: "Enter the correct Password"}));
            return;
        }
        setIsLoading(true);
        // try {
        //     // Call your async login function here
        //     await login(); // Removed arguments to match function signature
        //     // Optionally redirect or show success
        //     // router.push("/dashboard");
        // } catch (error) {
        //     // Handle login error (show error message, etc.)
        //     setErrors((prev) => ({...prev, password: "Login failed. Please try again."}))
        // } finally {
        //     setIsLoading(false);
        // }
    };
    
    return (
        <div className={`${sectionPadding} mt-20 md:mt-40 pb-20 md:pb-40 text-gray-600`}>
            <h3 className="text-center">Log in to your Account</h3>
            <p className="text-center">Don’t have an account, <span className="text-[#0F2B22] font-bold">
                    <Link href="/signup">
                        Sign up here
                    </Link>
                </span>
            </p>
            <div>
                <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg mx-auto w-full md:w-[508px] my-auto mt-6 text-gray-500">
                    {/* Email Address Input */}
                    <div className="flex flex-col gap-2">
                        <label>Email Address</label>
                        <input 
                        required
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        placeholder="Enter your email address"
                        className="w-full text-gray-400 text-base placeholder:text-gray-400 placeholder:text-sm p-2 rounded-md border border-gray-300 outline-none focus:border-[#01459E]" />
                        {errors.email && <span className="text-red-500 text-xs">{errors.email}</span>}
                    </div>
                    {/* Password Input  */}
                    <div className="flex flex-col gap-2 mt-4 relative">
                        <label>Password</label>
                        <input 
                        required
                        type={showPassword ? "text" : "password"}
                        name="password" 
                        value={formData.password} 
                        onChange={handleChange} 
                        placeholder="************"
                        className="w-full text-gray-400 placeholder:text-gray-400 placeholder:text-sm p-2 rounded-md border border-gray-300 outline-none focus:border-[#01459E]" />
                        <div 
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-[4px] bottom-[14px] cursor-pointer">
                            {showPassword ? <Icons.Eye className="w-5" /> : <Icons.EyeOff className="w-5" />}
                        </div>
                        {errors.password && <span className="text-red-500 text-xs">{errors.password}</span>}
                    </div>
                    <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center gap-3">
                            <input 
                            name="checkbox"
                            value={formData.checkbox}
                            onChange={handleChange}
                            type="checkbox" />
                            <label className=" text-[#0F2B22] font-bold text-sm">Remember Me</label>
                        </div>
                        <Link href="/forgot-password" className="text-[#0F2B22] text-sm font-bold">Forgot Password?</Link>
                    </div>
                    <div className="mt-8">
                        <button
                        type="submit" 
                        className="flex items-center justify-center gap-3 cursor-pointer ease-in-out transition-all duration-400 hover:bg-[#FFD700] w-full bg-[#0F2B22] text-white p-2 rounded-full">
                            {isLoading ? (
                                                <>
                                                    Logging in...
                                                </>
                                            ) : (
                                                <>
                                                    Log in
                                                    <Icons.ArrowRight className="w-4 h-4" />
                                                </>
                                            )}
                        </button>
                    </div>
                    {/* {errors && (
                    <div className="bg-red w-fit px-3 py-2">
                        {errors}
                    </div>
                )} */}
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
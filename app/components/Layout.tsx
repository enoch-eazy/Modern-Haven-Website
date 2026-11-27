"use client";

import { Toaster } from "sonner";
import Navbar from "./shared/Navbar";
import Footer from "./shared/Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen flex-col">
            <a
                href="#main"
                className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:shadow"
            >
                Skip to content
            </a>
            <Toaster position="bottom-center" richColors closeButton toastOptions={{ duration: 3500 }} />
            <Navbar />
            <main id="main" className="flex-1">
                {children}
            </main>
            <Footer />
        </div>
    );
}

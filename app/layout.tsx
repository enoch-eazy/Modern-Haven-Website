import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Layout from "./components/Layout";
import Providers from "./Providers";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: {
        default: "Modern Haven | Gadgets & Fashion for the Modern Family",
        template: "%s | Modern Haven",
    },
    description:
        "Modern Haven is a one-stop shop for gadgets and clothing: consoles, watches and fitness gear alongside men's, women's, and kids' fashion. Delivering in Lagos.",
};

export const viewport: Viewport = {
    themeColor: "#0f2b22",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
                <Providers>
                    <Layout>{children}</Layout>
                </Providers>
            </body>
        </html>
    );
}

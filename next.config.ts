import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    async redirects() {
        return [
            // The delivery-address form now lives in checkout.
            { source: "/AddDelivery", destination: "/checkout", permanent: true },
            { source: "/about", destination: "/about-us", permanent: true },
        ];
    },
};

export default nextConfig;

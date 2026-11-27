import type { Metadata } from "next";
import { Suspense } from "react";
import VerifyEmailForm from "../components/shared/VerifyEmailForm";

export const metadata: Metadata = { title: "Verify your email" };

export default function VerifyEmail() {
    return (
        <Suspense>
            <VerifyEmailForm />
        </Suspense>
    );
}

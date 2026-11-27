import type { Metadata } from "next";
import { Suspense } from "react";
import ForgotPasswordForm from "../components/shared/ForgotPasswordForm";

export const metadata: Metadata = { title: "Forgot password" };

export default function ForgotPassword() {
    return (
        <Suspense>
            <ForgotPasswordForm />
        </Suspense>
    );
}

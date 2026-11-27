import type { Metadata } from "next";
import { Suspense } from "react";
import ResetPasswordForm from "../components/shared/ResetPasswordForm";

export const metadata: Metadata = { title: "Reset password" };

export default function ResetPassword() {
    return (
        <Suspense>
            <ResetPasswordForm />
        </Suspense>
    );
}

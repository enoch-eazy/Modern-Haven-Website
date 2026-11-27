import type { Metadata } from "next";
import { Suspense } from "react";
import SignUpForm from "../components/shared/SignUpform";

export const metadata: Metadata = { title: "Create an account" };

export default function SignUp() {
    return (
        <Suspense>
            <SignUpForm />
        </Suspense>
    );
}

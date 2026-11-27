import type { Metadata } from "next";
import { Suspense } from "react";
import LoginForm from "../components/shared/LoginForm";

export const metadata: Metadata = { title: "Log in" };

export default function Login() {
    return (
        <Suspense>
            <LoginForm />
        </Suspense>
    );
}

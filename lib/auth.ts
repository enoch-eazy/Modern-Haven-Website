import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { ApiError, apiFetch, type ApiUser } from "./api";

export const authOptions: NextAuthOptions = {
    // Matches the API token lifetime (JWT_EXPIRES_IN, 7 days by default).
    session: { strategy: "jwt", maxAge: 7 * 24 * 60 * 60 },
    pages: { signIn: "/login" },
    providers: [
        CredentialsProvider({
            name: "Email",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) return null;
                try {
                    const { user, token } = await apiFetch<{ user: ApiUser; token: string }>("/api/auth/login", {
                        method: "POST",
                        body: JSON.stringify({ email: credentials.email, password: credentials.password }),
                        cache: "no-store",
                    });
                    return {
                        id: user.id,
                        name: `${user.firstName} ${user.lastName}`,
                        email: user.email,
                        role: user.role,
                        accessToken: token,
                    };
                } catch (error) {
                    if (error instanceof ApiError && error.status === 401) return null;
                    throw new Error(error instanceof ApiError ? error.message : "Login failed");
                }
            },
        }),
    ],
    callbacks: {
        jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
                token.accessToken = user.accessToken;
            }
            return token;
        },
        session({ session, token }) {
            session.accessToken = token.accessToken;
            if (session.user) {
                session.user.id = token.id ?? "";
                session.user.role = token.role ?? "customer";
            }
            return session;
        },
    },
};

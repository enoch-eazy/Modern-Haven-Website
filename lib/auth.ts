import type { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { ApiError, EMAIL_NOT_VERIFIED, apiFetch, type ApiUser } from "./api";

function toSessionUser(user: ApiUser, token: string): User {
    return {
        id: user.id,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        role: user.role,
        accessToken: token,
    };
}

export const authOptions: NextAuthOptions = {
    // Matches the API token lifetime (JWT_EXPIRES_IN, 7 days by default).
    session: { strategy: "jwt", maxAge: 7 * 24 * 60 * 60 },
    pages: { signIn: "/login" },
    providers: [
        CredentialsProvider({
            id: "credentials",
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
                    return toSessionUser(user, token);
                } catch (error) {
                    if (error instanceof ApiError && error.status === 401) return null;
                    if (error instanceof ApiError && error.code === EMAIL_NOT_VERIFIED) throw new Error(EMAIL_NOT_VERIFIED);
                    throw new Error(error instanceof ApiError ? error.message : "Login failed");
                }
            },
        }),
        // Starts a session from an API token the browser just received, e.g. after verifying an
        // email with a code. The token is checked against the API, so only a genuine one works.
        CredentialsProvider({
            id: "api-token",
            name: "API token",
            credentials: { token: { label: "Token", type: "text" } },
            async authorize(credentials) {
                if (!credentials?.token) return null;
                try {
                    const { user } = await apiFetch<{ user: ApiUser }>("/api/auth/me", {
                        token: credentials.token,
                        cache: "no-store",
                    });
                    return toSessionUser(user, credentials.token);
                } catch {
                    return null;
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

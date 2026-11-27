import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

// Credentials are checked by the Modern Haven API (POST /api/auth/login).
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

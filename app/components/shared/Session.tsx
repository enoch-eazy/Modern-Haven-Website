"use client";
import { useSession } from "next-auth/react";
import Login from "./Login";
import LogOut from "./LogOut";
export default function Session() {
  const { data: session, status } = useSession();

  if (status === "loading") return null; // or a loading spinner
  return session ? <LogOut /> : <Login />;
}



// import Login from "@/app/login/page";
// import LogOut from "./LogOut";
// import { getServerSession } from "next-auth";

// export default async function Session () {
//     const session = await getServerSession();
    
//           {!!session && (
//             <LogOut />
//           )}
//           {!session && (
//             <Login />
//           )}
      
// }
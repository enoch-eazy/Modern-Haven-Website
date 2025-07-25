import { NextResponse } from "next/server";

// import hash from "bcryptjs ";
import { hash } from "bcryptjs";
import { neon } from '@neondatabase/serverless';

export async function POST(request: Request) {
    try {
        const {firstName, lastName, phoneNumber, password, email, confirmPassword } = await request.json();
        // validate email by using Zod or any other validation library

        const hashedPassword = await hash(password, 10);
        const hashedConfirmPassword = await hash(confirmPassword, 10);

        // Connect to the Neon database
        const sql = neon(`${process.env.DATABASE_URL}`)
        const response = await sql`
        INSERT INTO users (firstname, lastname, phonenumber, email, password, confirmPassword)
        VALUES (${firstName}, ${lastName}, ${phoneNumber}, ${email}, ${hashedPassword}, ${hashedConfirmPassword})
        `
        
    } catch (error) {
        console.log({message: "Error in signup route", error});
        
    }

    return NextResponse.json({ message: "User registered successfully" }, { status: 201 });
}
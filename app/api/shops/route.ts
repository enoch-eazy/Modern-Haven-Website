import connectMongoDB from "@/lib/mongodb";
import Shop from "@/models/shop";
import { NextResponse } from "next/server";

export async function POST(request: any) {
    const {title, description, price} = await request.json();
    await connectMongoDB();
    await Shop.create({title, description, price})
    return NextResponse.json({message: "Shop Created"}, {status: 201});  
};

export async function GET() {
    await connectMongoDB();
    const shops = await Shop.find();
    return NextResponse.json({shops});
};

export async function DELETE(request: any) {
    const id = request.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await Shop.findByIdAndDelete(id);
    return NextResponse.json({message: "Shop Deleted"}, {status: 200});
}
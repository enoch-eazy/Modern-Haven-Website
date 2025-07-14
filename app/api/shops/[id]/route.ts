import connectMongoDB from "@/lib/mongodb";
import Shop from "@/models/shop";
import { NextResponse } from "next/server";

export async function PUT(request: any, {params}: any) {
    const {id} = await params;
    const {newTitle: title, newDescription: description, newPrice: price} = await request.json();
    await connectMongoDB();
    await Shop.findByIdAndUpdate(id, {title, description, price});
    return NextResponse.json({message: "Topic Updated"}, {status: 200});
}
export async function GET(request: any, {params}: any) {
    const { id } = await params;
    await connectMongoDB();
    const shop = await Shop.findOne({_id: id});
    return NextResponse.json({shop}, {status: 200});
}

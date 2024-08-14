import connectMongoDB from "@/libs/mongodb";
import Topic from "@/models/topic";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const {title, description} = await request.json();
    await connectMongoDB();
    await Topic.create({title, description});
    return NextResponse.json({Message: "Topic Created"}, {status: 201});
}

export async function GET() {
    await connectMongoDB();
    const topics = await Topic.find();
    return NextResponse.json({topics});
}

export async function DELETE(request: Request) {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    await connectMongoDB();
    await Topic.findByIdAndDelete(id);
    return NextResponse.json({Message: "Topic Deleted"}, {status: 200});
}
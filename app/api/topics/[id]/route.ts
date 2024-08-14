import connectMongoDB from "@/libs/mongodb";
import Topic from "@/models/topic";
import { fetchServerResponse } from "next/dist/client/components/router-reducer/fetch-server-response";
import { NextResponse } from "next/server";

export async function PUT(request: Request, {params}: any) {
    const {id} = params;
    const { newTitle: title, newDescription: description } = await request.json();
    await connectMongoDB();
    await Topic.findByIdAndUpdate(id, { title, description });
    return NextResponse.json({ message: "Topic Updated" }, {status : 200});
}

export async function GET(request: Request, { params }: any) {
    const {id} = params;
    await connectMongoDB();
    const topic = await Topic.findOne({_id: id});
    return NextResponse.json({topic}, {status : 200});
}
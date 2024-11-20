import connectToMongoDb from "@/libs/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";

connectToMongoDb()
export async function GET() {
    try {
        const users = await User.find()
        return NextResponse.json({users})
    } catch (error) {
        return new NextResponse(error.message , {status:401})
    }
}
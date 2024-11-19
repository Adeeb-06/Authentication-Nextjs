import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs'
import connectToMongoDb from "@/libs/mongodb";
import User from "@/models/User";

connectToMongoDb()
export async function POST(req){
    try {
        const {name , email , password , role } = await req.json()
        const existingUser = await User.findOne({email})

        if(existingUser){
            return new NextResponse("Email is already in use" , {status:400})
        }
        const hashedpassword = await bcrypt.hash(password , 10)

        const newUser = new User({
            name,
            email,
            password:hashedpassword,
            role:'user'
        })
        await newUser.save()
        return new NextResponse("user Created" , {status:201})
    } catch (error) {
        return new NextResponse(error.message, {status:401})
    }
}
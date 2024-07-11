import { Register } from "@/lib/model/user";
import { connectionStr } from "@/lib/db";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(){

    let data = [];
    let success = true;
    try {
        await mongoose.connect(connectionStr);
        console.log("connection made")
        data = await Register.find()
    } catch (error) {
        console.log("connection not made")
        data = {result:"error"}
        success=false;
        // data = {success:false}
    }
    
    // console.log(data)
    return NextResponse.json({result:data, success});
}

export async function POST(request){
    const payload = await request.json();
    await mongoose.connect(connectionStr);
    let registration = new Register(payload);
    const result = await registration.save();
    return NextResponse.json({result, success:true});
}
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
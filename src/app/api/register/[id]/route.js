import { connectionStr } from "@/lib/db";
import { Register } from "@/lib/model/user";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function PATCH(request, { params }) {
    const { id } = params;
    const { attendance } = await request.json();

    console.log("Received PATCH request:", { id, attendance });

    try {
        await mongoose.connect(connectionStr);
        console.log("Connected to DB");

        const result = await Register.findByIdAndUpdate(
            id, 
            { attendance }, 
            { new: true }  // Ensure the updated document is returned
        );

        if (!result) {
            console.error("No document found with that ID.");
            return NextResponse.json({ success: false, message: "No document found with that ID." });
        }
        console.log("Updated Document:", result);
        return NextResponse.json({ success: true, result });
    } catch (error) {
        console.error("Failed to update attendance:", error);
        return NextResponse.json({ success: false, message: error.message });
    }
}

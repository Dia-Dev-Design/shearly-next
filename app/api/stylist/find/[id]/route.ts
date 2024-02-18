import dbConnect from "@/app/lib/dbConnect";
import Stylist from "@/app/models/Stylist";
import { NextRequest } from "next/server";


export async function GET(req:NextRequest, {params}:any){
    const {id}: {id:String} = params;
    try {
        await dbConnect()
        const findStylist = await Stylist.findById(id)
        if(!findStylist){
            console.error("\nError: Invalid Stylist Id!")
            return Response.json({message: "Invalid Stylist Id!"})
        }
        console.log("Success!");
        return Response.json({message: "OK", stylist: findStylist})
    } catch (error:any) {
        console.error("Internal Server Error: ", error.message)
        return Response.json({message: "Internal Server Error!", error})
    }
}
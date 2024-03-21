import { NextRequest } from "next/server";
import dbConnect from "@/app/lib/dbConnect";
import Service from "@/app/models/Service";

export async function POST(req:Request){
    try {
        const body = await req.json();
        await dbConnect();
        if(!("name" in body) || !body.name){
            console.error("\nError: Service name is Required!")
            return Response.json({message: "Service name is Required!"}, {status: 400})
        }
        const findService = await Service.findOne({name: body.name})
        if(findService){
            console.error(`\nError: Service with name: ${body.name} already exists!`)
            return Response.json({message: `Service with name: ${body.name} already exists!`}, {status: 400})
        }
        const createService = Service.create({...body});
        console.log("Success!");
        return Response.json({message: "OK", service: createService}, {status: 201})
    } catch (error) {
        
    }
}

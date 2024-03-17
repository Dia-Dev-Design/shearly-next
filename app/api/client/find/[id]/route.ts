import { NextRequest } from "next/server";
import dbConnect from "../../../../lib/dbConnect";
import Client from "../../../../models/Client";

export async function GET( req: NextRequest, {params}: any){
    const { id }: { id: String } = params;

    try {
        await dbConnect();

        const findClient = await Client.findById(id);

        if(!findClient){
            console.error("\nError: Invalid Client Id!");

            return Response.json({message: "Invalid Client Id!"}, {status: 400});
        }

        console.log("Client Found!");
        return Response.json({message: "Client Found!", client: findClient}, {status:200});
    } catch ( error: any ) {
        console.error("Internal Server Error: ", error.message);
        return Response.json({message: "Internal Server Error!", error});
    }
};
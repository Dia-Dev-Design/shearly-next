import { NextRequest } from "next/server";
import dbConnect from "../../../../lib/dbConnect";
import Client from "../../../../models/Client";

export async function DELETE( req: NextRequest, {params}: any){
    const { id }: { id: String } = params;

    try {
        await dbConnect();

        const DeleteClient = await Client.findByIdAndDelete(id);

        if(!DeleteClient){
            console.error("\nError: Invalid Client Id!");

            return Response.json({message: "Invalid Client Id!"}, {status: 400});
        }

        console.log("Client Deleted!");
        return Response.json({message: "Client Deleted!", client: DeleteClient}, {status:200});
    } catch ( error: any ) {
        console.error("Internal Server Error: ", error.message);
        return Response.json({message: "Internal Server Error!", error});
    }
};
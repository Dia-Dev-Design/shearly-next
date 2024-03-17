import dbConnect from "../../../lib/dbConnect";
import Client from "../../../models/Client";

export async function GET(){
    try {
        await dbConnect();

        const findAllClients = await Client.find();

        if(!findAllClients.length){
            console.error("\nError: No Clients Found!");

            return Response.json({message: "No Clients Found!", clients: findAllClients});
        }

        console.log("Clients Found!");
        return Response.json({message: "All Clients Found", clients: findAllClients}, {status: 200})
    } catch ( error: any ) {
        console.error("Internal Server Error: ", error.message);
        return Response.json({message: "Internal Server Error!", error});
    }
};
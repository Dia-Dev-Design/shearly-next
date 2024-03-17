import { NextRequest } from "next/server";
import dbConnect from "../../../../lib/dbConnect";
import Client from "../../../../models/Client";

const bcrypt = require("bcrypt");

export async function PUT( req: NextRequest, {params}: any){
    const { id }: { id: String } = params;

    try {
        const request = await req.json();

        await dbConnect();

        // Check if having to add the check if email is changed it must not exist in the database and password must be encrypted

        const findClientEmail = await Client.findOne(request.email);

        if(findClientEmail){
            console.error("\nError: Client email already exist!");
            
            return Response.json({message: "Client email already exist!"}, {status: 400});
        }

        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(request.password, salt);
        request.password = hashedPassword;

        const UpdateClient = await Client.findByIdAndUpdate(id, request.body, { new: true });

        if(!UpdateClient){
            console.error("\nError: Invalid Client Id!");

            return Response.json({message: "Invalid Client Id!"}, {status: 400});
        }

        console.log("Client Updated!");
        return Response.json({message: "Client Updated!", client: UpdateClient}, {status:200});
    } catch ( error: any ) {
        console.error("Internal Server Error: ", error.message);
        return Response.json({message: "Internal Server Error!", error});
    }
};